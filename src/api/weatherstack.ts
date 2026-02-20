import axios from 'axios';
import { CurrentWeatherResponse, HistoricalWeatherResponse } from '../types/weather';

const BASE_URL = import.meta.env.VITE_WEATHERSTACK_BASE_URL;
const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

const weatherApi = axios.create({
    baseURL: BASE_URL,
});

// WeatherStack does not support HTTPS on free plan easily, so we usually use HTTP.
// VITE_WEATHERSTACK_BASE_URL should include "http://"
// The interceptor appends the api key automatically.
weatherApi.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params.access_key = API_KEY;
    return config;
});

export const getCurrentWeather = async (query: string, unit: 'm' | 'f' = 'm'): Promise<CurrentWeatherResponse> => {
    const response = await weatherApi.get<CurrentWeatherResponse>('/current', {
        params: {
            query,
            units: unit,
        },
    });

    if (response.data.error) {
        throw new Error(response.data.error.info || 'Failed to fetch weather data');
    }

    return response.data;
};

export const getHistoricalWeather = async (query: string, date: string, unit: 'm' | 'f' = 'm'): Promise<HistoricalWeatherResponse> => {
    const response = await weatherApi.get<HistoricalWeatherResponse>('/historical', {
        params: {
            query,
            historical_date: date,
            units: unit,
            hourly: 1, // Get hourly data
        },
    });

    if (response.data.error) {
        throw new Error(response.data.error.info || 'Failed to fetch historical weather data');
    }

    return response.data;
};

export default weatherApi;
