import React from "react"
import "./form.scss"

export function FormGroup({ children, inline }) {
  return (
    <div className={`form--group ${inline ? "form--inline" : ""}`}>
      {children}
    </div>
  )
}

export function Form({ width, children }) {
  return (
    <form className="form">
      {children}
    </form>
  )
}