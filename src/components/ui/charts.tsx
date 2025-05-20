"use client";

import * as React from "react";
import {
  Bar,
  BarChart as BarChartRoot,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  name: string;
  total: number;
}

interface AreaChartProps {
  data: ChartData[];
}

export function AreaChart({ data }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 5,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          dy={10}
          tick={{ fill: "#888888", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#888888", fontSize: 12 }}
          width={40}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        {payload[0].payload.name}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        ${payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="total"
          activeDot={{
            r: 6,
            fill: "hsl(var(--primary))",
          }}
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface BarChartProps {
  data: ChartData[];
}

export function BarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChartRoot
        data={data}
        margin={{
          top: 20,
          right: 5,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          dy={10}
          tick={{ fill: "#888888", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#888888", fontSize: 12 }}
          width={40}
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted)/0.3)" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        {payload[0].payload.name}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="total"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
      </BarChartRoot>
    </ResponsiveContainer>
  );
} 