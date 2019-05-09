import React from "react"
import { useEffect, useState } from "react"
import { fetchConsumers } from "../Api"
import Table from "Components/Table"
import { mountTableActionsMenu } from "Components/Table/utils"
import SearchInput from "Components/SearchInput"
import { Form } from "Components/Form"
import PageHeading from "Components/PageHeading"
import Pagination from "react-js-pagination"
import {
  getOffsetUsingPageNo,
  getQueryParamByName,
  getQueryUri,
  getPositionBasedOnContainer
} from "../utils/helpers"

import Icon from "Components/Icon"
import { unmountTableActionsMenu } from "../components/Table/utils";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const tableColumns = [
  {
    name: "ID",
    mapping: "consumer_id",
    fn: id => <NavLink to={`/admin/consumers/detail/${id}`}>{id}</NavLink>
  },
  {
    name: "Name",
    mapping: "name",
  },
  {
    name: "Email",
    mapping: "email"
  },
  {
    name: "Gender",
    mapping: "gender"
  },
  {
    name: "Phone no.",
    mapping: "mobile_number"
  },
  {
    name: "DOB",
    mapping: "dob",
    fn: dob => dob.slice(0, 10)
  },
  {
    name: "Credits",
    mapping: "credits"
  },
  {
    name: null,
    mapping: null,
    actionMenu: true,
    fn: (item, history) => <Icon
      onMouseOver={(e) => { renderActionsMenu(e, item, history) }}
      name="more-circle"
    />
  }
]

function renderActionsMenu(e, item, history) {
  const actionItems = [
    <NavLink to={`/admin/consumers/soa/${item.consumer_id}`}>SOA</NavLink>,
    <NavLink to={`/admin/consumers/notes/${item.consumer_id}`}>Notes</NavLink>,
    item.gift_wallet_id !== 0 ? <NavLink to={`/admin/consumers/gift-soa/${item.mobile_number}`}>Gift SOA</NavLink> : "",
    item.gift_wallet_id !== 0 ? <NavLink to={`/admin/consumers/sent-gifts/${item.mobile_number}`}>Sent gifts</NavLink> : "",
    item.gift_wallet_id !== 0 ? <NavLink to={`/admin/consumers/received-gifts/${item.mobile_number}`}>Received gifts</NavLink> : ""
  ]

  const position = getPositionBasedOnContainer(e.target)
  mountTableActionsMenu(position, actionItems, history)
}

export default function ListConsumers(props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const searchValue = getQueryParamByName("search") || ""
  const limit = 20
  const [consumers, setConsumers] = useState([])
  const [consumersCount, setConsumersCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(pageNo)
  const [activeOffset, setActiveOffset] = useState(getOffsetUsingPageNo(pageNo, limit))
  const [enableFixedComponent, toggleFixedComponent] = useState(false)

  /** 
   * filterValue will change for onChange event, but
   * finalFilterValue will be used for applying filter 
   * */
  const [filterValue, setFilterValue] = useState(searchValue)
  const [finalFilterValue, setFinalFilterValue] = useState(searchValue)

  const reset = () => {
    props.history.push("/admin/consumers")
  }

  useEffect(() => {
    document.addEventListener("click", unmountTableActionsMenu)
    return function cleanup() {
      document.removeEventListener("click", unmountTableActionsMenu)
    }
  }, [])

  /** Filter will be applied only on submit  */
  const handleFilterSubmit = e => {
    e.preventDefault()
    setFinalFilterValue(filterValue)
    /** reset pagination if filter is applied */
    setActiveOffset(0)
    setActivePage(1)
    props.history.push(`/admin/consumers?search=${filterValue}&page=${1}`)
  }

  /** change url based on pagination/search  */
  const handlePageUrl = (searchValue, pageNo) => {
    const queryObj = {}
    if (searchValue.length) {
      queryObj.search = searchValue
    }
    if (pageNo) {
      queryObj.page = pageNo
    }
    props.history.push(`/admin/consumers${getQueryUri(queryObj)}`)
  }

  const fetchConsumersReq = {
    limit: limit,
    offset: activeOffset
  }

  if (filterValue.length === 0 && finalFilterValue.length) {
    reset()
  }

  /** attach filter in fetchCosumerReq object if is there */
  if (finalFilterValue.length > 0) {
    /** Check whether the filter text is phone no. or email */
    const isPhoneNo = isNaN(filterValue) === false
    fetchConsumersReq.filter = {
      filterBy: isPhoneNo ? "Mobile" : "Email",
      value: filterValue
    }
  }

  /** Api call for fetching consumers  */
  useEffect(() => {
    setLoadingState(false)
    fetchConsumers(fetchConsumersReq)
      .then(fetchConsumersRes => {
        setConsumersCount(fetchConsumersRes.count)
        setConsumers(fetchConsumersRes.consumer)
        setLoadingState(true)
      })
      .catch(err => {
        console.log(err)
        setLoadingState(true)
      })
  }, [activeOffset, finalFilterValue])

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <PageHeading>Consumers List ({consumersCount})</PageHeading>
        <div style={{ paddingBottom: "20px", marginLeft: "20px" }}>
          <Form onSubmit={handleFilterSubmit}>
            <SearchInput
              reset={reset}
              setFilterValue={setFilterValue}
              filterValue={filterValue}
              placeholder="Search by email or phone.."
            />
          </Form>
        </div>
      </div>
      <Table
        history={props.history}
        data={consumers}
        columns={tableColumns}
        isLoaded={isLoaded}
      />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={consumersCount}
        pageRangeDisplayed={5}
        onChange={(active) => {
          handlePageUrl(searchValue, active)
          setActiveOffset(getOffsetUsingPageNo(active, limit))
          setActivePage(active)
        }}
      />
    </div>
  )
}