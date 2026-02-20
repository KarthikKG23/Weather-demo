import React, { useEffect, useRef, useState } from 'react';
import { useWeather } from '../context/WeatherContext';

const AnimatedBackground: React.FC = () => {
    const { currentData } = useWeather();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [weatherType, setWeatherType] = useState<'clear' | 'clouds' | 'rain' | 'snow' | 'thunderstorm' | 'night'>('clear');

    useEffect(() => {
        if (!currentData) return;
        const code = currentData.current.weather_code;
        const isDay = currentData.current.is_day === 'yes';

        if (!isDay) setWeatherType('night');
        else if ([113, 116].includes(code)) setWeatherType('clear');
        else if ([119, 122, 143, 248, 260].includes(code)) setWeatherType('clouds');
        else if ([176, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314].includes(code)) setWeatherType('rain');
        else if ([179, 182, 185, 227, 230, 317, 320, 323, 326, 329, 332, 335, 338, 350, 368, 371, 395].includes(code)) setWeatherType('snow');
        else if ([200, 386, 389, 392].includes(code)) setWeatherType('thunderstorm');
        else setWeatherType('clouds'); // Default fallback
    }, [currentData]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let animationFrameId: number;

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Particles System
        const particles: any[] = [];

        // Setup based on weather type
        if (weatherType === 'rain') {
            for (let i = 0; i < 150; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    length: Math.random() * 20 + 10,
                    velocity: Math.random() * 15 + 10,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        } else if (weatherType === 'snow') {
            for (let i = 0; i < 200; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 3 + 1,
                    velocity: Math.random() * 2 + 1,
                    wobble: Math.random() * Math.PI * 2,
                    wobbleSpeed: Math.random() * 0.05 + 0.01,
                    opacity: Math.random() * 0.8 + 0.2
                });
            }
        } else if (weatherType === 'night') {
            for (let i = 0; i < 300; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5,
                    opacity: Math.random(),
                    twinkleSpeed: Math.random() * 0.05 + 0.01,
                    twinkleDir: Math.random() > 0.5 ? 1 : -1
                });
            }
        }

        let flashOpacity = 0;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            if (weatherType === 'rain') {
                ctx.strokeStyle = `rgba(200, 220, 255, ${0.4})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x - p.length * 0.2, p.y + p.length);
                    p.y += p.velocity;
                    p.x -= p.velocity * 0.2;
                    if (p.y > height) {
                        p.y = -p.length;
                        p.x = Math.random() * width;
                    }
                }
                ctx.stroke();
            }
            else if (weatherType === 'snow') {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    p.wobble += p.wobbleSpeed;
                    const wobbleEffect = Math.sin(p.wobble) * 2;
                    ctx.moveTo(p.x + wobbleEffect, p.y);
                    ctx.arc(p.x + wobbleEffect, p.y, p.radius, 0, Math.PI * 2, true);
                    p.y += p.velocity;
                    if (p.y > height) {
                        p.y = -5;
                        p.x = Math.random() * width;
                    }
                }
                ctx.globalAlpha = 0.8;
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
            else if (weatherType === 'night') {
                ctx.fillStyle = 'white';
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    p.opacity += p.twinkleSpeed * p.twinkleDir;
                    if (p.opacity >= 1 || p.opacity <= 0.1) p.twinkleDir *= -1;

                    ctx.globalAlpha = Math.max(0.1, Math.min(1, p.opacity));
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);
                    ctx.fill();
                }
                ctx.globalAlpha = 1.0;
            }
            else if (weatherType === 'thunderstorm') {
                // Random flashes
                if (Math.random() < 0.02) {
                    flashOpacity = Math.random() * 0.5 + 0.3;
                }
                if (flashOpacity > 0) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity})`;
                    ctx.fillRect(0, 0, width, height);
                    flashOpacity -= 0.05;
                }

                // Add rain as well
                ctx.strokeStyle = `rgba(200, 220, 255, 0.5)`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                for (let i = 0; i < particles.length; i++) {
                    // if thunderstorm started before rain particles initialized, create some on fly
                    if (!particles[i]) {
                        particles[i] = { x: Math.random() * width, y: Math.random() * height, length: 15, velocity: 15 };
                    }
                    const p = particles[i];
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x - p.length * 0.2, p.y + p.length);
                    p.y += p.velocity;
                    p.x -= p.velocity * 0.2;
                    if (p.y > height) { p.y = -p.length; p.x = Math.random() * width; }
                }
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [weatherType]);

    // Base background colors based on weather
    const getBgClasses = () => {
        switch (weatherType) {
            case 'clear': return 'from-blue-400 via-blue-500 to-blue-700';
            case 'clouds': return 'from-slate-400 via-gray-500 to-slate-700';
            case 'rain': return 'from-slate-700 via-slate-800 to-slate-900';
            case 'snow': return 'from-blue-200 via-blue-300 to-slate-400';
            case 'thunderstorm': return 'from-neutral-800 via-neutral-900 to-black';
            case 'night': return 'from-indigo-900 via-gray-900 to-black';
            default: return 'from-indigo-900 via-purple-900 to-slate-900';
        }
    };

    return (
        <div className={`fixed inset-0 transition-colors duration-1000 -z-10 bg-gradient-to-br ${getBgClasses()}`}>

            {weatherType === 'clear' && (
                <div className="absolute top-10 right-20 w-64 h-64 bg-yellow-300 rounded-full blur-[100px] opacity-60 animate-pulse"></div>
            )}

            {weatherType === 'clouds' && (
                <div className="absolute inset-0 overflow-hidden opacity-50">
                    {/* Simple CSS Clouds */}
                    <div className="absolute top-10 -left-64 w-96 h-32 bg-white rounded-full blur-3xl animate-[bounce_20s_infinite_alternate]"></div>
                    <div className="absolute top-32 right-10 w-96 h-32 bg-white rounded-full blur-3xl animate-[bounce_15s_infinite_alternate-reverse]"></div>
                </div>
            )}

            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
            />
            {/* Dark overlay for better contrast */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>
    );
};

export default AnimatedBackground;
