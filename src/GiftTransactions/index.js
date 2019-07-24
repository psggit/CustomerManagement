import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import Moment from "moment"
import Button from "Components/Button"
import { fetchGiftTransactions, retrySendGift } from "../Api"

export default function ConsumerGiftPayment(props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const limit = 20
  const consumer_id = parseInt(location.pathname.split("/").pop())
  const [txnid, setTxnId] = useState()
  const [giftTransactions, setGiftTransactions] = useState([])
  const [giftTransactionCount, setGiftTransactionCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [retrySendingGift, setRetrySendingGift] = useState(false)
  const [activePage, setActivePage] = useState(pageNo)
  const [activeOffset, setActiveOffset] = useState(getOffsetUsingPageNo(pageNo, limit))

  const tableColumns = [
    {
      name: "Transaction ID",
      mapping: "transaction_id"
    },
    {
      name: "Amount",
      mapping: "amount"
    },
    {
      name: "Gift Status",
      mapping: "gift_status"
    },
    {
      name: "Gift Type",
      mapping: "gift_type"
    },
    {
      name: "Payment Status",
      mapping: "payment_status"
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
      fn: (item) => item.retry
        ? <Button
          onClick={(e) => retrySendingConsumerGift(e, item)}
          appearance="primary"
          disabled={txnid === item.transaction_id && retrySendGift ? retrySendingGift : false}
        >
          Retry
          </Button>
        : ""
    }
  ]

  const retrySendingConsumerGift = (e, item) => {
    setTxnId(item.transaction_id)
    const payload = {
      txn_id: item.transaction_id
    }
    setRetrySendingGift(true)
    retrySendGift(payload)
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

  const fetchGiftTranactionsReq = {
    limit: limit,
    offset: activeOffset,
    consumer_id: consumer_id
  }

  /** Api call for fetching consumer gift payment  */
  useEffect(() => {
    setLoadingState(false)
    fetchGiftTransactions(fetchGiftTranactionsReq)
      .then(fetchGiftTransactionsRes => {
        setGiftTransactionCount(fetchGiftTransactionsRes.count)
        setGiftTransactions(fetchGiftTransactionsRes.gift_txns)
        setLoadingState(true)
      })
      .catch(err => {
        console.log(err)
        setLoadingState(true)
      })
  }, [activeOffset])

  return (
    <div >
      <PageHeading>Gift Transactions ({consumer_id})</PageHeading>
      <div style={{ marginTop: "20px" }}>
        <Table
          data={giftTransactions}
          columns={tableColumns}
          isLoaded={isLoaded}
        />
      </div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={giftTransactionCount}
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