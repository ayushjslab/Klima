/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { format } from "date-fns";
import type { ForecastData } from "@/app/weather-apis/type";
import Image from "next/image";

interface WeatherForecastProps {
  data: ForecastData;
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as any);

  const nextDays = Object.values(dailyForecasts).slice(1, 6);
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

 return (
   <Card
     className="backdrop-blur-lg bg-gradient-to-br from-white/40 to-white/10 
                    dark:from-white/10 dark:to-black/20 border-none shadow-xl"
   >
     <CardHeader>
       <CardTitle
         className="text-center text-xl font-bold tracking-wide
        bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 
        bg-clip-text text-transparent"
       >
         5-Day Forecast
       </CardTitle>
     </CardHeader>

     <CardContent>
       <div className="grid gap-5">
         {nextDays.map((day: any) => (
           <div
             key={day.date}
             className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 p-5 rounded-2xl
                       bg-white/50 dark:bg-white/5 border border-white/20
                       shadow-md transition-all duration-300
                       hover:shadow-2xl hover:scale-[1.03] hover:bg-white/70 dark:hover:bg-white/10"
           >
             {/* Date */}
             <div className="flex flex-col items-center md:items-start text-center md:text-left">
               <p
                 className="text-base font-semibold bg-gradient-to-r from-black to-gray-600 
                            dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
               >
                 {format(new Date(day.date * 1000), "EEE, MMM d")}
               </p>
               <p className="text-xs opacity-60 capitalize tracking-wide">
                 {day.weather.description}
               </p>
             </div>

             {/* Icon + Temp */}
             <div className="flex justify-center items-center gap-6">
               <div
                 className="p-2 rounded-xl bg-gradient-to-br 
                              from-gray-200/60 to-gray-100/20 
                              dark:from-gray-700/20 dark:to-gray-900/40 
                              shadow-inner transition-all duration-300 group-hover:scale-110"
               >
                 <Image
                   src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                   alt={day.weather.description}
                   width={55}
                   height={55}
                   className="drop-shadow-md"
                 />
               </div>

               <div className="flex gap-4 text-lg font-bold">
                 <span className="flex items-center gap-1 text-blue-500">
                   <ArrowDown className="h-5 w-5" />
                   {formatTemp(day.temp_min)}
                 </span>

                 <span className="flex items-center gap-1 text-red-500">
                   <ArrowUp className="h-5 w-5" />
                   {formatTemp(day.temp_max)}
                 </span>
               </div>
             </div>

             {/* Humidity + Wind */}
             <div className="flex justify-center md:justify-end gap-6 text-sm opacity-80">
               <span className="flex items-center gap-2">
                 <Droplets className="h-5 w-5 text-blue-400 drop-shadow-sm" />
                 {day.humidity}%
               </span>

               <span className="flex items-center gap-2">
                 <Wind className="h-5 w-5 text-sky-400 drop-shadow-sm" />
                 {day.wind} m/s
               </span>
             </div>
           </div>
         ))}
       </div>
     </CardContent>
   </Card>
 );
}
