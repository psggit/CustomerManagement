import React from "react"
import { useEffect, useState } from "react"
import { fetchConsumers } from "../Api"
import Table from "Components/Table"
import PageHeading from "Components/PageHeading"

const tableColumns = [
  {
    name: "Name",
    mapping: "name"
  },
  {
    name: "ID",
    mapping: "consumer_id"
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
    format: dob => dob.slice(0, 10)
  },
  {
    name: "Credits",
    mapping: "credits"
  },
  {
    name: null,
    anything: <button>View</button>
  }
]

export default function ListConsumers() {
  const [consumers, setConsumers] = useState([])
  const [consumersCount, setConsumersCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)

  const fetchConsumersReq = {
    limit: 10,
    offset: 0
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
  }, 0)

  return (
    <div>
      <PageHeading>All Consumers</PageHeading>
      {
        isLoaded === true &&
        <Table
          data={consumers}
          columns={tableColumns}
        />
      }
    </div>
  )
}