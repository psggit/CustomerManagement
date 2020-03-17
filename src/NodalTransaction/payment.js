/* eslint-disable react/display-name */
import React from "react"
import PageHeading from "Components/PageHeading"
import Table from "Components/Table"
import Moment from "moment"

export default function Payment (props) {
  const order_id = parseInt(location.pathname.split("/").pop())
  const payments = props.history.location.state.payment.length > 0 ? props.history.location.state.payment : [] 
 
  const tableColumns = [
    {
      name: "Created At",
      mapping: "payment_created_at",
      fn: payment_created_at => payment_created_at ? Moment((payment_created_at)).format("DD-MM-YYYY h:mm:ss a") : ""
    },
    {
      name: "Updated At",
      mapping: "payment_updated_at",
      fn: payment_updated_at => payment_updated_at ? Moment((payment_updated_at)).format("DD-MM-YYYY h:mm:ss a") : ""
    },
    {
      name: "Payment Detail ID",
      mapping: "payment_detail_id"
    },
    {
      name: "Amount",
      mapping: "amount"
    },
    {
      name: "Success Message",
      mapping: "is_success"
    },
    {
      name: "Transaction ID",
      mapping: "txn_id"
    },
    {
      name: "Mode",
      mapping: "mode"
    }
  ]

  return (
    <div>
      <PageHeading>Payment ({order_id})</PageHeading>
      <div style={{ marginTop: "20px" }}>
        <Table
          data={payments}
          columns={tableColumns}
          isLoaded={true}
        />
      </div>
    </div>
  )
}