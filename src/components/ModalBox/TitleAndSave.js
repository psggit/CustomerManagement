import React from "react"
import { ModalBox, ModalHeader, ModalBody, ModalFooter } from "./index"
import { unmountModal } from "Components/ModalBox/api"
import "./TitleAndSave.scss"

export default function TitleAndSave({ title, children, handleSave }) {
  return (
    <ModalBox>
      <ModalHeader><h3>{title}</h3></ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <button onClick={unmountModal}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </ModalFooter>
    </ModalBox>
  )
}