import React from "react"
import { useEffect, useState, useRef } from "react"
import { fetchConsumers } from "../Api"
import Table from "Components/Table"
import Input from "Components/Input"
import { Form, FormGroup } from "Components/Form"
import Icon from "Components/Icon"
import PageHeading from "Components/PageHeading"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo } from "../utils/helpers";

const tableColumns = [
  {
    name: "ID",
    mapping: "consumer_id",
    fn: id => <a href={`/admin/consumers/${id}`}>{id}</a>
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
    fn: item => <a href={`/admin/consumers/soa/${item.consumer_id}`}>SOA</a>
  },
  {
    name: null,
    mapping: null,
    fn: item => <a href={`/admin/consumers/notes/${item.consumer_id}`}>Notes</a>
  }
]


export default function ListConsumers() {
  const limit = 20
  const [consumers, setConsumers] = useState([])
  const [consumersCount, setConsumersCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [activeOffset, setActiveOffset] = useState(0)
  const [filterValue, setFilterValue] = useState("")
  const [finalFilterValue, setFinalFilterValue] = useState("")

  const handleFilterSubmit = e => {
    e.preventDefault()
    setFinalFilterValue(filterValue)
  }

  const fetchConsumersReq = {
    limit: limit,
    offset: activeOffset
  }

  if (finalFilterValue.length > 0) {
    const isPhoneNo = isNaN(filterValue) === false
    fetchConsumersReq.filter = {
      filterBy: isPhoneNo ? "Mobile" : "Email",
      value: filterValue
    }
  }

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
            <div style={{ position: "relative" }}>
              <Input type="text" value={filterValue} onChange={(e) => { setFilterValue(e.target.value) }} placeholder="Search by email or phone.." />
              {filterValue.length ? <Icon onClick={() => { setFinalFilterValue(""); setFilterValue("") }} name="search--cross" /> : ""}
            </div>
          </Form>
        </div>
      </div>
      {
        isLoaded === true &&
        <div>
          <Table
            data={consumers}
            columns={tableColumns}
          />
          <Pagination
            activePage={activePage}
            itemsCountPerPage={limit}
            totalItemsCount={consumersCount}
            pageRangeDisplayed={5}
            onChange={(active) => {
              setActiveOffset(getOffsetUsingPageNo(active))
              setActivePage(active)
            }}
          />
        </div>
      }
      {
        isLoaded === false &&
        <h3>Loading...</h3>
      }
    </div>
  )
}