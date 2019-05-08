import React from "react"
import "./table.scss"

export function tableActionsMenu(actionItems) {
  return (
    <div className="table--action-menu">
      <ul>
        {actionItems}
      </ul>
    </div>
  )
}