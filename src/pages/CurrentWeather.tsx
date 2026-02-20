import React from 'react';
import { useWeather } from '../context/WeatherContext';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import HighlightCard from '../components/HighlightCard';
import { format } from 'date-fns';
import { Wind, Cloud, Droplets } from 'lucide-react';

const CurrentWeather: React.FC = () => {
    const { currentData, loading, error, unit } = useWeather();

    if (loading) return <Loader fullScreen={false} />;

    if (error) {
        return (
            <div className="flex flex-col gap-6 w-full mx-auto">
                <h1 className="text-3xl font-bold">Current Weather</h1>
                <ErrorMessage message={error} />
            </div>
        );
    }

    if (!currentData) {
        return (
            <div className="flex flex-col gap-6 w-full mx-auto">
                <h1 className="text-3xl font-bold">Current Weather Details</h1>
                <div className="glass p-8 flex items-center justify-center text-center min-h-[200px]">
                    <p className="text-gray-300">Please search for a location to see current details.</p>
                </div>
            </div>
        );
    }

    const { current, location } = currentData;
    const tempUnit = unit === 'm' ? '°C' : '°F';
    const speedUnit = unit === 'm' ? 'km/h' : 'mph';

    return (
        <div className="flex flex-col gap-6 w-full mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Current Weather</h1>
                    <p className="text-gray-400">
                        {location.name}, {location.region}, {location.country}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-medium text-blue-300">
                        {format(new Date(location.localtime), 'h:mm a')}
                    </p>
                    <p className="text-sm text-gray-400">Local Time</p>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="glass p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <img
                            src={current.weather_icons[0]}
                            alt="Weather"
                            className="w-24 h-24 rounded-2xl shadow-lg border border-white/10"
                        />
                        <div>
                            <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white tracking-tighter mix-blend-lighten">
                                {current.temperature}<span className="text-4xl">{tempUnit}</span>
                            </p>
                            <p className="text-2xl mt-2 text-blue-100 font-medium">
                                {current.weather_descriptions[0]}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 glass p-6 rounded-xl w-full md:w-auto bg-black/20">
                        <div className="flex justify-between gap-8">
                            <span className="text-gray-400">Feels Like</span>
                            <span className="font-semibold">{current.feelslike}{tempUnit}</span>
                        </div>
                        <div className="flex justify-between gap-8">
                            <span className="text-gray-400">Precipitation</span>
                            <span className="font-semibold">{current.precip} mm</span>
                        </div>
                        <div className="flex justify-between gap-8">
                            <span className="text-gray-400">Observation Time</span>
                            <span className="font-semibold">{current.observation_time}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <HighlightCard
                        title="Wind Speed"
                        value={current.wind_speed}
                        unit={speedUnit}
                        icon={<Wind size={20} />}
                        description={`Direction: ${current.wind_dir} (${current.wind_degree}°)`}
                    />
                    <HighlightCard
                        title="Humidity"
                        value={current.humidity}
                        unit="%"
                        icon={<Droplets size={20} />}
                    />
                    <HighlightCard
                        title="Cloud Cover"
                        value={current.cloudcover}
                        unit="%"
                        icon={<Cloud size={20} />}
                    />
                    <HighlightCard
                        title="UV Index"
                        value={current.uv_index}
                        icon={<Wind size={20} />}
                    />
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
