import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const Navbar = ({ employee, empname }) => {
  const [isLogout, setLogout] = useState(false)
  const handleLogout = () => {
    setLogout(true)
    sessionStorage.clear()
  }
  return (
    <>
      <nav class="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0">
        <a
          class="navbar-brand col-sm-3 col-md-2 mr-0"
          href={employee == "Admin" ? "/admin" : "/employee"}
        >
          Payroll Management System
        </a>
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            &nbsp;&nbsp;&nbsp; Hello, {empname}
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button
              class="dropdown-item"
              type="button"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = "/changePassword"
              }}
            >
              Change Password
            </button>
            <button
              class="dropdown-item"
              type="button"
              onClick={() => {
                handleLogout()
              }}
            >
              Logout
            </button>
            {isLogout ? <Redirect to="/" /> : ""}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
