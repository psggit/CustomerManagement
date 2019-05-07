import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo } from "Utils/helpers"
import { fetchConsumerSOA } from "../Api"

const tableColumns = [
  {
    name: "Created At",
    mapping: "created_at",
    fn: created_at => created_at.slice(0, 10)
  },
  {
    name: "Type",
    mapping: "type"
  },
  {
    name: "Order ID",
    mapping: "order_id"
  },
  {
    name: "Amount",
    mapping: "amount"
  },
  {
    name: "Opening Balance",
    mapping: "opening_balance"
  },
  {
    name: "Closing Balance",
    mapping: "closing_balance"
  }
]

export default function ConsumerSOA() {
  const limit = 20
  const consumer_id = parseInt(location.pathname.split("/").pop())
  const [consumersSOAs, setConsumerSOAs] = useState([])
  const [consumersSOAsCount, setConsumerSOAsCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [activeOffset, setActiveOffset] = useState(0)


  useEffect(() => {
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
      <PageHeading>Consumer SOA ({consumer_id})</PageHeading>
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
              setActiveOffset(getOffsetUsingPageNo(active, limit))
              setActivePage(active)
            }}
          />
        </div>
      }
    </div>
  )
}