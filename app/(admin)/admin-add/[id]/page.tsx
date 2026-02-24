"use client"

import React, { useEffect, useState } from 'react'

export default function page({ params, }: { params: Promise<{ id: string }> }) {


  const [id, setId] = useState("")
  useEffect(() => {
    (
      async () => {
        const { id } = await params
        setId(id)
      }
    )()
  });

  return (
    <div>page</div>
  )
}
