import React from "react"
import "./sidenav.scss"

const items = [
  { label: "List Consumer", href: "/admin/consumers" },
  // { label: "Upload KYC", href: "/consumer/update" },
  // { label: "Consumer Detail", href: "/consumer/detail" },
  // { label: "Consuemr SOA", href:"/consumer/soa" },
  // { label: "Consumer Issues", href: "/consumer/issues" },
  // { label: "Consumer Notes", href: "/consumer/notes" },
  // { label: "Create Note", href: "/consumer/notes/create" }
]

function SideMenu() {
  const active = location.pathname
  return (
    <div className="sidenav">
      {
        items.map((item, i) => (
          <a className={`sidenav--item ${active === item.href ? "active" : ""}`} key={i} href={item.href}>{item.label}</a>
        ))
      }
    </div>
  )
}

export default SideMenu