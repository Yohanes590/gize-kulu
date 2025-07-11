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
  day: string
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

export default function ChartFunction2() {
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

        for (let i = 6; i >= 0; i--) {
          const targetDate = new Date()
          targetDate.setDate(today.getDate() - i)

          const yyyy = targetDate.getFullYear()
          const mm = String(targetDate.getMonth() + 1).padStart(2, "0")
          const dd = String(targetDate.getDate()).padStart(2, "0")
          const formattedDate = `${yyyy}-${mm}-${dd}`

          let complete = 0
          let incomplete = 0

          user_projects.forEach((project: any) => {
            if (Array.isArray(project.project_task)) {
              project.project_task.forEach((task: any) => {
                const taskDate = new Date(task.start_date)
                const taskFormatted = taskDate.toISOString().split("T")[0]
                if (taskFormatted === formattedDate) {
                  if (task.status === "COMPLETE") complete++
                  else incomplete++
                }
              })
            }
          })

          newData.push({ day: formattedDate, complete, incomplete })
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
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full flex items-center justify-center"
      >
        <p>Loading...</p>
      </ChartContainer>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine
          axisLine={false}
          tickFormatter={(v) => v.slice(5)} // show only MM-DD
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="complete" fill="var(--color-complete)" radius={4} />
        <Bar dataKey="incomplete" fill="var(--color-incomplete)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
