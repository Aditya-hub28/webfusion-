import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import DiscoveryPage from './pages/DiscoveryPage';
import AIMatchPage from './pages/AiMatchPage';
import MyBorrowingsPage from './pages/MyBorrowingsPage';
import MyLendingPage from './pages/MyLendingPage';
import MessagesPage from './pages/MessagesPage';
import ImpactDashboardPage from './pages/ImpactDashboardPage';
import TrustProfilePage from './pages/TrustProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-slate-100/60 font-sans text-slate-900 selection:bg-emerald-500 selection:text-white antialiased flex flex-col justify-between overflow-x-hidden w-full max-w-full relative">
                {/* Navbar */}
                <Navbar />

                {/* Main Content Area */}
                <main className="flex-1 w-full max-w-full overflow-x-hidden">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/discover" element={<DiscoveryPage />} />
                        <Route path="/ai-match" element={<AIMatchPage />} />
                        <Route path="/my-borrowings" element={<MyBorrowingsPage />} />
                        <Route path="/my-lending" element={<MyLendingPage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/impact" element={<ImpactDashboardPage />} />
                        <Route path="/trust-profile" element={<TrustProfilePage />} />
                        <Route path="/profile" element={<TrustProfilePage />} />
                        <Route path="/admin-panel" element={<AdminDashboardPage />} />
                        <Route path="/notifications" element={<MyBorrowingsPage />} />

                        {/* Catch-all fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>

                {/* Shared Full-Width Footer */}
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
