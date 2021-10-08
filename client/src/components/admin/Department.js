import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Axios from "axios"
import links from "../../links.json"
import ReactLoading from "react-loading"
import Toast from "../Toast"
import checkIcon from "../../img/check.svg"
import errorIcon from "../../img/error.svg"

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
                <th>Option</th>
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
  const [list, setList] = useState([])
  let toastProperties = null
  const [showtoast, settoast] = useState(false)
  const id = Math.floor(Math.random() * 101 + 1)
  const handleDeletemodal = () => {
    console.log("From Delete: ", d)
    Axios.get("/api/admin/delDept", {
      params: { id: d.Department_Id },
    }).then((result) => {
      if (result.data.error == "0") {
        toastProperties = {
          id,
          title: "Success",
          description: "Department Deleted",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        }
        setList([...list, toastProperties])
        settoast(true)
      } else {
        toastProperties = {
          id,
          title: "Danger",
          description: "Error",
          backgroundColor: "#d9534f",
          icon: errorIcon,
        }
        setList([...list, toastProperties])
        settoast(true)
      }
    })
  }
  return (
    <>
      {showtoast ? (
        <Toast
          toastList={list}
          position="top-right"
          autoDelete={false}
          autoDeleteTime="3000"
        />
      ) : (
        ""
      )}
      <tr>
        <td>{d.Department_Id}</td>
        <td>{d.Department_Name}</td>
        <td>
          <button
            type="button"
            class="btn btn-outline-danger btn-sm"
            data-toggle="modal"
            data-target="#Delete"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              handleDeletemodal()
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  )
}

export default Department
