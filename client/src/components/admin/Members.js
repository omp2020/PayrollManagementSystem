import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Modal from "./Modal"
import Axios from "axios"
import links from "../../links.json"
import token from "../../token.json"
import ReactLoading from "react-loading"

const Members = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get(links.home + links.members, {
      params: { society_id: sessionStorage.getItem("society_id") },
      headers: {
        Authorization: `token ${token.token}`,
      },
    })
      .then((res) => {
        setTdata(res.data)
        setLoader(false)
      })
      .catch((err) => console.log("Error", err))
  }, [])
  const [tdata, setTdata] = useState([])

  const [modal, setModal] = useState(false)
  const [NewData, setNewData] = useState({
    society_id: sessionStorage.getItem("society_id"),
    wing: "",
    flat_no: "",
    owner: "",
    contact: "",
    parking: "",
    status: "",
  })

  const updateTdata = (id) => {
    console.log("Id fromt data", id)
    const data = tdata.filter((t) => t.id !== id)
    setTdata(data)
  }

  const changeVal = (e, id, t, f) => {
    let val = e.target.value
    console.log(e)
    if (t === "addnew" && f === "members") {
      switch (id) {
        case "Name":
          setNewData({ ...NewData, owner: val })
          break
        case "Flat":
          setNewData({ ...NewData, flat_no: val })
          break
        case "Contact":
          setNewData({ ...NewData, contact: val })
          break
        case "Parking":
          setNewData({ ...NewData, parking: val })
          break
        case "sel1":
          val === "Rented" ? (val = 1) : (val = 0)
          setNewData({ ...NewData, status: val })
          break
        case "Wing":
          setNewData({ ...NewData, wing: val })
          break
        default:
          break
      }
    }
  }

  const handleSave = (f, t) => {
    if (f === "members" && t === "addnew") {
      console.log("NewData", NewData)
      Axios.post(links.home + links.members, NewData, {
        headers: {
          Authorization: `token ${token.token}`,
        },
      })
        .then(() => {
          console.log("Success")
          Axios.get(links.home + links.members, {
            params: { society_id: sessionStorage.getItem("society_id") },
            headers: {
              Authorization: `token ${token.token}`,
            },
          })
            .then((res) => {
              console.log(res.data)
              setTdata(res.data)
            })
            .catch((err) => console.log("Error", err))
        })
        .catch((err) => {
          console.log("Error", err)
        })
    }
  }

  const handleNew = () => {
    setModal(true)
    console.log("Handle New Clicked")
  }

  return (
    <>
      <div className="container">
        <div className="h1 p-4">Members</div>
        <div className="d-flex justify-content-center">
          {loader ? (
            <ReactLoading type="bars" color="black" height={55} width={90} />
          ) : (
            ""
          )}
        </div>
        <div className="row col-md-1 offset-md-10">
          <button
            className="m-2 btn btn-primary"
            data-toggle="modal"
            data-target="#Members_New"
            onClick={() => handleNew()}
          >
            + Add New
          </button>
          {modal ? (
            <Modal
              data={NewData}
              type="addnew"
              from="members"
              changeVal={changeVal}
              handleSave={handleSave}
            />
          ) : (
            ""
          )}
        </div>
        <div className="members">
          <table id="members" className="table">
            <thead className="thead-light">
              <tr>
                <th>Member ID</th>
                <th>Wing No.</th>
                <th>Flat No.</th>
                <th>Owner</th>
                <th>Contact</th>
                <th>Parking</th>
                <th>Status</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {tdata.map((t) => (
                <TableData key={t.memberID} mem={t} updateTdata={updateTdata} />
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

  const handleEdit = () => {
    console.log(d)
    setModal({ Edit: true, Delete: false })
  }

  const handleDeletemodal = () => {
    console.log("From Delete: ", d)
    setModal({ Edit: false, Delete: true })
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
      <tr>
        <td>{d.id}</td>
        <td>{d.wing}</td>
        <td>{d.flat_no}</td>
        <td>{d.owner}</td>
        <td>{d.contact}</td>
        <td>{d.parking}</td>
        <td>{d.status ? "Rented" : "Self"}</td>
        <td>
          <button
            type="button"
            class="btn btn-warning btn-sm"
            data-toggle="modal"
            data-target="#Edit"
            onClick={() => {
              handleEdit()
            }}
          >
            Edit
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
            Delete
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

export default Members
