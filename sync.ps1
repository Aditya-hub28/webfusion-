# git_sync.ps1 - Automate Pulling and Pushing Git changes

# Change directory to the repository path
$repoDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if ($repoDir) {
    Set-Location $repoDir
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Write-Output "[$timestamp] Starting sync..."

# Check git status
$status = git status --porcelain
$hasLocalChanges = [bool]($status)

# Fetch latest status from origin
Write-Output "[$timestamp] Fetching from origin..."
git fetch origin

# Check branches
$local = git rev-parse HEAD
$remote = git rev-parse origin/main

if ($hasLocalChanges) {
    Write-Output "[$timestamp] Local changes detected. Staging and committing..."
    git add -A
    git commit -m "Auto-commit: saved changes at $timestamp"
    
    # After commit, update local ref
    $local = git rev-parse HEAD
}

if ($local -ne $remote) {
    Write-Output "[$timestamp] Syncing with origin/main..."
    # Rebase local commits/changes onto remote main
    git pull --rebase origin main
    
    # Push the changes
    git push origin main
} else {
    Write-Output "[$timestamp] No commits to push or pull."
}

# If we committed local changes, ensure they are pushed
if ($hasLocalChanges) {
    git push origin main
}

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Write-Output "[$timestamp] Sync completed."
