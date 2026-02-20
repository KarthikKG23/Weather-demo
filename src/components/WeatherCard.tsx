import React from 'react';
import { CurrentWeatherResponse } from '../types/weather';
import { MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface WeatherCardProps {
    data: CurrentWeatherResponse;
    unit: 'm' | 'f';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, unit }) => {
    const { current, location } = data;
    const tempUnit = unit === 'm' ? '°C' : '°F';

    return (
        <div className="glass p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-white/10 group">
            {/* Background glow decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-75"></div>

            <div className="flex justify-between items-start z-10">
                <div>
                    <div className="flex items-center gap-2 text-gray-200 mb-1">
                        <MapPin size={18} className="text-blue-400" />
                        <h2 className="text-xl md:text-2xl font-semibold tracking-wide">
                            {location.name}, {location.country}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar size={14} />
                        <p>{format(new Date(location.localtime), 'EEEE, d MMM yyyy')}</p>
                    </div>
                </div>
                <img
                    src={current.weather_icons[0]}
                    alt={current.weather_descriptions[0]}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl shadow-lg shadow-black/20"
                />
            </div>

            <div className="mt-8 z-10 flex flex-col md:flex-row items-end md:items-center justify-between">
                <div className="flex items-start">
                    <span className="text-7xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                        {current.temperature}
                    </span>
                    <span className="text-3xl font-medium text-gray-300 mt-2">{tempUnit}</span>
                </div>

                <div className="text-right mt-4 md:mt-0">
                    <p className="text-2xl font-medium text-blue-100">{current.weather_descriptions[0]}</p>
                    <p className="text-gray-400 mt-1">Feels like {current.feelslike}{tempUnit}</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
