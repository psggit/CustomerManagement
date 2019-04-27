import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Switch } from "react-router-dom"
import { Route } from "react-router-dom"
import { createBrowserHistory } from "history"
import { Router } from "react-router"
import Layout from "./Layout"
import ListConsumers from "./ListConsumers"
import ConsumerDetail from "./ConsumerDetail"
import ConsumerSOA from "./ConsumerSOA"
import "Components/Pagination/pagination.scss"
import ConsumerNotes from "./ConsumerNotes"
import Login from "./Login"
import { authTokenInfo } from "./Api"

const history = createBrowserHistory()

function App() {
  useEffect(() => {
    authTokenInfo()
      .then(json => {
        if (history.location.pathname.includes("login"))
          location.href = "/admin"
      })
      .catch(err => {
        if (!history.location.pathname.includes("login"))
          location.href = "/admin/login"
      })
  }, [])

  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/admin/login"
          component={Login}
        />
        <Layout history={history}>
          <Route
            exact
            path="/admin"
            render={props => <ListConsumers {...props} />}
          />
          <Route
            exact
            path="/admin/consumers"
            render={props => <ListConsumers {...props} />}
          />
          <Route
            exact
            path="/admin/consumers/:pageno"
            render={props => <ListConsumers {...props} />}
          />
          <Route
            exact
            path="/admin/consumers/detail/:consumer_id"
            render={props => <ConsumerDetail {...props} />}
          />
          <Route
            exact
            path="/admin/consumers/soa/:consumer_id"
            render={props => <ConsumerSOA {...props} />}
          />
          <Route
            exact
            path="/admin/consumers/notes/:consumer_id"
            render={props => <ConsumerNotes {...props} />}
          />
        </Layout>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))