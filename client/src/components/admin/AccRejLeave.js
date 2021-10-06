import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Modal from "./Modal"
import Axios from "axios"
import links from "../../links.json"
import token from "../../token.json"
import ReactLoading from "react-loading"
import Toast from "../Toast"
import checkIcon from "../../img/check.svg"
import errorIcon from "../../img/error.svg"

const AccRejLeave = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)
  // const [list, setList] = useState([])
  // let toastProperties = null
  // const [showtoast, settoast] = useState(false)
  // const id = Math.floor(Math.random() * 101 + 1)
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get("/api/admin/listpleave", {
      
    })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          // arr.push(result[i])
          res.data[i].leave_date = res.data[i].leave_date.split("T")[0]
        }
          console.log(res.data)
          setLData(res.data)
        // setTdata(res.data)
        // setLoader(false)
      })
      .catch((err) => console.log("Error", err))
  }, [])
  const [tdata, setTdata] = useState([])
  const [LData, setLData] = useState([
    // Leave_Id:"",
    // Employee_Id:"",
    // first_name:"",
    // last_name:"",
    // leave_date:"",
    // leave_type:"",
    // available_leave:"",
    // status:"",
  ])

  const updateTdata = (id) => {
    console.log("Id fromt data", id)
    const data = tdata.filter((t) => t.id !== id)
    setTdata(data)
  }

  const changeVal = (e, id, t, f) => {
    let val = e.target.value
    console.log(e)
    
      switch (id) {
        case "Leave_Id":
            setLData({ ...LData, Leave_Id: val })
          break
        case "Employee_Id":
            setLData({ ...LData, Employee_Id: val })
          break
        case "first_name":
            setLData({ ...LData, first_name: val })
          break
        case "last_name":
            setLData({ ...LData, last_name: val })
          break
        case "leave_date":
            setLData({ ...LData, leave_date: val })
          break
        case "leave_type":
            setLData({ ...LData, leave_type: val })
          break
          case "available_leave":
            setLData({ ...LData, available_leave: val })
          break
          case "status":
            setLData({ ...LData, status: val })
          break  
        default:
          break
    
    }
  }

  const handleSave = (f, t) => {
    
      
        }
    
  

  const handleNew = () => {
    
    console.log("Handle New Clicked")
  }

  return (
    <>
    
      <div className="container">
      
        <div className="h1 p-4">Check Leave Applications</div>

        {/* <div className="d-flex justify-content-center">
          {loader ? (
            <ReactLoading type="bars" color="black" height={55} width={90} />
          ) : (
            ""
          )}
        </div>
     */}
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
  const [modal, setModal] = useState({ Edit: false, Delete: false })
  const [list, setList] = useState([])
  let toastProperties = null
  const [showtoast, settoast] = useState(false)
  const id = Math.floor(Math.random() * 101 + 1)
  const handleEdit = () => {
    console.log(d)
    Axios.get("/api/admin/Accleave", {params: { id: d.Leave_Id ,status:'Approved'}})
    .then((result) => {
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
    // setModal({ Edit: true, Delete: false })
    
  }

  const handleDeletemodal = () => {
    console.log("From Delete: ", d)
    Axios.get("/api/admin/Accleave", {params: { id: d.Leave_Id ,status:'Reject'}})
    .then((result) => {
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
    // setModal({ Edit: false, Delete: true })
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

  const handleSave = (f, t) => {
    if (f === "members" && t === "edit") {
      console.log(d)
      Axios.put(links.home + links.members, d, {
        params: { id: d.id },
        headers: {
          Authorization: `token ${token.token}`,
        },
      })
        .then((res) => {
          console.log("Success")
        })
        .catch((err) => {
          console.log("Error", err)
        })
    }
  }

  const handleDelete = (f, t) => {
    if (f === "members" && t === "delete") {
      console.log("ID:", d)
      Axios.delete(links.home + links.members, {
        params: { id: d.id },
        headers: {
          Authorization: `token ${token.token}`,
        },
      })
        .then(() => {
          console.log("Success")
          setModal({ Edit: false, Delete: false })
          updateTdata(d.id)
        })
        .catch((err) => {
          console.log("Error", err)
        })
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
      {modal.Edit ? (
        <Modal
          data={d}
          type="edit"
          from="members"
          changeVal={changeVal}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      ) : (
        ""
      )}
      {modal.Delete ? (
        <Modal
          data={d}
          type="delete"
          from="members"
          changeVal={changeVal}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      ) : (
        ""
      )}
    </>
  )
}

export default AccRejLeave
