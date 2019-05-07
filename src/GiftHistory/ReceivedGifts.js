import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo } from "Utils/helpers"
import { fetchReceivedGifts } from "../Api"

const tableColumns = [
  {
    name: "Sender name",
    mapping: "sender_name"
  },
  {
    name: "Gift card no.",
    mapping: "gift_card_number"
  },
  {
    name: "Gift card amount",
    mapping: "gift_card_amount"
  },
  {
    name: "Brand name",
    mapping: "brand_name"
  },
  {
    name: "Expiry date",
    mapping: "expiry_at",
    fn: expiry_at => expiry_at.slice(0, 10)
  },
  {
    name: "Receiver name",
    mapping: "receiver_name"
  },
  {
    name: "Receiver mobile",
    mapping: "receiver_mobile"
  },
  {
    name: "Is redeemed",
    mapping: "is_card_redeemed",
    fn: is_card_redeemed => is_card_redeemed ? "Yes" : "No"
  }
]

export default function ReceivedGifts() {
  const limit = 20
  const consumer_phone = location.pathname.split("/").pop()
  const [receivedGifts, setReceivedGifts] = useState([])
  const [receivedGiftsCount, setReceivedGiftsCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [activeOffset, setActiveOffset] = useState(0)


  useEffect(() => {
    const fetchReceivedGiftsReq = {
      receiver_mobile: consumer_phone,
      unused_giftcard: false,
      limit,
      offset: activeOffset,
      filter: null
    }
    fetchReceivedGifts(fetchReceivedGiftsReq)
      .then(fetchReceivedGiftsRes => {
        setReceivedGiftsCount(fetchReceivedGiftsRes.count)
        setReceivedGifts(fetchReceivedGiftsRes.gift_received)
        setLoadingState(true)
      })
      .catch(err => {
        console.log(err)
        setLoadingState(true)
      })
  }, [activeOffset])
  return (
    <div>
      <PageHeading>Gift received history ({consumer_phone})</PageHeading>
      <Table
        data={receivedGifts}
        columns={tableColumns}
        isLoaded={isLoaded}
      />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={receivedGiftsCount}
        pageRangeDisplayed={5}
        onChange={(active) => {
          setActiveOffset(getOffsetUsingPageNo(active, limit))
          setActivePage(active)
        }}
      />
    </div>
  )
}