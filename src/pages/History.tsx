import React, { useState, useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import ChartCard from '../components/ChartCard';
import HighlightCard from '../components/HighlightCard';
import { format, subDays } from 'date-fns';
import { Calendar, Thermometer, Droplets, Sun } from 'lucide-react';

// Lazy load Recharts to optimize initial bundle size
const RechartsLineChart = React.lazy(() => import('recharts').then(module => ({ default: module.LineChart })));
const RechartsLine = React.lazy(() => import('recharts').then(module => ({ default: module.Line })));
const RechartsXAxis = React.lazy(() => import('recharts').then(module => ({ default: module.XAxis })));
const RechartsYAxis = React.lazy(() => import('recharts').then(module => ({ default: module.YAxis })));
const RechartsCartesianGrid = React.lazy(() => import('recharts').then(module => ({ default: module.CartesianGrid })));
const RechartsTooltip = React.lazy(() => import('recharts').then(module => ({ default: module.Tooltip })));
const RechartsResponsiveContainer = React.lazy(() => import('recharts').then(module => ({ default: module.ResponsiveContainer })));

const History: React.FC = () => {
    const { fetchHistorical, historicalData, loading, error, unit, searchQuery } = useWeather();
    const [selectedDate, setSelectedDate] = useState<string>(format(subDays(new Date(), 1), 'yyyy-MM-dd')); // default yesterday

    useEffect(() => {
        if (searchQuery) {
            handleFetchHistory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate, unit]); // Fetch when date or unit changes

    const handleFetchHistory = () => {
        if (!searchQuery) return;
        const d = new Date(selectedDate);
        // Ensure invalid dates don't break the app
        if (!isNaN(d.getTime())) {
            fetchHistorical(searchQuery, d);
        }
    };

    if (loading) return <Loader fullScreen={false} />;

    const maxDate = format(subDays(new Date(), 1), 'yyyy-MM-dd'); // Weatherstack historical is past data

    const renderContent = () => {
        if (error) {
            return <ErrorMessage message={error} />;
        }

        if (!historicalData || !historicalData.historical) {
            return (
                <div className="glass p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
                    <Calendar size={48} className="text-gray-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Historical Data</h3>
                    <p className="text-gray-400">Search for a location first, then select a date to view past weather.</p>
                </div>
            );
        }

        const historicalKey = Object.keys(historicalData.historical)[0];
        const dayData = historicalData.historical[historicalKey];
        if (!dayData) return <ErrorMessage message={"No data available for this date."} />;

        const hourlyChartData = dayData.hourly.map((h: any) => ({
            time: `${String(Math.floor(parseInt(h.time) / 100)).padStart(2, '0')}:00`,
            temperature: h.temperature,
            humidity: h.humidity,
        }));

        const tempUnit = unit === 'm' ? '°C' : '°F';

        return (
            <div className="flex flex-col gap-6 w-full animate-in fade-in zoom-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <HighlightCard
                        title="Avg Temp"
                        value={dayData.avgtemp}
                        unit={tempUnit}
                        icon={<Thermometer size={20} />}
                    />
                    <HighlightCard
                        title="Min / Max"
                        value={`${dayData.mintemp} / ${dayData.maxtemp}`}
                        unit={tempUnit}
                        icon={<Thermometer size={20} />}
                    />
                    <HighlightCard
                        title="Total Snow"
                        value={dayData.totalsnow}
                        unit="cm"
                        icon={<Droplets size={20} />}
                    />
                    <HighlightCard
                        title="UV Index"
                        value={dayData.uv_index}
                        icon={<Sun size={20} />}
                    />
                </div>

                <div className="mt-4 h-[400px]">
                    <ChartCard title={`Hourly Temperature (${tempUnit})`}>
                        <React.Suspense fallback={<div className="h-full flex items-center justify-center text-gray-400">Loading chart...</div>}>
                            <RechartsResponsiveContainer width="100%" height="100%">
                                <RechartsLineChart data={hourlyChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <RechartsCartesianGrid strokeDasharray="3 3" stroke="#ffffff20" vertical={false} />
                                    <RechartsXAxis dataKey="time" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                    <RechartsYAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#60a5fa' }}
                                    />
                                    <RechartsLine
                                        type="monotone"
                                        dataKey="temperature"
                                        stroke="#60a5fa"
                                        strokeWidth={3}
                                        dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, stroke: '#fff' }}
                                    />
                                </RechartsLineChart>
                            </RechartsResponsiveContainer>
                        </React.Suspense>
                    </ChartCard>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-6 w-full mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold mb-2">Historical Data</h1>

                <div className="flex items-center gap-3 bg-black/20 p-2 rounded-xl border border-white/10 w-full md:w-auto">
                    <Calendar className="text-gray-400 ml-2" size={20} />
                    <input
                        type="date"
                        value={selectedDate}
                        max={maxDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-transparent border-none text-white focus:outline-none focus:ring-0 p-1 w-full"
                    />
                </div>
            </div>

            {renderContent()}
        </div>
    );
};

export default History;
