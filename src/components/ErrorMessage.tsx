import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="glass border-red-500/30 p-6 flex flex-col items-center justify-center min-h-[200px] text-center gap-4 w-full">
            <AlertCircle size={48} className="text-red-400" />
            <div>
                <h3 className="text-xl font-bold text-red-100">Oops, something went wrong</h3>
                <p className="text-red-300 mt-2">{message}</p>
            </div>
        </div>
    );
};

export default ErrorMessage;
