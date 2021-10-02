import React, { useState, useEffect } from "react"
import links from "../../links.json"
import axios from "axios"

const EmployeeMain = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)
  const [availableLeave, setAL] = useState()
  const [daysLeft, setDL] = useState()
  useEffect(() => {
    axios
      .get("/api/employee/availableLeave", {
        params: { id: sessionStorage.getItem("ID") },
      })
      .then((result) => {
        setAL(result.data.leaves)
      })
    var today = new Date()
    var end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    setDL(end.getDate() - today.getDate())
  }, [])

  return (
    <>
      <div className="contnainer">
        <div className="h1 p-4">Employee Dashboard</div>
        <div className="row">
          <Boxcontainer
            text="Total Leave(s) Pending"
            value={availableLeave}
            type="member"
            classValues="p-4 col-lg-6 col-md-6 col-sm-6 col-12"
          />
          <Boxcontainer
            text="Days Left until next salary"
            value={daysLeft}
            type="member"
            classValues="p-4 col-lg-6 col-md-6 col-sm-6 col-12"
          />
        </div>
      </div>
    </>
  )
}

const Boxcontainer = ({ text, value, type, classValues }) => {
  return (
    <>
      <div className={classValues}>
        <div class="card card-statistic-1">
          <div className="card-wrap">
            <div className="card-header bg-info">
              <div className="p-1">{text}</div>
            </div>
            <div class="card-body">{value}</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default EmployeeMain
