import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
    fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = true }) => {
    const containerClasses = fullScreen
        ? "fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
        : "flex items-center justify-center w-full min-h-[300px]";

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center gap-4 p-8 glass rounded-2xl">
                <Loader2 className="animate-spin text-blue-400" size={48} />
                <p className="text-blue-100 font-medium tracking-wide">Gathering atmospheric data...</p>
            </div>
        </div>
    );
};

export default Loader;
