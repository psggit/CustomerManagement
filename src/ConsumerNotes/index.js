import React, { useState, useEffect } from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import Pagination from "react-js-pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import { fetchConsumerNotes } from "../Api"
import { mountModal } from "Components/ModalBox/api"
import CreateNoteModal from "./CreateNoteModal"
import Button from "Components/Button"

const tableColumns = [
  {
    name: "Created At",
    mapping: "created_at",
    fn: created_at => created_at.slice(0, 10)
  },
  {
    name: "Issue Code",
    mapping: "issue_code"
  },
  {
    name: "Description",
    mapping: "description"
  },
  {
    name: "Created By",
    mapping: "created_by"
  }
]

export default function ConsumerNotes(props) {
  const pageNo = parseInt(getQueryParamByName("page")) || 1
  const consumer_id = parseInt(location.pathname.split("/").pop())
  const limit = 50
  const [consumersNotes, setConsumerNotes] = useState([])
  const [consumersNotesCount, setConsumerNotesCount] = useState(0)
  const [isLoaded, setLoadingState] = useState(false)
  const [activePage, setActivePage] = useState(pageNo)
  const [activeOffset, setActiveOffset] = useState(getOffsetUsingPageNo(pageNo, limit))

  const fetchConsumerNotesReq = {
    consumer_id,
    limit,
    offset: activeOffset
  }

  const handlePageUrl = (pageNo) => {
    const queryObj = {
      page: pageNo
    }
    props.history.push(`/admin/consumers/notes/${consumer_id}${getQueryUri(queryObj)}`)
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
        <Button
          onClick={() => {
            mountModal(CreateNoteModal({
              consumer_id
            }))
          }}
        >
          Create New
        </Button>
      </div>
      <Table
        data={consumersNotes}
        columns={tableColumns}
        isLoaded={isLoaded}
      />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={limit}
        totalItemsCount={consumersNotesCount}
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