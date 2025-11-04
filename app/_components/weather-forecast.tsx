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
    <Card className="backdrop-blur-lg bg-white/10 shadow-xl border-white/20">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold tracking-wide">
          5-Day Forecast
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day: any) => (
            <div
              key={day.date}
              className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-4 rounded-xl
                        bg-white/10 border border-white/20 shadow-sm
                        hover:shadow-md hover:scale-[1.01] transition-all duration-300"
            >
              {/* Date + Description */}
              <div className="flex flex-col items-center md:items-start">
                <p className="font-medium">
                  {format(new Date(day.date * 1000), "EEE, MMM d")}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {day.weather.description}
                </p>
              </div>

              {/* Weather Icon + Temp */}
              <div className="flex justify-center items-center gap-4">
                <Image
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                  alt={day.weather.description}
                  width={45}
                  height={45}
                />

                <div className="flex gap-3">
                  <span className="flex items-center text-blue-400 font-semibold">
                    <ArrowDown className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_min)}
                  </span>

                  <span className="flex items-center text-red-400 font-semibold">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>
              </div>

              {/* Humidity + Wind */}
              <div className="flex justify-center md:justify-end gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-blue-400" />
                  {day.humidity}%
                </span>

                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-sky-400" />
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
