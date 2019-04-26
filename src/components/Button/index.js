import React from "react"
import "./button.scss"

export default function Button({ onClick, disabled, children, width }) {
  return (
    <button style={{ width }} disabled={disabled} onClick={onClick} className="btn">{children}</button>
  )
}