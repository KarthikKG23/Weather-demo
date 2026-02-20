import React, { ReactNode } from 'react';

interface ChartCardProps {
    title: string;
    children: ReactNode;
    icon?: ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, icon }) => {
    return (
        <div className="glass p-6 flex flex-col w-full h-full max-h-[500px]">
            <div className="flex items-center gap-3 mb-6">
                {icon && <span className="text-purple-400 p-2 bg-purple-500/10 rounded-xl">{icon}</span>}
                <h3 className="text-xl font-semibold text-white tracking-wide">{title}</h3>
            </div>
            <div className="flex-1 w-full min-h-0">
                {children}
            </div>
        </div>
    );
};

export default ChartCard;
