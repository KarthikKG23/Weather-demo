import React from 'react';
import { useWeather } from '../context/WeatherContext';
import WeatherCard from '../components/WeatherCard';
import HighlightCard from '../components/HighlightCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Droplets, Wind, Sun, Eye, Navigation, Cloud } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { currentData, loading, error, unit, searchHistory, fetchWeather } = useWeather();

    const handleHistoryClick = (query: string) => {
        fetchWeather(query);
    };

    if (loading) return <Loader fullScreen={false} />;

    if (error) {
        return (
            <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <ErrorMessage message={error} />
            </div>
        );
    }

    if (!currentData) {
        return (
            <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <div className="glass p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <Cloud size={64} className="text-blue-400/50 mb-6" />
                    <h2 className="text-2xl font-semibold mb-2">Welcome to SkyDash</h2>
                    <p className="text-gray-400 max-w-md">
                        Search for a city or use your current location to check the weather forecast.
                    </p>

                    {searchHistory.length > 0 && (
                        <div className="mt-8 border-t border-white/10 pt-6 w-full max-w-sm">
                            <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Recent Searches</h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {searchHistory.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleHistoryClick(item)}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-blue-200 transition-colors border border-white/10"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const { current } = currentData;
    const speedUnit = unit === 'm' ? 'km/h' : 'mph';

    return (
        <div className="flex flex-col gap-8 w-full">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <WeatherCard data={currentData} unit={unit} />
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <HighlightCard
                        title="Wind Status"
                        value={current.wind_speed}
                        unit={speedUnit}
                        icon={<Wind size={20} />}
                        description={`${current.wind_dir} direction`}
                    />
                    <HighlightCard
                        title="Humidity"
                        value={current.humidity}
                        unit="%"
                        icon={<Droplets size={20} />}
                        description="The dew point is feeling comfortable right now."
                    />
                    <HighlightCard
                        title="Visibility"
                        value={current.visibility}
                        unit={unit === 'm' ? 'km' : 'mi'}
                        icon={<Eye size={20} />}
                        description={current.visibility > 8 ? "Clear view" : "Reduced visibility"}
                    />
                    <HighlightCard
                        title="UV Index"
                        value={current.uv_index}
                        icon={<Sun size={20} />}
                        description={current.uv_index > 5 ? "High risk of harm" : "Low risk"}
                    />
                    <HighlightCard
                        title="Pressure"
                        value={current.pressure}
                        unit="hPa"
                        icon={<Navigation size={20} />}
                    />
                    <HighlightCard
                        title="Cloud Cover"
                        value={current.cloudcover}
                        unit="%"
                        icon={<Cloud size={20} />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
