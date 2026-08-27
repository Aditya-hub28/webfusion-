# watch.ps1 - Polling-based Git watcher (highly reliable in background tasks)

$folder = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $folder) {
    $folder = Get-Location
}
Set-Location $folder

$syncScript = Join-Path $folder "sync.ps1"
$logFile = Join-Path $folder "sync.log"

$pollIntervalSeconds = 10
$remoteFetchIntervalSeconds = 300 # Fetch remote changes every 5 minutes

$lastRemoteFetch = [DateTime]::MinValue

Write-Output "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') Started polling watcher on $folder..." | Out-File -FilePath $logFile -Append -Encoding utf8

try {
    while ($true) {
        $now = Get-Date
        $mustSync = $false
        
        # 1. Check for local changes
        $status = git status --porcelain
        if ($status) {
            Write-Output "[$($now.ToString('yyyy-MM-dd HH:mm:ss'))] Local changes detected: $status" | Out-File -FilePath $logFile -Append -Encoding utf8
            $mustSync = $true
        }
        
        # 2. Check if it's time to fetch from remote
        if (($now - $lastRemoteFetch).TotalSeconds -ge $remoteFetchIntervalSeconds) {
            Write-Output "[$($now.ToString('yyyy-MM-dd HH:mm:ss'))] Periodic remote check interval reached." | Out-File -FilePath $logFile -Append -Encoding utf8
            $mustSync = $true
            $lastRemoteFetch = $now
        }
        
        # 3. Perform sync if needed
        if ($mustSync) {
            Write-Output "[$($now.ToString('yyyy-MM-dd HH:mm:ss'))] Executing sync script..." | Out-File -FilePath $logFile -Append -Encoding utf8
            & $syncScript 2>&1 | Out-File -FilePath $logFile -Append -Encoding utf8
        }
        
        Start-Sleep -Seconds $pollIntervalSeconds
    }
} catch {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Output "[$timestamp] Error in polling loop: $_" | Out-File -FilePath $logFile -Append -Encoding utf8
}
