"use client";
export default function ClientProjectDetails({ project }: { project: string }) {
  console.log("Rendering ClientProjectDetails with project:", project);
  return <p>project details: {project}</p>;
}
