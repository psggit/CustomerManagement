import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import { fetchSentGifts, cancelGiftCard } from "../Api"
import Button from "Components/Button"
import { mountModal, unmountModal } from "Components/ModalBox/api"
import ConfirmModal from "Components/ModalBox/ConfirmModal"

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
  },
  {
    name: null,
    mapping: null,
    fn: item =>
      item.is_card_redeemed || item.is_card_cancelled
        ? getCardStatus(item)
        : (
          <Button
            appearance="secondary"
            onClick={() => {
              mountModal(ConfirmModal({
                title: "Cancel Gift Card",
                message: "Are you sure you want to cancel this gift card?",
                handleConfirm: () => { handleCancelGiftCard(item.gift_card_number, item.receiver_consumer_id) }
              }))
            }}
            size="small">
            Cancel
      </Button>
        )
  }
]

function getCardStatus(item) {
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


function handleCancelGiftCard(card_number, consumer_id) {
  const cancelGiftCardReq = {
    card_number,
    consumer_id
  }
  cancelGiftCard(cancelGiftCardReq)
    .then(json => {
      alert(json.message)
      unmountModal()
    })
    .catch(err => {
      err.response.json().then(json => {
        alert(json.message)
        unmountModal()
      })
    })
}

export default function SentGifts(props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const limit = 20
  const consumer_phone = location.pathname.split("/").pop()
  const [sentGifts, setSentGifts] = useState([])
  const [sentGiftsCount, setSentGiftsCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(pageNo)
  const [activeOffset, setActiveOffset] = useState(getOffsetUsingPageNo(pageNo, limit))

  const handlePageUrl = (pageNo) => {
    const queryObj = {
      page: pageNo
    }
    props.history.push(`/admin/consumers/sent-gifts/${consumer_phone}${getQueryUri(queryObj)}`)
  }

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
          handlePageUrl(active)
          setActiveOffset(getOffsetUsingPageNo(active, limit))
          setActivePage(active)
        }}
      />
    </div>
  )
}