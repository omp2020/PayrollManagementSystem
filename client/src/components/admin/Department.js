import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Axios from "axios"
import links from "../../links.json"
import ReactLoading from "react-loading"

const Department = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get("/api/admin/listdept", {})
      .then((res) => {
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
        <div className="h1 p-4">Department Details</div>

        <div className="members">
          <table id="members" className="table">
            <thead className="thead-light">
              <tr>
                <th>Department ID</th>
                <th>Department Name</th>
              </tr>
            </thead>
            <tbody>
              {tdata.map((e) => (
                <TableData
                  key={e.Department_Id}
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
        <td>{d.Department_Id}</td>
        <td>{d.Department_Name}</td>
      </tr>
    </>
  )
}

export default Department
