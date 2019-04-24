import React from "react"
import ReactDOM from "react-dom"
import { Switch } from "react-router-dom"
import { Route } from "react-router-dom"
import { createBrowserHistory } from "history"
import { Router } from "react-router"
import Welcome from "./Welcome"
import Layout from "./Layout"
import ListConsumers from "./ListConsumers"
import "Components/Pagination/pagination.scss"

const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route
            exact
            path="/"
            component={ListConsumers}
          />
          <Route
            exact
            path="/consumers"
            component={ListConsumers}
          />
        </Switch>
      </Layout>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))