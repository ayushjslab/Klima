/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import type { WeatherData, GeocodingResponse } from "@/app/weather-apis/type";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

 return (
   <Card
     className="overflow-hidden backdrop-blur-lg bg-gradient-to-br 
                   from-white/40 to-white/10 dark:from-white/10 dark:to-black/20 
                   border shadow-xl"
   >
     <CardContent className="p-8">
       <div className="grid gap-8 md:grid-cols-2">
         {/* Location + Temp */}
         <div className="space-y-6">
           {/* Location */}
           <div>
             <h2
               className="text-3xl font-extrabold tracking-wide 
                           bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 
                           bg-clip-text text-transparent"
             >
               {locationName?.name}
             </h2>

             <p className="text-sm opacity-70">
               {locationName?.state && `${locationName.state}, `}
               {locationName?.country}
             </p>
           </div>

           {/* Main Temp */}
           <div className="flex items-center gap-4">
             <p
               className="text-8xl font-bold bg-gradient-to-r 
                          from-black to-gray-600 dark:from-white dark:to-gray-300 
                          bg-clip-text text-transparent drop-shadow-sm leading-none"
             >
               {formatTemp(temp)}
             </p>

             <div className="space-y-2">
               <p className="text-sm font-medium opacity-70">
                 Feels like {formatTemp(feels_like)}
               </p>

               <div className="flex gap-3 text-sm font-semibold">
                 <span className="flex items-center gap-1 text-blue-500">
                   <ArrowDown className="h-4 w-4" />
                   {formatTemp(temp_min)}
                 </span>
                 <span className="flex items-center gap-1 text-red-500">
                   <ArrowUp className="h-4 w-4" />
                   {formatTemp(temp_max)}
                 </span>
               </div>
             </div>
           </div>

           {/* Humidity + Wind */}
           <div className="grid grid-cols-2 gap-6">
             <div className="flex items-center gap-3">
               <div
                 className="p-3 rounded-lg bg-gradient-to-br 
                              from-blue-400/20 to-blue-600/10 
                              dark:from-blue-600/20 dark:to-blue-800/10 
                              shadow-inner"
               >
                 <Droplets className="h-5 w-5 text-blue-500 drop-shadow-sm" />
               </div>
               <div>
                 <p className="text-sm font-semibold opacity-80">Humidity</p>
                 <p className="text-sm opacity-65">{humidity}%</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <div
                 className="p-3 rounded-lg bg-gradient-to-br 
                              from-sky-400/20 to-sky-600/10 
                              dark:from-sky-600/20 dark:to-sky-800/10 
                              shadow-inner"
               >
                 <Wind className="h-5 w-5 text-sky-500 drop-shadow-sm" />
               </div>
               <div>
                 <p className="text-sm font-semibold opacity-80">Wind</p>
                 <p className="text-sm opacity-65">{speed} m/s</p>
               </div>
             </div>
           </div>
         </div>

         {/* Weather Icon */}
         <div className="flex flex-col items-center justify-center">
           <div
             className="relative flex aspect-square w-full max-w-[240px] 
                          items-center justify-center group"
           >
             <div
               className="absolute inset-0 bg-gradient-to-br 
                            from-white/40 to-white/10 dark:from-white/10 dark:to-black/20 
                            rounded-3xl blur-xl opacity-40"
             />

             <img
               src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
               alt={currentWeather.description}
               className="h-full w-full object-contain drop-shadow-xl 
                         transition-transform duration-300 group-hover:scale-110"
             />
           </div>

           <p
             className="mt-4 text-base font-semibold capitalize 
                        bg-gradient-to-r from-gray-900 to-gray-600 
                        dark:from-gray-200 dark:to-gray-400 
                        bg-clip-text text-transparent"
           >
             {currentWeather.description}
           </p>
         </div>
       </div>
     </CardContent>
   </Card>
 );

}
