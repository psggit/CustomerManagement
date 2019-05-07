import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo } from "Utils/helpers"
import { fetchSentGifts } from "../Api"

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

export default function SentGifts() {
  const limit = 20
  const consumer_phone = location.pathname.split("/").pop()
  const [sentGifts, setSentGifts] = useState([])
  const [sentGiftsCount, setSentGiftsCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [activeOffset, setActiveOffset] = useState(0)


  useEffect(() => {
    const fetchSentGiftsReq = {
      mobile_number: consumer_phone,
      limit,
      offset: activeOffset,
      filter: null
    }
    fetchSentGifts(fetchSentGiftsReq)
      .then(fetchSentGiftsRes => {
        setSentGiftsCount(fetchSentGiftsRes.count)
        setSentGifts(fetchSentGiftsRes.gift_sent)
        setLoadingState(true)
      })
      .catch(err => {
        console.log(err)
        setLoadingState(true)
      })
  }, [activeOffset])
  return (
    <div>
      <PageHeading>Gift sent history ({consumer_phone})</PageHeading>
      <Table
        data={sentGifts}
        columns={tableColumns}
        isLoaded={isLoaded}
      />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={sentGiftsCount}
        pageRangeDisplayed={5}
        onChange={(active) => {
          setActiveOffset(getOffsetUsingPageNo(active))
          setActivePage(active)
        }}
      />
    </div>
  )
}