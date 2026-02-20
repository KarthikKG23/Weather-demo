import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentWeather, getHistoricalWeather } from '../api/weatherstack';
import { CurrentWeatherResponse, HistoricalWeatherResponse } from '../types/weather';
import { format } from 'date-fns';

interface WeatherContextType {
    currentData: CurrentWeatherResponse | null;
    historicalData: HistoricalWeatherResponse | null;
    loading: boolean;
    error: string | null;
    unit: 'm' | 'f';
    searchQuery: string;
    searchHistory: string[];
    setUnit: (unit: 'm' | 'f') => void;
    fetchWeather: (query: string) => Promise<void>;
    fetchHistorical: (query: string, date: Date) => Promise<void>;
    clearError: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentData, setCurrentData] = useState<CurrentWeatherResponse | null>(null);
    const [historicalData, setHistoricalData] = useState<HistoricalWeatherResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<'m' | 'f'>('m');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<string[]>(() => {
        const saved = localStorage.getItem('weatherSearchHistory');
        return saved ? JSON.parse(saved) : [];
    });

    const clearError = () => setError(null);

    const saveToHistory = (query: string) => {
        setSearchHistory(prev => {
            const filtered = prev.filter(item => item.toLowerCase() !== query.toLowerCase());
            const newHistory = [query, ...filtered].slice(0, 5);
            localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const fetchWeather = async (query: string) => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getCurrentWeather(query, unit);
            setCurrentData(data);
            setSearchQuery(query);
            if (data.location?.name) {
                saveToHistory(data.location.name);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred fetching weather data.');
        } finally {
            setLoading(false);
        }
    };

    const fetchHistorical = async (query: string, date: Date) => {
        setLoading(true);
        setError(null);
        try {
            const dateString = format(date, 'yyyy-MM-dd');
            const data = await getHistoricalWeather(query, dateString, unit);
            setHistoricalData(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred fetching historical weather data.');
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch current data when unit changes if we have a query
    useEffect(() => {
        if (searchQuery) {
            fetchWeather(searchQuery);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unit]);

    return (
        <WeatherContext.Provider
            value={{
                currentData,
                historicalData,
                loading,
                error,
                unit,
                searchQuery,
                searchHistory,
                setUnit,
                fetchWeather,
                fetchHistorical,
                clearError,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (context === undefined) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
};
