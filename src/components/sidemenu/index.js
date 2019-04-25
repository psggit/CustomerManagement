import React from "react"
import "./sidenav.scss"

const items = [
  { label: "List Consumer", href: "/consumers" },
  // { label: "Upload KYC", href: "/consumer/update" },
  // { label: "Consumer Detail", href: "/consumer/detail" },
  // { label: "Consuemr SOA", href:"/consumer/soa" },
  // { label: "Consumer Issues", href: "/consumer/issues" },
  // { label: "Consumer Notes", href: "/consumer/notes" },
  // { label: "Create Note", href: "/consumer/notes/create" }
]

function SideMenu() {
  return (
    <div className="sidenav">
      {
        items.map((item, i) => (
          <a className="sidenav--item" key={i} href={item.href}>{item.label}</a>
        ))
      }
    </div>
  )
}

export default SideMenu