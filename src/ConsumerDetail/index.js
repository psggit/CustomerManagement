import React, { useEffect, useState } from "react"
import { fetchConsumerDetail } from "../Api";

export default function ConsumerDetail() {
  const consumer_id = parseInt(location.pathname.split("/").pop())
  useEffect(() => {
    const fetchConsumerDetailReq = {
      consumer_id
    }
    fetchConsumerDetail(fetchConsumerDetailReq)
  }, [])
  return (
    <div>
      {/* <PageHeading></PageHeading> */}
    </div>
  )
}