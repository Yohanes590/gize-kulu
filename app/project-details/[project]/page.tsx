"use client";

import { useParams } from "next/navigation";

export default function ClientProjectDetails() {
  const params = useParams();
  const project = params.project 

  return <p>Project details: {project}</p>;
}
