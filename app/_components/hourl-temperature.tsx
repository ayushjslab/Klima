import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";
import type { ForecastData } from "@/app/weather-apis/type";

interface HourlyTemperatureProps {
  data: ForecastData;
}

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

export function HourlyTemperature({ data }: HourlyTemperatureProps) {
  const chartData: ChartData[] = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card
      className="flex-1 border shadow-lg 
      bg-gradient-to-br from-white/40 to-white/10 dark:from-white/10 dark:to-black/20  transition-all"
    >
      <CardHeader>
        <CardTitle
          className="font-bold text-lg lg:text-xl
          bg-gradient-to-r from-blue-600 to-purple-600 
          dark:from-blue-400 dark:to-purple-400 
          bg-clip-text text-transparent"
        >
          Today’s Temperature
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                {/* Theme-Adaptive Gradient */}
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="rgba(100,100,100,0.15)" vertical={false} />

              <XAxis
                dataKey="time"
                className="fill-current text-muted-foreground"
                stroke="currentColor"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="currentColor"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
                className="fill-current text-muted-foreground"
              />

              <Tooltip
                content={({ active, payload }) =>
                  active && payload && payload.length ? (
                    <div
                      className="rounded-lg border shadow-md p-2 text-xs
                      bg-white/80 backdrop-blur-md 
                      dark:bg-black/70 dark:border-white/20
                      transition-all"
                    >
                      <p className="text-muted-foreground">Temperature:</p>
                      <span className="font-bold text-foreground">
                        {payload[0].value}°
                      </span>

                      <p className="text-muted-foreground">Feels Like:</p>
                      <span className="font-bold text-foreground">
                        {payload[1].value}°
                      </span>
                    </div>
                  ) : null
                }
              />

              <Line
                type="monotone"
                dataKey="temp"
                stroke="url(#tempGradient)"
                strokeWidth={3}
                dot={{ r: 3, fill: "currentColor" }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="currentColor"
                className="text-muted-foreground"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
