import React from 'react';
import { NavLink } from 'react-router-dom';
import { Cloud, History, LayoutDashboard } from 'lucide-react';

const Sidebar: React.FC = () => {
    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Current', path: '/current', icon: <Cloud size={20} /> },
        { name: 'History', path: '/history', icon: <History size={20} /> },
    ];

    return (
        <aside className="w-64 hidden md:flex flex-col glass h-screen sticky top-0 left-0 p-4 border-r border-white/10 z-10 transition-colors">
            <div className="flex items-center gap-3 mb-10 mt-4 px-2">
                <Cloud className="text-blue-400" size={32} />
                <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">SkyDash</h1>
            </div>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium
              ${isActive
                                ? 'bg-blue-500/20 text-blue-300 shadow-inner border border-blue-500/30'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }
            `}
                    >
                        {item.icon}
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
