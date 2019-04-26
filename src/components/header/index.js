import React, { useState } from "react"
import "./header.scss"
import { authLogout } from "../../Api";
import { clearSession, getSession } from "Utils/session"

export default function Header({ history }) {
  const session = getSession()
  const hasuraID = session ? session.hasura_id : null
  const handleClick = e => {
    e.preventDefault()
    authLogout()
      .then(json => {
        clearSession()
        history.push("/admin/login")
      })
      .catch(err => { console.log(err) })
  }
  return (
    <div className="header">
      <a href="/admin"><h2>Customer Management</h2></a>
      <p onClick={handleClick} >Logout (Hasura ID: {hasuraID})</p>
    </div>
  )
}