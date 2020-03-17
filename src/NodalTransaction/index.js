/* eslint-disable react/display-name */
import React from "react"
import { useEffect, useState } from "react"
import { fetchListOrder } from "../Api"
import Table from "Components/Table"
import { mountTableActionsMenu } from "Components/Table/utils"
import PageHeading from "Components/PageHeading"
import Pagination from "react-js-pagination"
import Moment from "moment"
import {
  getOffsetUsingPageNo,
  getQueryParamByName,
  getQueryUri,
  getPositionBasedOnContainer
} from "../utils/helpers"

import Icon from "Components/Icon"
import { unmountTableActionsMenu } from "../components/Table/utils";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

export default function ListOrder (props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const limit = 5
  const consumer_id = parseInt(location.pathname.split("/").pop())
  const [listOrder, setListOrder] = useState([])
  const [listOrderCount, setListOrderCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(pageNo)
  const [activeOffset, setActiveOffset] = useState(getOffsetUsingPageNo(pageNo, limit))

  useEffect(() => {
    document.addEventListener("click", unmountTableActionsMenu)
    return function cleanup() {
      document.removeEventListener("click", unmountTableActionsMenu)
    }
  }, [])

  /** change url based on pagination/search  */
  const handlePageUrl = (pageNo) => {
    const queryObj = {}
    if (pageNo) {
      queryObj.page = pageNo
    }
    props.history.push(`/admin/consumers/orders/${consumer_id}${getQueryUri(queryObj)}`)
  }

  const fetchListOrderReq = {
    user_id: consumer_id,
    limit: limit,
    offset: activeOffset,
  }

  useEffect(() => {
    setLoadingState(false)
    fetchListOrder(fetchListOrderReq)
      .then(fetchListOrderRes => {
        setListOrderCount(fetchListOrderRes.count)
        setListOrder(fetchListOrderRes.order)
        setLoadingState(true)
      })
      .catch(err => {
        console.log(err)
        setLoadingState(true)
      })
  }, [activeOffset] )

  function handleClick (e, item) {
    e.preventDefault()
    props.history.push(`/admin/consumers/payments/${item.order_id}`, item)
  }

  function renderActionsMenu (e, item) {
    const actionItems = [
      <NavLink key="0" to="" onClick={(e) => handleClick(e, item)}>Payments</NavLink>
    ]

    const position = getPositionBasedOnContainer(e.target)
    mountTableActionsMenu(position, actionItems, props.history)
  }

  const tableColumns = [
    {
      name: "Created At",
      mapping: "order_created_at",
      fn: order_created_at => Moment((order_created_at)).format("DD-MM-YYYY h:mm:ss a")
    },
    {
      name: "Updated At",
      mapping: "order_updated_at",
      fn: order_updated_at => Moment((order_updated_at)).format("DD-MM-YYYY h:mm:ss a")
    },
    {
      name: "Order ID",
      mapping: "order_id"
    },
    {
      name: "Retailer Name",
      mapping: "retailer_name",
    },
    {
      name: "Total Order",
      mapping: "order_total"
    },
    {
      name: "Total Cashback",
      mapping: "total_cashback"
    },
    {
      name: "Gift Wallet Amount",
      mapping: "gift_wallet_amount"
    },
    {
      name: "Hipbar Wallet Amount",
      mapping: "hipbar_wallet_amount"
    },
    {
      name: "Nodal Amount",
      mapping: "nodal_amount"
    },
    {
      name: "Promo Cashback",
      mapping: "promo_cashback"
    },
    {
      name: "Promo Code",
      mapping: "promo_code"
    },
    {
      name: "Order Type",
      mapping: "order_type"
    },
    {
      name: "Order Status",
      mapping: "order_status"
    },
    {
      name: "UPI ID",
      mapping: "upi_id"
    },
    {
      name: null,
      mapping: null,
      actionMenu: true,
      fn: (item) => <Icon
        onMouseOver={(e) => { renderActionsMenu(e, item) }}
        name="more-circle"
      />
    }
  ]

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
        <PageHeading>List Order ({consumer_id})</PageHeading>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Table
          data={listOrder}
          columns={tableColumns}
          isLoaded={isLoaded}
        />
      </div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={listOrderCount}
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