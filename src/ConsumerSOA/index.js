import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import { fetchConsumerSOA } from "../Api"
import Table from "Components/Table"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo } from "Utils/helpers"

const tableColumns = [
  {
    name: "Order ID",
    mapping: "order_id"
  },
  {
    name: "Opening Balance",
    mapping: "opening_balance"
  },
  {
    name: "Closing Balance",
    mapping: "closing_balance"
  },
  {
    name: "Type",
    mapping: "type"
  },
  {
    name: "Amount",
    mapping: "amount"
  },
  {
    name: "Created At",
    mapping: "created_at",
    fn: created_at => created_at.slice(0, 10)
  }
]

export default function ConsumerSOA() {
  const limit = 10
  const consumer_id = parseInt(location.pathname.split("/").pop())
  const [consumersSOAs, setConsumerSOAs] = useState([])
  const [consumersSOAsCount, setConsumerSOAsCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [activeOffset, setActiveOffset] = useState(0)


  useEffect(() => {
    console.log(activeOffset)
    const fetchConsumerSOAReq = {
      consumer_id,
      limit,
      offset: activeOffset
    }
    fetchConsumerSOA(fetchConsumerSOAReq)
      .then(fetchConsumerSOARes => {
        setConsumerSOAsCount(fetchConsumerSOARes.count)
        setConsumerSOAs(fetchConsumerSOARes.consumer_soa)
        setLoadingState(true)
      })
      .catch(err => {
        console.log(err)
        setLoadingState(true)
      })
  }, [activeOffset])
  return (
    <div>
      <PageHeading>Consumer SOA</PageHeading>
      {
        isLoaded === true &&
        <div>
          <Table
            data={consumersSOAs}
            columns={tableColumns}
          />
          <Pagination
            activePage={activePage}
            itemsCountPerPage={limit}
            totalItemsCount={consumersSOAsCount}
            pageRangeDisplayed={5}
            onChange={(active) => {
              setActiveOffset(getOffsetUsingPageNo(active))
              setActivePage(active)
            }}
          />
        </div>
      }
    </div>
  )
}