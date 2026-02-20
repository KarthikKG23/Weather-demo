import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">404</h1>
            <p className="text-xl text-gray-300">Lost in the clouds? The page you're looking for doesn't exist.</p>
            <Link to="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-colors shadow-lg shadow-blue-500/30">
                Return to Radar
            </Link>
        </div>
    );
};

export default NotFound;
