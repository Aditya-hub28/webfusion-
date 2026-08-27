import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught React Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center border border-rose-500/40">
                        <AlertTriangle size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-white">Oops! Something went wrong</h1>
                    <p className="text-xs text-slate-400 max-w-md">
                        {this.state.error?.toString() || 'An unexpected rendering error occurred.'}
                    </p>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = '/';
                        }}
                        className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-2"
                    >
                        <RefreshCw size={16} /> Reset App & Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
