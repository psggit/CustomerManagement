import React, { useState } from "react"
import { Form, FormGroup } from "Components/Form"
import Input from "Components/Input"
import Button from "Components/Button"
import { authLogin} from "../Api"
import { createSession } from "Utils/session"
import "./login.scss"

export default function Login (props) {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setLoadingState] = useState(false)

  const handleClick = e => {
    e.preventDefault()
    const authLoginReq = {
      username: userName,
      password: password
    }

    if (userName.length > 0 && password.length > 0) {
      setLoadingState(true)
      /** Get the token and create a session */
      authLogin(authLoginReq)
        .then(json => {
          setLoadingState(false)
          createSession(json)
          props.history.push("/admin")
        })
        .catch(err => {
          err.response.json().then(json => {
            alert(json.message)
          })
          setLoadingState(false)
        })
    }
  }

  return (
    <div id="login--page">
      <div>
        <h2>Sign in to Customer Management</h2>
        <div className="login--page__form">
          <Form>
            <FormGroup>
              <label>Username</label>
              <Input disabled={isLoading} width="100%" onChange={(e) => { setUserName(e.target.value) }} />
            </FormGroup>

            <FormGroup>
              <label>Password</label>
              <Input autoComplete="new-password" disabled={isLoading} width="100%" type="password" onChange={(e) => { setPassword(e.target.value) }} />
            </FormGroup>

            <Button appearance="primary" width="100%" disabled={isLoading} onClick={handleClick}>Sign in</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}