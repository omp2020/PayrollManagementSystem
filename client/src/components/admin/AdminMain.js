import React, { useState, useEffect } from "react"
import links from "../../links.json"
import axios from "axios"
import { Pie, Bar } from "react-chartjs-2"

const AdminMain = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)
  const [cntEmp, setcntEmp] = useState()
  const [cntDep, setcntDep] = useState()
  const data = {
    labels: ["Pending", "Approved"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19],
        backgroundColor: ["rgba(255, 0, 0, 0.5)", "rgba(0, 255, 0, 0.5)"],
        borderColor: ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)"],
        borderWidth: 1,
      },
    ],
  }
  const deptdata = {
    labels: [
      "Administration",
      "Marketing",
      "Accounts",
      "Sales",
      "Human Resource Department",
    ],
    datasets: [
      {
        label: "Expenditure (in INR)",
        data: [5000, 7000, 1000, 3000, 8000],
        backgroundColor: [
          "rgba(245,198,165,0.7)",
          "rgba(255,119,119, 0.7)",
          "rgba(162,65,107, 0.7)",
          "rgba(133,39,71,0.7)",
          "rgba(63,7,19,0.7)",
        ],
        borderColor: [
          "rgba(245,198,165,1)",
          "rgba(255,119,119, 1)",
          "rgba(162,65,107, 1)",
          "rgba(133,39,71,1)",
          "rgba(63,7,19,1)",
        ],
        borderWidth: 1,
      },
    ],
  }
  useEffect(() => {
    axios.get("/api/admin/getCntEMP").then((response) => {
      setcntEmp(response.data.empCnt)
    })
    axios.get("/api/admin/getCntDEP").then((response) => {
      setcntDep(response.data.depCnt)
    })
  }, [])
  return (
    <>
      <div className="contnainer">
        <div className="h1 p-4" style={{ marginBottom: "-1.5rem" }}>
          Admin
        </div>
        <div className="row">
          <Boxcontainer
            text="No. of Employees"
            value={cntEmp}
            type="member"
            classValues="p-4 col-lg-6 col-md-6 col-sm-6 col-12"
          />
          <Boxcontainer
            text="No. of Department"
            value={cntDep}
            type="member"
            classValues="p-4 col-lg-6 col-md-6 col-sm-6 col-12"
          />
        </div>
        <div className="row">
          <div className="col-md-6" style={{ height: "360px" }}>
            <Pie
              data={data}
              height={300}
              width={200}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Leave Approvals",
                    fontSize: 25,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
          <div
            className="col-md-6"
            style={{ height: "360px", overflow: "auto" }}
          >
            <Bar
              data={deptdata}
              height={300}
              width={200}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Department Expenditure",
                    fontSize: 25,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
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
export default AdminMain
