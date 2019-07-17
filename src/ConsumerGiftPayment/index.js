import React, { useState, useEffect } from "react"
import { consumerGiftPayments } from "./../mock-data"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import Moment from "moment"
import Button from "Components/Button"
import { fetchConsumerGiftPayments, retrySendingGift } from "./../Api"

export default function ConsumerGiftPayment(props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const limit = 20
  const consumer_id = parseInt(location.pathname.split("/").pop())
  const [consumerGiftPayment, setConsumerGiftPayment] = useState([])
  const [consumerGiftPaymentCount, setConsumerGiftPaymentCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [retrySendingGift, setRetrySendingGift] = useState(false)
  const [activePage, setActivePage] = useState(pageNo)
  const [activeOffset, setActiveOffset] = useState(getOffsetUsingPageNo(pageNo, limit))

  const tableColumns = [
    {
      name: "Transaction ID",
      mapping: "txn_id"
    },
    {
      name: "Amount",
      mapping: "amount"
    },
    {
      name: "Gift Status",
      mapping: "gift_status",
      fn: gift_status => gift_status ? "True" : "False"
    },
    {
      name: "Payment Status",
      mapping: "payment_status",
      fn: payment_status => payment_status ? "True" : "False"
    },
    {
      name: "Created At",
      mapping: "created_at",
      fn: created_at => Moment((created_at)).format("DD-MM-YYYY h:mm:ss a")
    },
    {
      name: null,
      mapping: null,
      actionMenu: true,
      fn: (item) => item.retry_status
        ? <Button
          onClick={(e) => retrySendingConsumerGift(e, item)}
          appearance="primary"
        >
          Retry
          </Button>
        : ""
    }
  ]

  function retrySendingConsumerGift(e, item) {
    const payload = {
      txn_id: item.txn_id,
      consumer_id: consumer_id
    }
    setRetrySendingGift(true)
    retrySendingGift(payload)
      .then(response => {
        setRetrySendingGift(false)
        location.reload()
      })
      .catch(err => {
        console.log(err)
        setRetrySendingGift(false)
      })
  }

  /** change url based on pagination  */
  const handlePageUrl = (pageNo) => {
    const queryObj = {}

    if (pageNo) {
      queryObj.page = pageNo
    }
    props.history.push(`/admin/consumers/gift-payments/${consumer_id}${getQueryUri(queryObj)}`)
  }

  const fetchConsumerGiftPaymentReq = {
    limit: limit,
    offset: activeOffset
  }

  /** Api call for fetching consumer gift payment  */
  useEffect(() => {
    setLoadingState(true)
    fetchConsumerGiftPayments(fetchConsumerGiftPaymentReq)
      .then(fetchConsumerGiftPaymentsRes => {
        setConsumerGiftPaymentCount(fetchConsumerGiftPaymentsRes.count)
        setConsumerGiftPayment(fetchConsumerGiftPaymentsRes.consumer)
        setLoadingState(false)
      })
      .catch(err => {
        console.log(err)
        setLoadingState(false)
      })
  }, [activeOffset])

  return (
    <div >
      <PageHeading>Consumer Gift Payments ({consumer_id})</PageHeading>
      <div style={{ marginTop: "20px" }}>
        <Table
          data={consumerGiftPayments.data}
          columns={tableColumns}
          isLoaded={true}
        />
      </div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={consumerGiftPayments.count}
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