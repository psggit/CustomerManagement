import React from "react"
import "./button.scss"

export default function Button({ onClick, disabled, children }) {
  return (
    <button disabled={disabled} onClick={onClick} className="btn">{children}</button>
  )
}