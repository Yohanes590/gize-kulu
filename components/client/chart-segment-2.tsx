"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
 {month:"January" , desktop:8 ,mobile:5 ,},
 {month:"February" , desktop:3 ,mobile:2 ,},
 {month:"March" , desktop:6 ,mobile:1 ,},
 {month:"April" , desktop:9 ,mobile:5,},
]
const chartConfig = {
      desktop: {
    label: "Complete",
    color: "#2563eb",
  },
  mobile: {
    label: "Incomplete",
    color: "#60a5fa",
      },
  
} satisfies ChartConfig


export default function ChartFunction2() {
      return (<>
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 9)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
      </>)
}