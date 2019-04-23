import { POST } from "Utils/fetch";

export function fetchConsumers(req) {
  return POST({
    api: "/Api/consumer/list",
    apiBase: "customer",
    data: req
  }).then(json => json);
}
