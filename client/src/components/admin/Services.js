import React, { useState, useEffect } from "react"
import Modal from "./Modal"
import Axios from "axios"
import links from "../../links.json"
import token from "../../token.json"
import ReactLoading from "react-loading"

const Services = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [loader, setLoader] = useState(true)
  const [tdata, setTdata] = useState([])
  useEffect(() => {
    Axios.get(links.home + links.services, {
      params: { society_id: sessionStorage.getItem("society_id") },
      headers: {
        Authorization: `token ${token.token}`,
      },
    })
      .then((res) => {
        console.log(res.data)
        setTdata(res.data)
        setLoader(false)
      })
      .catch((err) => console.log("Error", err))
  }, [])

  const [modal, setModal] = useState(false)
  const [NewData, setNewData] = useState({
    society_id: sessionStorage.getItem("society_id"),
    name: "",
    contact: "",
    designation: "",
  })

  const handleNew = () => {
    setModal(true)
  }

  const updateTdata = (id) => {
    console.log("Id fromt data", id)
    const data = tdata.filter((t) => t.id !== id)
    setTdata(data)
  }

  const changeVal = (e, id, t, f) => {
    let val = e.target.value
    if (t === "addnew" && f === "Services") {
      switch (id) {
        case "Name":
          setNewData({ ...NewData, name: val })
          break
        case "Desig":
          setNewData({ ...NewData, designation: val })
          break
        case "Contact":
          setNewData({ ...NewData, contact: val })
          break
        default:
          break
      }
    }
  }

  const handleSave = (f, t) => {
    if (f === "Services" && t === "addnew") {
      Axios.post(links.home + links.services, NewData, {
        headers: {
          Authorization: `token ${token.token}`,
        },
      })
        .then(() => {
          console.log("Success")
          Axios.get(links.home + links.services, {
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

  return (
    <>
      <div className="container">
        <div className="h1 p-4">Service</div>
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
            data-target="#Service_New"
            onClick={() => handleNew()}
          >
            + Add New
          </button>
          {modal ? (
            <Modal
              data={NewData}
              type="addnew"
              from="Services"
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
                <th>Name</th>
                <th>Designation</th>
                <th>Contact</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {tdata.map((t) => (
                <TableData key={t.id} mem={t} updateTdata={updateTdata} />
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
    if (t === "addnew" && f === "members") {
      switch (id) {
        case "Name":
          setData({ ...d, owner: val })
          break
        case "Flat":
          setData({ ...d, flat: val })
          break
        case "Contact":
          setData({ ...d, contact: val })
          break
        case "Parking":
          setData({ ...d, parking: val })
          break
        case "sel1":
          setData({ ...d, status: val })
          break
        default:
          break
      }
    } else if (t === "edit" && f === "members") {
      switch (id) {
        case "Name":
          setData({ ...d, own: val })
          break
        case "Flat":
          setData({ ...d, flat: val })
          break
        case "Contact":
          setData({ ...d, cont: val })
          break
        case "Parking":
          setData({ ...d, park: val })
          break
        case "sel1":
          setData({ ...d, stat: val })
          break
        default:
          break
      }
    } else if (t === "edit" && f === "Services") {
      switch (id) {
        case "Name":
          setData({ ...d, name: val })
          break
        case "Desig":
          setData({ ...d, designation: val })
          break
        case "Contact":
          setData({ ...d, contact: val })
          break
        default:
          break
      }
    } else if (t === "addnew" && f === "Account") {
      switch (id) {
        case "Transaction":
          setData({ ...d, TransId: val })
          break
        case "DateTime":
          setData({ ...d, DateTime: val })
          break
        case "sel1":
          setData({ ...d, Mode: val })
          break
        case "Amount":
          setData({ ...d, Amount: val })
          break
        case "Remark":
          setData({ ...d, Remark: val })
          break
        default:
          break
      }
    }
  }

  const handleSave = (f, t) => {
    if (f === "Services" && t === "edit") {
      console.log(d)
      Axios.put(links.home + links.services, d, {
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
    if (f === "Services" && t === "delete") {
      console.log("ID:", d)
      Axios.delete(links.home + links.services, {
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
        <td>{d.name}</td>
        <td>{d.designation}</td>
        <td>{d.contact}</td>
        <td>
          <button
            type="button"
            class="btn btn-warning btn-sm"
            data-toggle="modal"
            data-target="#Services_Edit"
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
            data-target="#Services_Delete"
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
          from="Services"
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
          from="Services"
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
export default Services
