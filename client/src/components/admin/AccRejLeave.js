import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Axios from "axios"
import links from "../../links.json"
import ReactLoading from "react-loading"
import Toast from "../Toast"
import checkIcon from "../../img/check.svg"
import errorIcon from "../../img/error.svg"

const AccRejLeave = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get("/api/admin/listpleave", {})
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].leave_date = res.data[i].leave_date.split("T")[0]
        }
        setLData(res.data)
        setLoader(false)
      })
      .catch((err) => console.log("Error", err))
  }, [])
  const [tdata, setTdata] = useState([])
  const [LData, setLData] = useState([])

  const updateTdata = (id) => {
    console.log("Id fromt data", id)
    const data = tdata.filter((t) => t.id !== id)
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
        <div className="h1 p-4">Check Leave Applications</div>

        <div className="members">
          <table id="members" className="table">
            <thead className="thead-light">
              <tr>
                <th>Leave ID</th>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Leave Date</th>
                <th>Leave Type</th>
                <th>Available Leave</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LData.map((t) => (
                <TableData key={t.Leave_Id} mem={t} updateTdata={updateTdata} />
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
  const handleEdit = () => {
    console.log(d)
    Axios.get("/api/admin/Accleave", {
      params: { id: d.Leave_Id, status: "Approved" },
    }).then((result) => {
      if (result.data.error == "0") {
        toastProperties = {
          id,
          title: "Success",
          description: "Leave application accepted",
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

  const handleDeletemodal = () => {
    console.log("From Delete: ", d)
    Axios.get("/api/admin/Accleave", {
      params: { id: d.Leave_Id, status: "Reject" },
    }).then((result) => {
      if (result.data.error == "0") {
        toastProperties = {
          id,
          title: "Success",
          description: "Leave Application Rejected.",
          backgroundColor: "#E09A07",
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

  const changeVal = (e, id, t, f) => {
    let val = e.target.value
    console.log(e)
    if (t === "edit" && f === "members") {
      switch (id) {
        case "Name":
          setData({ ...d, owner: val })
          break
        case "Flat":
          setData({ ...d, flat_no: val })
          break
        case "Contact":
          setData({ ...d, contact: val })
          break
        case "Parking":
          setData({ ...d, parking: val })
          break
        case "sel1":
          val === "Rented" ? (val = 1) : (val = 0)
          setData({ ...d, status: val })
          break
        case "Wing":
          setData({ ...d, wing: val })
          break
        default:
          break
      }
    }
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
        <td>{d.Leave_Id}</td>
        <td>{d.Employee_Id}</td>
        <td>{d.first_name}</td>
        <td>{d.last_name}</td>
        <td>{d.leave_date}</td>
        <td>{d.leave_type}</td>
        <td>{d.available_leave}</td>

        <td>
          <button
            type="button"
            class="btn btn-success btn-sm"
            data-toggle="modal"
            data-target="#Edit"
            onClick={() => {
              handleEdit()
            }}
          >
            Accept
          </button>
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
            Reject
          </button>
        </td>
      </tr>
    </>
  )
}

export default AccRejLeave
