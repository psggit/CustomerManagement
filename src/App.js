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
import GiftTransactions from "./GiftTransactions"
import ConsumerGiftSOA from "./ConsumerGiftSOA"
import SentGifts from "./GiftHistory/SentGifts"
import ReceivedGifts from "./GiftHistory/ReceivedGifts"
import Login from "./Login"
import { authTokenInfo } from "./Api"
import { createSession } from "./utils/session"
import GiftCardValidityExtension from "./GiftCardValidityExtension"

const history = createBrowserHistory()

function App() {
  const [appKey, setAppKey] = useState(0)
  let x = appKey
  useEffect(() => {
    history.listen(location => {
      setAppKey(++x)
    })
  }, [])

  useEffect(() => {
    authTokenInfo()
      .then(json => {
        if (history.location.pathname.includes("login")) {
          createSession(json)
          location.href = "/admin"
        }
      })
      .catch(err => {
        if (!history.location.pathname.includes("login")) {
          err.response.json().then(json => {
            alert(json.message)
          })
          location.href = "/admin/login"
        }
      })
  }, [])

  return (
    <Router key={appKey} history={history}>
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
            path="/admin/update-giftcard-expiry"
            render={props => <GiftCardValidityExtension {...props} />}
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
            path="/admin/consumers/gift-payments/:consumer_id"
            render={props => <GiftTransactions {...props} />}
          />
          <Route
            exact
            path="/admin/consumers/notes/:consumer_id"
            render={props => <ConsumerNotes {...props} />}
          />
          <Route
            exact
            path="/admin/consumers/gift-soa/:consumer_phone"
            render={props => <ConsumerGiftSOA {...props} />}
          />
          <Route
            exact
            path="/admin/consumers/sent-gifts/:consumer_phone"
            render={props => <SentGifts {...props} />}
          />
          <Route
            exact
            path="/admin/consumers/received-gifts/:consumer_phone"
            render={props => <ReceivedGifts {...props} />}
          />
        </Layout>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))