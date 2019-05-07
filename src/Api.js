import { POST, GET } from "Utils/fetch";

export function authLogin(req) {
  return POST({
    api: "/login",
    apiBase: "auth",
    data: req
  })
}

export function authLogout(req) {
  return GET({
    api: "/user/logout",
    apiBase: "auth"
  })
}

export function authTokenInfo(req) {
  return GET({
    api: "/user/account/info",
    apiBase: "auth"
  })
}

export function fetchConsumers(req) {
  return POST({
    api: "/Api/consumer/list",
    apiBase: "customer",
    data: req
  })
    .then(json => json);
}

export function updateConsumer(req) {
  return POST({
    api: "/Api/consumer/update",
    apiBase: "customer",
    data: req
  })
    .then(json => json)
}

export function fetchConsumerDetail(req) {
  return GET({
    api: `/Api/consumer/details/${req.consumer_id}`,
    apiBase: "customer"
  })
    .then(json => json)
}

export function fetchConsumerSOA(req) {
  return POST({
    api: `/Api/consumer/soa/list/${req.consumer_id}`,
    apiBase: "customer",
    data: req
  })
}

export function fetchConsumerNotes(req) {
  return POST({
    api: `/Api/consumer/notes/list/${req.consumer_id}`,
    apiBase: "customer",
    data: req
  })
    .then(json => json)
}

export function createConsumerNote(req) {
  return POST({
    api: "/Api/consumer/notes/create",
    apiBase: "customer",
    data: req
  })
    .then(json => json)
}

export function fetchNoteIssues() {
  return GET({
    api: "/Api/consumer/notes/list/issues",
    apiBase: "customer"
  })
    .then(json => json)
}

export function fetchConsumerGiftSOA(req) {
  return GET({
    api: `/admin/gifting/history/${req.consumer_phone}`,
    apiBase: "orderman"
  })
    .then(json => json)
}