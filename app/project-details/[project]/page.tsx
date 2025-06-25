"use client";
import { useParams } from "next/navigation";
import SideNavBar from "@/components/client/side-nav";
export default function ClientProjectDetails() {
  const params = useParams();
  const project = params.project as string
  return <>
  <SideNavBar/>
  </>;
}
