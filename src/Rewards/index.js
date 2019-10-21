import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import PropTypes from "prop-types"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import { consumerRewardsData } from "./../mock-data"
import Button from "Components/Button"
import { mountModal, unmountModal } from "Components/ModalBox/api"
import ConfirmModal from "Components/ModalBox/ConfirmModal"


const tableColumns = [
  {
    name: "Reward Id",
    mapping: "reward_id"
  },
  {
    name: "Amount",
    mapping: "reward_amount"
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
    name: "Status",
    mapping: "status"
  },
  {
    name: null,
    mapping: null,
    actionMenu: true,
    // eslint-disable-next-line react/display-name
    fn: (item) => item.status === "pending"
      ? <div>
        <Button
          // onClick={(e) => sendMoneyToWallet(e, item)}
          onClick={() => {
            mountModal(ConfirmModal({
              title: "Credit rewards",
              message: "Are you sure you want to credit the rewards to wallet?",
              handleConfirm: () => { sendMoneyToWallet(item) }
            }))
          }}
          appearance="primary"
        // disabled={rewardId === item.reward_id ? isSendMoneyTriggered : false}
        >
          Send to wallet
        </Button>
        <Button
          // onClick={(e) => sendMoneyToBankAccount(e, item)}
          onClick={() => {
            mountModal(ConfirmModal({
              title: "Credit rewards",
              message: "Are you sure you want to credit the rewards to bank account?",
              handleConfirm: () => { sendMoneyToBankAccount(item) }
            }))
          }}
          appearance="primary"
        // disabled={rewardId === item.reward_id ? isSendMoneyTriggered : false}
        >
          Send to UPI linked bank account
        </Button>
      </div>
      : ""
  }
]

function sendMoneyToWallet () {
  //console.log("item", item)
  unmountModal()
  location.reload()
}

function sendMoneyToBankAccount () {
  //console.log("item", item)
  unmountModal()
  location.reload()
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
    // const payload = {
    //   consumer_id,
    //   limit,
    //   offset: activeOffset
    // }
    // console.log("payload", payload)
    // fetchConsumerRewards(payload)
    //   .then(rewardResponse => {
    //     setConsumerRewardsCount(rewardResponse.count)
    //     setConsumerRewards(rewardResponse.data)
    //     setLoadingState(true)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     setLoadingState(true)
    //   })
    //console.log("set rewards", consumerRewardsData)
    setConsumerRewards(consumerRewardsData.data)
    setConsumerRewardsCount(consumerRewardsData.count)
    setLoadingState(true)
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
  history: PropTypes.func
}

Rewards.displayName = "Rewards"

export default Rewards
