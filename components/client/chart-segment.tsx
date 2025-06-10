"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
 {month:"January" , desktop:10 ,mobile:2 ,},
 {month:"February" , desktop:2 ,mobile:8 ,},
 {month:"March" , desktop:5 ,mobile:8 ,},
 {month:"April" , desktop:5 ,mobile:2,},
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


export default function ChartFunction() {
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