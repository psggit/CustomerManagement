import React from "react"
import SideNav from "Components/sidemenu"
import Header from "Components/header"

function Layout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <div style={{
        height: "calc(100vh - 82px)",
        position: "fixed",
        left: 0,
        top: "82px",
      }}>
        <SideNav />
      </div>
      <div style={{ margin: "78px 0 0 240px", padding: "40px" }}>
        {children}
      </div>
    </React.Fragment>
  )
}

export default Layout