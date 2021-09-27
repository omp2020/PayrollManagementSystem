import React from "react"
import { Link } from "react-router-dom"
import "../../css/sidebar.css"

const Sidebar = ({ isAdmin }) => {
  return (
    <>
      <nav
        className="col-md-2 d-none d-md-block bg-light sidebar collapse"
        id="sidebar"
      >
        <div className="sidebar-sticky">
          {/* <img src={Logo} alt="Logo" style={{ width: "50px" }} /> */}
          {isAdmin == "true" ? (
            <ul className="nav flex-column">
              <li className="nav nav-item">
                <Link to="/admin/createUser">
                  <SidebarComponent text="Add Employee" />
                </Link>
              </li>
              <li className="nav nav-item">
                <Link to="/admin/addDept">
                  <SidebarComponent text="Add Department" />
                </Link>
              </li>
              <li className="nav nav-item">
                <Link to="/admin/members">
                  <SidebarComponent text="Members" />
                </Link>
              </li>
              <li className="nav nav-item">
                <Link to="/admin/accounts">
                  <SidebarComponent text="Accounts" />
                </Link>
              </li>
              <li className="nav nav-item">
                <Link to="/admin/services">
                  <SidebarComponent text="Services" />
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav flex-column">
              <li className="nav nav-item">
                <Link to="/employee/Route">
                  <SidebarComponent text="Services" />
                </Link>
              </li>
              <li className="nav nav-item">
                <Link to="/employee/applyLeave">
                  <SidebarComponent text="Apply Leave" />
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  )
}

const SidebarComponent = ({ text }) => {
  return (
    <>
      <div
        style={{
          padding: "10px",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <span>{text}</span>
      </div>
    </>
  )
}

export default Sidebar
