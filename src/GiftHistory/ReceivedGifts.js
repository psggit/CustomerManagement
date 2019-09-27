import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import { fetchReceivedGifts } from "../Api"
import Button from "Components/Button"
import Moment from "moment"

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
    name: "Received on",
    mapping: "gift_received_on",
    fn: gift_received_on => Moment(gift_received_on).format("DD-MM-YYYY h:mm:ss A")
  },
  {
    name: "Redeemed on",
    mapping: "gift_redeemed_on",
    fn: gift_redeemed_on => gift_redeemed_on ? Moment(gift_redeemed_on).format("DD-MM-YYYY h:mm:ss A") : ""
  },
  {
    name: "Is redeemed",
    mapping: "is_card_redeemed",
    fn: is_card_redeemed => is_card_redeemed ? "Yes" : "No"
  },
  {
    name: null,
    mapping: null,
    fn: item =>
      item.receiver_consumer_id
        ? (
          (item.is_card_redeemed || item.is_card_cancelled || item.is_convert_to_credit || item.gift_type !== "sku")
            ? getCardStatus(item)
            : <Button
              appearance="secondary"
              size="small"
            >
              Convert
              </Button>
        )
        : ''
  }
]

function getCardStatus (item) {
  if (item.is_card_redeemed) {
    return "REDEEMED"
  } else if (item.is_card_cancelled) {
    return "CANCELLED"
  } else if (item.is_convert_to_credit) {
    return "CONVERTED CREDITS"
  } else {
    return "MONEY CARD"
  }
}

export default function ReceivedGifts (props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const limit = 20
  const consumer_phone = location.pathname.split("/").pop()
  const [receivedGifts, setReceivedGifts] = useState([])
  const [receivedGiftsCount, setReceivedGiftsCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(pageNo)
  const [activeOffset, setActiveOffset] = useState(getOffsetUsingPageNo(pageNo, limit))

  const handlePageUrl = (pageNo) => {
    const queryObj = {
      page: pageNo
    }
    props.history.push(`/admin/consumers/received-gifts/${consumer_phone}${getQueryUri(queryObj)}`)
  }

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
          handlePageUrl(active)
          setActiveOffset(getOffsetUsingPageNo(active, limit))
          setActivePage(active)
        }}
      />
    </div>
  )
}