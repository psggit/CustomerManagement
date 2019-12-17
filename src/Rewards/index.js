import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import PropTypes from "prop-types"
import { fetchConsumerRewards } from "./../Api"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import Button from "Components/Button"
import Moment from "moment"
import { mountModal, unmountModal } from "Components/ModalBox/api"
import ConfirmModal from "Components/ModalBox/ConfirmModal"
import { processReward } from "./../Api"

const tableColumns = [
  {
    name: "Reward Id",
    mapping: "id"
  },
  {
    name: "Amount",
    mapping: "amount"
  },
  {
    name: "Order Id",
    mapping: "order_id"
  },
  {
    name: "Retailer Name",
    mapping: "retailer_name"
  },
  {
    name: "Bank RRN",
    mapping: "bank_rrn"
  },
  {
    name: "Created At",
    mapping: "created_at",
    fn: processing_time => Moment(processing_time).format("DD-MM-YYYY h:mm:ss A")
  },
  {
    name: "Status",
    mapping: "status"
  },
  {
    name: null,
    mapping: null,
    actionMenu: true,
    // eslint-disable-next-line react/display-name
    fn: (item) => item.is_processing
      ? <div>
        <Button
          // onClick={(e) => sendMoneyToBankAccount(e, item)}
          onClick={() => {
            mountModal(ConfirmModal({
              title: "Credit rewards",
              message: "Are you sure you want to credit the rewards to bank account?",
              handleConfirm: () => { sendMoney("UPI", item) }
            }))
          }}
          appearance="primary"
          // disabled={rewardId === item.reward_id ? isSendMoneyTriggered : false}
        >
          Send to UPI linked bank account
        </Button>
        <Button
          // onClick={(e) => sendMoneyToWallet(e, item)}
          onClick={() => {
            mountModal(ConfirmModal({
              title: "Credit rewards",
              message: "Are you sure you want to credit the rewards to Hipbar Wallet?",
              handleConfirm: () => { sendMoney("HipbarWallet", item) }
            }))
          }}
          appearance="primary"
          // disabled={rewardId === item.reward_id ? isSendMoneyTriggered : false}
        >
          Send to Hipbar Wallet
        </Button>
        <Button
          // onClick={(e) => sendMoneyToWallet(e, item)}
          onClick={() => {
            mountModal(ConfirmModal({
              title: "Credit rewards",
              message: "Are you sure you want to credit the rewards to Gift Wallet?",
              handleConfirm: () => { sendMoney("GiftWallet", item) }
            }))
          }}
          appearance="primary"
          // disabled={rewardId === item.reward_id ? isSendMoneyTriggered : false}
        >
          Send to Gift Wallet
        </Button>
      </div>
      : ""
  }
]

function sendMoney (destination, rewardDetails) {
  const payload = {
    id: rewardDetails.id,
    destination
  }
  processReward(payload) 
    .then((response) => {
      // response.json().then(json => {
      alert(response.message)
      // }, () => { })
    })
    .then(() => {
      location.reload()
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log("Error in processing rewards", error)
      error.response.json().then(json => {
        alert(json.message)
      })
    })
  unmountModal()
}

function Rewards (props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const limit = 20
  const consumer_id = parseInt(location.pathname.split("/").pop())
  const [consumerRewards, setConsumerRewards] = useState([])
  const [consumerRewardsCount, setConsumerRewardsCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(pageNo)
  const [activeOffset, setActiveOffset] = useState(getOffsetUsingPageNo(pageNo, limit))

  const handlePageUrl = (pageNo) => {
    const queryObj = {
      page: pageNo
    }
    props.history.push(`/admin/consumers/rewards/${consumer_id}${getQueryUri(queryObj)}`)
  }

  useEffect(() => {
    const payload = {
      consumer_id,
      limit,
      offset: activeOffset
    }

    fetchConsumerRewards(payload)
      .then(rewardResponse => {
        setConsumerRewardsCount(rewardResponse.count)
        setConsumerRewards(rewardResponse.rewards)
        setLoadingState(true)
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log("Error in fetching consumer rewards", err)
        setLoadingState(true)
      })
    setLoadingState(true)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOffset])

  return (
    <div>
      <PageHeading>Rewards ({consumer_id})</PageHeading>
      <Table
        data={consumerRewards}
        columns={tableColumns}
        isLoaded={isLoaded}
      />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={consumerRewardsCount}
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

Rewards.propTypes = {
  history: PropTypes.object
}

Rewards.displayName = "Rewards"

export default Rewards
