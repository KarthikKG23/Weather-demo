import React, { ReactNode } from 'react';

interface HighlightCardProps {
    title: string;
    value: string | number;
    unit?: string;
    icon: ReactNode;
    description?: string;
    trend?: 'up' | 'down' | 'neutral';
}

const HighlightCard: React.FC<HighlightCardProps> = ({ title, value, unit, icon, description }) => {
    return (
        <div className="glass p-5 rounded-2xl flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl hover:bg-white/10 group">
            <div className="flex items-center gap-2 text-gray-400 mb-4">
                <span className="text-blue-400 p-2 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    {icon}
                </span>
                <h3 className="font-medium text-sm tracking-wide uppercase">{title}</h3>
            </div>

            <div className="mt-auto">
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{value}</span>
                    {unit && <span className="text-lg text-gray-400">{unit}</span>}
                </div>
                {description && <p className="text-sm text-gray-400 mt-2">{description}</p>}
            </div>
        </div>
    );
};

export default HighlightCard;
