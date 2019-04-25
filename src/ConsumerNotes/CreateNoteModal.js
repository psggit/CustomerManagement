import React, { useState, useEffect } from "react"
import TitleAndSave from "Components/ModalBox/TitleAndSave"
import "./CreateNoteModal.scss"
import { fetchNoteIssues, createConsumerNote } from "../Api";
import { unmountModal } from "Components/ModalBox/api"

export default function CreateNoteModal({ consumer_id }) {
  return class CreateNoteModal extends React.Component {
    constructor() {
      super()
      const consumer_id = parseInt(location.pathname.split("/").pop())
      this.state = {
        consumer_id,
        issueId: null,
        noteDescription: "",
        noteIssues: []
      }
      this.handleSave = this.handleSave.bind(this)
      this.setNoteIssues = this.setNoteIssues.bind(this)
      this.setIssueId = this.setIssueId.bind(this)
    }
    handleSave() {
      const { consumer_id, issueId, noteDescription } = this.state
      const createConsumerNoteReq = {
        consumer_id,
        issue_id: parseInt(issueId),
        description: noteDescription
      }
      if (noteDescription.length) {
        createConsumerNote(createConsumerNoteReq)
          .then(json => {
            unmountModal()
            alert(json.message)
          })
          .catch(err => {
            console.log(err)
            unmountModal()
          })
      }
    }
    setNoteIssues(noteIssues) {
      this.setState({ noteIssues })
    }
    setIssueId(issueId) {
      this.setState({ issueId })
    }
    setNoteDescription(noteDescription) {
      this.setState({ noteDescription })
    }
    componentDidMount() {
      fetchNoteIssues()
        .then(fetchNoteIssuesRes => {
          this.setNoteIssues(fetchNoteIssuesRes.issue)
          this.setIssueId(fetchNoteIssuesRes.issue[0].id)
        })
    }
    render() {
      return (
        <TitleAndSave title="Create Note" handleSave={this.handleSave}>
          <select onChange={(e) => { this.setIssueId(e.target.value) }}>
            {
              this.state.noteIssues.map((item, i) => (
                <option key={item.id} value={item.id}>{item.code}</option>
              ))
            }
          </select>
          <textarea onChange={(e) => { this.setNoteDescription(e.target.value) }}></textarea>
        </TitleAndSave>
      )
    }
  }
}