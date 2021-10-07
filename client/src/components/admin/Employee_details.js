import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Axios from "axios"
import links from "../../links.json"
import ReactLoading from "react-loading"

const Employee_details = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get("/api/admin/Edet", {})
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].DOB = res.data[i].DOB.split("T")[0]
          res.data[i].Hire_Date = res.data[i].Hire_Date.split("T")[0]
        }
        setTdata(res.data)
        setLoader(false)
      })
      .catch((err) => console.log("Error", err))
  }, [])
  const [tdata, setTdata] = useState([])
  const updateTdata = (id) => {
    console.log("Id fromt data", id)
    const data = tdata.filter((e) => e.id !== id)
    setTdata(data)
  }

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
        <div className="h1 p-4">Employee Details</div>

        <div className="members">
          <table id="members" className="table">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Mobile</th>
                <th>DOB</th>
                <th>Designation</th>
                <th>DeptID</th>
                <th>Role</th>
                <th>Hire date</th>
                <th>City</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {tdata.map((e) => (
                <TableData
                  key={e.Employee_Id}
                  mem={e}
                  updateTdata={updateTdata}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

const TableData = ({ mem, updateTdata }) => {
  let [d, setData] = useState(mem)
  const [modal, setModal] = useState({ Edit: false, Delete: false })

  return (
    <>
      <tr>
        <td>{d.Employee_Id}</td>
        <td>{d.First_Name}</td>
        <td>{d.Last_Name}</td>
        <td>{d.Mobile_No}</td>
        <td>{d.DOB}</td>
        <td>{d.Designation}</td>
        <td>{d.Department_ID}</td>
        <td>{d.Employee_Role}</td>
        <td>{d.Hire_Date}</td>
        <td>{d.City}</td>
        <td>{d.State}</td>
      </tr>
    </>
  )
}

export default Employee_details
