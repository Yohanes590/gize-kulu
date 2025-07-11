"use client"

import { useEffect, useState } from "react"
import { FaFolder } from "react-icons/fa"
import { MdTask } from "react-icons/md"
import { SiTask } from "react-icons/si"
import SideNavBar from "./client/side-nav"
import ChartFunction from "./client/chart-segment"
import ChartFunction2 from "./client/chart-segment-2"
import Cookies from "js-cookie"
import { toast } from "react-hot-toast"

type AnalyticsData = {
  totalProjects: number
  pausedProjects: number
  completeProjects: number
  incompleteProjects: number
}

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("access-token")
        const res = await fetch("/API/cli/user-data-show", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userToken: token }),
        })
        const data = await res.json()
        const projects = data.user_projects || []

        const totalProjects = projects.length
        const pausedProjects = projects.filter((p: any) => p.project_status === "paused").length
        const completeProjects = projects.filter((p: any) => p.project_status === "complete").length
        const incompleteProjects = projects.filter((p: any) => p.project_status === "in-complete").length

        setAnalytics({
          totalProjects,
          pausedProjects,
          completeProjects,
          incompleteProjects,
        })
      } catch (_error:unknown) {
        toast.error("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <SideNavBar />
      <div className="dashboard-container flex ml-[400px] pt-[80px] items-center">
        <div className="dashboard-card-container">
          <div className="header-section">
            <h1 className="text-[25px] font-bold">Dashboard</h1>
            <p className="text-[16px] text-[#807d7d]">
              Monitor your workspace activities and projects
            </p>
          </div>
          <div className="flex flex-wrap gap-5">
            {[
              { title: "Total Projects", value: analytics?.totalProjects, color: "blue", icon: <FaFolder color="blue" size={25} /> },
              { title: "Paused Projects", value: analytics?.pausedProjects, color: "orange", icon: <MdTask color="orange" size={25} /> },
              { title: "Completed Projects", value: analytics?.completeProjects, color: "green", icon: <SiTask color="green" size={25} /> },
              { title: "Incomplete Projects", value: analytics?.incompleteProjects, color: "red", icon: <FaFolder color="red" size={25} /> },
            ].map((card, idx) => (
              <div
                key={idx}
                className="each-dashboard-card flex items-center justify-between pl-[20px] w-[350px] rounded-[10px] h-[120px] mt-[20px] shadow-[0_0_3px_#cecece]"
              >
                <div className="card-titles">
                  <p className="text-[#6e6e6e]">{card.title}</p>
                  <p className="text-[30px] font-bold">{loading ? "..." : card.value ?? 0}</p>
                </div>
                <div className={`icon-symbol text-${card.color}-500 pr-[30px]`}>
                  {card.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-section-card flex flex-wrap gap-5 ml-[400px]">
        <div className="each-chart-card mt-[40px] rounded-[10px] shadow-[0_0_3px_#cecece] w-[720px] h-[500px]">
          <div className="chart-header pt-[20px] pl-[30px]">
            <h1 className="font-bold text-[25px]">Task complete & in complete progress</h1>
          </div>
          <div className="chart">
            <ChartFunction2 />
          </div>
        </div>

        <div className="each-chart-card mt-[40px] rounded-[10px] shadow-[0_0_3px_#cecece] w-[720px] h-[500px]">
          <div className="chart-header pt-[20px] pl-[30px]">
            <h1 className="font-bold text-[25px]">Monthly task progress</h1>
          </div>
          <div className="chart">
            <ChartFunction />
          </div>
        </div>
      </div>
    </>
  )
}
