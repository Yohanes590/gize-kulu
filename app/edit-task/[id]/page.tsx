"use client"
import { useParams } from "next/navigation"
export default function EditTaskInfo() {
      const params = useParams()
      const fetchPrams = params.id as string
      return <>
        editing task {fetchPrams}
      </>
}