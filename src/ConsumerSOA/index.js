import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import { fetchConsumerSOA } from "../Api"
import Moment from "moment"

const tableColumns = [
  {
    name: "Created At",
    mapping: "created_at",
    fn: created_at => Moment((created_at)).format("DD-MM-YYYY h:mm:ss a")
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

export default function ConsumerSOA (props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const limit = 20
  const consumer_id = parseInt(location.pathname.split("/").pop())
  const [consumersSOAs, setConsumerSOAs] = useState([])
  const [consumersSOAsCount, setConsumerSOAsCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(pageNo)
  const [activeOffset, setActiveOffset] = useState(getOffsetUsingPageNo(pageNo, limit))

  const handlePageUrl = (pageNo) => {
    const queryObj = {
      page: pageNo
    }
    props.history.push(`/admin/consumers/soa/${consumer_id}${getQueryUri(queryObj)}`)
  }

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
      <Table
        data={consumersSOAs}
        columns={tableColumns}
        isLoaded={isLoaded}
      />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={consumersSOAsCount}
        pageRangeDisplayed={5}
        onChange={(active) => {
          handlePageUrl(active)
          setActiveOffset(getOffsetUsingPageNo(active, limit))
          setActivePage(active)
        }}
      />
    </div>
  )
}