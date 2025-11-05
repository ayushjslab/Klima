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
    <Card className="flex-1 backdrop-blur-md border border-white/10 shadow-xl">
      <CardHeader>
        <CardTitle className="font-bold text-lg lg:text-xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Today’s Temperature
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                {/* Gradient For Main Temp Line */}
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />

              <XAxis
                dataKey="time"
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />

              <Tooltip
                content={({ active, payload }) =>
                  active && payload && payload.length ? (
                    <div className="rounded-lg border border-white/20 bg-black/60 backdrop-blur-md p-2 shadow-lg animate-fade-in">
                      <p className="text-xs text-gray-300">
                        Feels Like:{" "}
                        <span className="font-bold text-white">
                          {payload[1].value}°
                        </span>
                      </p>
                      <p className="text-xs text-gray-300">
                        Temperature:{" "}
                        <span className="font-bold text-white">
                          {payload[0].value}°
                        </span>
                      </p>
                    </div>
                  ) : null
                }
              />

              {/* Main Temp Line */}
              <Line
                type="monotone"
                dataKey="temp"
                stroke="url(#tempGradient)"
                strokeWidth={3}
                dot={{ r: 3, strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 6 }}
              />

              {/* Feels Like - Dashed */}
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#94a3b8"
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
