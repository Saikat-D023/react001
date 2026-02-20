import React from 'react';
import { Sun, CloudRain, Cloud, Snowflake, MapPin, Calendar, Clock } from 'lucide-react';

export function WeatherCard({ data }: { data: any }) {
    const condition = data.condition?.toLowerCase() || 'sunny';

    const getTheme = () => {
        if (condition.includes('rain')) return { bg: "from-blue-500 to-blue-600", icon: <CloudRain className="w-16 h-16" /> };
        if (condition.includes('cloud')) return { bg: "from-slate-400 to-slate-500", icon: <Cloud className="w-16 h-16" /> };
        if (condition.includes('snow')) return { bg: "from-cyan-300 to-blue-400", icon: <Snowflake className="w-16 h-16" /> };
        return { bg: "from-amber-400 to-orange-500", icon: <Sun className="w-16 h-16" /> };
    };

    const theme = getTheme();

    return (
        <div className="w-[300px] shrink-0 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col text-white">
            {/* Top Gradient Section */}
            <div className={`bg-gradient-to-br ${theme.bg} p-8 relative flex flex-col items-center min-h-[320px]`}>
                {/* Header Info */}
                <div className="w-full flex justify-between items-center opacity-80 mb-8 px-2">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{data.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider">{data.date}</span>
                        <Calendar className="w-3 h-3" />
                    </div>
                </div>

                {/* Big Icon */}
                <div className="drop-shadow-lg mb-4 text-white/90">
                    {theme.icon}
                </div>

                {/* Temperature */}
                <div className="text-center">
                    <div className="text-7xl font-light tracking-tighter flex items-start justify-center">
                        {data.temp}
                        <span className="text-2xl mt-3 ml-1">°C</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-90 mt-3">
                        {condition}
                    </p>
                </div>
            </div>

            {/* Bottom Location Section */}
            <div className="bg-white p-6 flex flex-col items-center justify-center border-t border-slate-100">
                <div className="flex items-center gap-2 text-zinc-800">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-black uppercase tracking-[0.15em]">{data.location}</span>
                </div>
            </div>
        </div>
    );
}