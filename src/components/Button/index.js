import React from "react"
import "./button.scss"

function getClassName(size) {
  if (size === "small") {
    return "btn--sm"
  }
}

export default function Button({ onClick, disabled, children, width, size }) {
  return (
    <button
      style={{ width }}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${getClassName(size)}`}>
      {children}
    </button>
  )
}