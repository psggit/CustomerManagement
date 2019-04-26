import React from "react"
import { ModalBox, ModalHeader, ModalBody, ModalFooter } from "./index"
import Button from "Components/Button"
import { unmountModal } from "Components/ModalBox/api"
import "./TitleAndSave.scss"

export default function TitleAndSave({ title, children, handleSave }) {
  return (
    <ModalBox>
      <ModalHeader><h3>{title}</h3></ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button onClick={unmountModal}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </ModalFooter>
    </ModalBox>
  )
}