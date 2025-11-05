import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";
import { format } from "date-fns";
import type { WeatherData } from "@/app/weather-apis/type";

interface WeatherDetailsProps {
  data: WeatherData;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const { wind, main, sys } = data;

  // Format time using date-fns
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  // Convert wind degree to direction
  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card className="backdrop-blur-md bg-gradient-to-br from-white/40 to-white/10 dark:from-white/10 dark:to-black/20 border-none shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle
          className="text-xl font-bold bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 
        bg-clip-text text-transparent tracking-wide"
        >
          Weather Details
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-4 rounded-xl p-4 bg-white/50 dark:bg-white/5 
                       shadow-md transition-all duration-300 border border-white/20 hover:shadow-2xl 
                       hover:scale-[1.03] hover:bg-white/70 dark:hover:bg-white/10"
            >
              <div
                className="p-3 rounded-lg bg-gradient-to-br from-gray-200/60 to-gray-100/20 
                             dark:from-gray-700/20 dark:to-gray-900/40 shadow-inner
                             transition-all duration-300 group-hover:scale-110"
              >
                <detail.icon
                  className={`h-6 w-6 ${detail.color} drop-shadow-md transition-all`}
                />
              </div>

              <div>
                <p className="text-sm font-semibold opacity-80">
                  {detail.title}
                </p>
                <p
                  className="text-base font-semibold bg-gradient-to-r from-black to-gray-600 
                            dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                >
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
