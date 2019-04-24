import React from "react"
import { useEffect, useState } from "react"
import { fetchConsumers } from "../Api"
import Table from "Components/Table"
import PageHeading from "Components/PageHeading"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo } from "../utils/helpers";

const tableColumns = [
  {
    name: "ID",
    mapping: "consumer_id",
    fn: id => <a href={`/consumers/${id}`}>{id}</a>
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
    fn: item => <a href={`/consumers/soa/${item.consumer_id}`}>SOA</a>
  },
  {
    name: null,
    mapping: null,
    fn: item => <a href={`/consumers/notes/${item.consumer_id}`}>Notes</a>
  }
]


export default function ListConsumers() {
  const limit = 10
  const [consumers, setConsumers] = useState([])
  const [consumersCount, setConsumersCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [activeOffset, setActiveOffset] = useState(0)

  const fetchConsumersReq = {
    limit: limit,
    offset: activeOffset
  }
  useEffect(() => {
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
  }, [activeOffset])

  return (
    <div>
      <PageHeading>All Consumers ({consumersCount})</PageHeading>
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
    </div>
  )
}