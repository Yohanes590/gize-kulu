"use client"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ChartItem = {
  month: string
  complete: number
  incomplete: number
}

const chartConfig = {
  complete: {
    label: "Complete",
    color: "#2563eb",
  },
  incomplete: {
    label: "Incomplete",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export default function ChartFunction() {
  const [chartData, setChartData] = useState<ChartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const token = Cookies.get("access-token")
        const res = await fetch("/API/cli/user-data-show", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userToken: token }),
        })
        const { user_projects } = await res.json()

        const today = new Date()
        const newData: ChartItem[] = []

        for (let i = 5; i >= 0; i--) {
          const target = new Date(today.getFullYear(), today.getMonth() - i, 1)
          const yyyy = target.getFullYear()
          const mm = String(target.getMonth() + 1).padStart(2, "0")
          const monthKey = `${yyyy}-${mm}`
          const monthName = target.toLocaleString("default", { month: "long" })

          let complete = 0
          let incomplete = 0

          user_projects.forEach((project: any) => {
            if (
              project.started_date.startsWith(monthKey) &&
              Array.isArray(project.project_task)
            ) {
              project.project_task.forEach((task: any) => {
                if (task.status === "COMPLETE") complete++
                else incomplete++
              })
            }
          })

          newData.push({ month: monthName, complete, incomplete })
        }

        setChartData(newData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchChart()
  }, [])

  if (loading) {
    return (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full flex items-center justify-center">
        <p>Loading...</p>
      </ChartContainer>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="complete" fill="var(--color-complete)" radius={4} />
        <Bar dataKey="incomplete" fill="var(--color-incomplete)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
