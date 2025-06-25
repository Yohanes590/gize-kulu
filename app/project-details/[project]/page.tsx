"use client";
import { useParams } from "next/navigation";
export default function ClientProjectDetails() {
  const params = useParams();
  const project = params.project as string
  return <p>Project details: {decodeURI(project)}</p>;
}
