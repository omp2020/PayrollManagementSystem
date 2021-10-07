import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Axios from "axios"
import links from "../../links.json"
import ReactLoading from "react-loading"

const Salary = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get("/api/admin/listsalary", {})
      .then((res) => {
        setSData(res.data)
        setLoader(false)
      })
      .catch((err) => console.log("Error", err))
  }, [])
  const [SData, setSData] = useState([])

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center">
          {loader ? (
            <ReactLoading type="bars" color="black" height={55} width={90} />
          ) : (
            ""
          )}
        </div>
        <div className="h1 p-4">Salary Details</div>

        <div className="members">
          <table id="members" className="table">
            <thead className="thead-light">
              <tr>
                <th>Salary ID</th>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Designation</th>
                <th>Month</th>
                <th>Year</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {SData.map((t) => (
                <TableData key={t.Salary_Id} mem={t} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

const TableData = ({ mem }) => {
  let [d, setData] = useState(mem)

  return (
    <>
      <tr>
        <td>{d.Salary_Id}</td>
        <td>{d.Employee_Id}</td>
        <td>{d.first_name}</td>
        <td>{d.last_name}</td>
        <td>{d.designation}</td>
        <td>{d.month}</td>
        <td>{d.year}</td>
        <td>{d.salary}</td>
      </tr>
    </>
  )
}

export default Salary
