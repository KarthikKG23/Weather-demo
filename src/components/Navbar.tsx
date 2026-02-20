import React, { useState } from 'react';
import { Search, MapPin, Menu, CloudRain } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const Navbar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
    const [input, setInput] = useState('');
    const { fetchWeather, unit, setUnit, loading } = useWeather();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !loading) {
            fetchWeather(input);
            setInput('');
        }
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeather(`${lat},${lon}`);
                },
                (error) => {
                    console.error("Error obtaining location", error);
                }
            );
        }
    };

    return (
        <header className="glass sticky top-0 z-20 w-full px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10">
            <div className="flex items-center justify-between w-full md:w-auto">
                <div className="flex items-center gap-2 md:hidden">
                    <CloudRain className="text-blue-400" size={28} />
                    <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">SkyDash</h1>
                </div>
                <button onClick={onMenuClick} className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg">
                    <Menu size={24} />
                </button>
            </div>

            <div className="flex flex-1 items-center justify-end gap-4 w-full md:w-auto">
                <form onSubmit={handleSearch} className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search city or zip code..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-black/20 border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm transition-all"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
                </form>

                <button
                    onClick={getUserLocation}
                    className="p-2.5 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-full border border-blue-500/30 transition-colors"
                    title="Use my location"
                >
                    <MapPin size={20} />
                </button>

                <div className="flex bg-black/20 rounded-full p-1 border border-white/10">
                    <button
                        onClick={() => setUnit('m')}
                        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${unit === 'm' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                    >
                        °C
                    </button>
                    <button
                        onClick={() => setUnit('f')}
                        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${unit === 'f' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                    >
                        °F
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
