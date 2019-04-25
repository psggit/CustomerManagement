import React from "react"
import "./input.scss"

export default function Input(props) {
  return (
    <input spellCheck="false" autoComplete="false" className="react--input" {...props} />
  )
}