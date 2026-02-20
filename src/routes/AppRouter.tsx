import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { WeatherProvider } from '../context/WeatherContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AnimatedBackground from '../components/AnimatedBackground';

// Lazy loading pages for better performance
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const CurrentWeather = React.lazy(() => import('../pages/CurrentWeather'));
const History = React.lazy(() => import('../pages/History'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

import Loader from '../components/Loader';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8"
        >
            {children}
        </motion.div>
    );
};

const AppLayout: React.FC = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden text-white font-sans relative">
            <AnimatedBackground />

            <Sidebar />

            <main className="flex-1 flex flex-col h-screen overflow-y-auto relative z-10 w-full" id="main-scroll">
                <Navbar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

                <React.Suspense fallback={<Loader fullScreen={false} />}>
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
                            <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
                            <Route path="/current" element={<PageWrapper><CurrentWeather /></PageWrapper>} />
                            <Route path="/history" element={<PageWrapper><History /></PageWrapper>} />
                            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
                        </Routes>
                    </AnimatePresence>
                </React.Suspense>
            </main>

            {/* Mobile Menu Backdrop */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

const AppRouter = () => {
    return (
        <WeatherProvider>
            <AppLayout />
        </WeatherProvider>
    );
};

export default AppRouter;
