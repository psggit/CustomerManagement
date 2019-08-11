import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import { fetchConsumerGiftSOA } from "../Api"

const tableColumns = [
  {
    name: "Created At",
    mapping: "DateAtServer",
    fn: created_at => created_at.slice(0, 10)
  },
  {
    name: "Transaction Type",
    mapping: "TransactionType"
  },
  {
    name: "Debit",
    mapping: "Amount"
  },
  {
    name: "Credit",
    mapping: "Balance"
  },
  {
    name: "Card number",
    mapping: "CardNumber"
  },
  {
    name: "Closing Balance",
    mapping: "CardAmount"
  },
  {
    name: "Status",
    mapping: "ResponseMessage"
  }
]

export default function ConsumerGiftSOA() {
  const limit = 20
  const consumer_phone = location.pathname.split("/").pop()
  const [consumersSOAs, setConsumerSOAs] = useState([])
  const [isLoaded, setLoadingState] = useState(false)

  useEffect(() => {
    const fetchConsumerGiftSOAReq = {
      consumer_phone
    }
    fetchConsumerGiftSOA(fetchConsumerGiftSOAReq)
      .then(fetchConsumerGiftSOARes => {
        setConsumerSOAs(fetchConsumerGiftSOARes)
        setLoadingState(true)
      })
      .catch(err => {
        console.log(err)
        setLoadingState(true)
      })
  }, [])
  return (
    <div>
      <PageHeading>Consumer Gift Credit ({consumer_phone})</PageHeading>
      <Table
        data={consumersSOAs}
        columns={tableColumns}
        isLoaded={isLoaded}
      />
    </div>
  )
}