import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo } from "Utils/helpers"
import { fetchConsumerNotes } from "../Api"
import { mountModal } from "Components/ModalBox/api"
import CreateNoteModal from "./CreateNoteModal"

const tableColumns = [
  {
    name: "Issue Code",
    mapping: "issue_code"
  },
  {
    name: "Description",
    mapping: "description"
  },
  {
    name: "Created At",
    mapping: "created_at",
    fn: created_at => created_at.slice(0, 10)
  },
  {
    name: "Created By",
    mapping: "created_by"
  }
]

export default function ConsumerNotes() {
  const consumer_id = parseInt(location.pathname.split("/").pop())
  const limit = 50
  const [consumersNotes, setConsumerNotes] = useState([])
  const [consumersNotesCount, setConsumerNotesCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [activeOffset, setActiveOffset] = useState(0)

  const fetchConsumerNotesReq = {
    consumer_id,
    limit,
    offset: activeOffset
  }
  useEffect(() => {
    fetchConsumerNotes(fetchConsumerNotesReq)
      .then(fetchConsumerNotesRes => {
        setConsumerNotes(fetchConsumerNotesRes.notes)
        setConsumerNotesCount(fetchConsumerNotesRes.count)
        setLoadingState(true)
      })
  }, [activeOffset])

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PageHeading>Consumer Notes ({consumer_id})</PageHeading>
        <button
          onClick={() => {
            mountModal(CreateNoteModal({
              consumer_id
            }))
          }}
        >
          Create New
        </button>
      </div>
      {
        isLoaded === true &&
        <div>
          <Table
            data={consumersNotes}
            columns={tableColumns}
          />
          <Pagination
            activePage={activePage}
            itemsCountPerPage={limit}
            totalItemsCount={consumersNotesCount}
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