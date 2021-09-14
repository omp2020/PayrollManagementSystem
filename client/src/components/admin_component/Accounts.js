import React, { useState, useEffect } from "react"
import Modal from "./Modal"
import Axios from "axios"
import links from "../../links.json"
import token from "../../token.json"
import ReactLoading from "react-loading"

const Accounts = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [tdata, setTdata] = useState([])
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get(links.home + links.accounts, {
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
  const [modal, setModal] = useState(false)
  const [NewData, setNewData] = useState({
    society_id: sessionStorage.getItem("society_id"),
    mode: "",
    amount: "",
    remark: "",
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
    if (t === "addnew" && f === "Account") {
      switch (id) {
        case "sel1":
          val === "Credit" ? (val = 1) : (val = 0)
          setNewData({ ...NewData, mode: val })
          break
        case "Amount":
          setNewData({ ...NewData, amount: val })
          break
        case "Remark":
          setNewData({ ...NewData, remark: val })
          break
        default:
          break
      }
    }
  }

  const handleSave = (f, t) => {
    if (f === "Account" && t === "addnew") {
      Axios.post(links.home + links.accounts, NewData, {
        headers: {
          Authorization: `token ${token.token}`,
        },
      })
        .then(() => {
          console.log("Success")
          Axios.get(links.home + links.accounts, {
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
        <div className="h1 p-4">Accounts</div>
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
            data-target="#Account_New"
            onClick={() => handleNew()}
          >
            + Add New
          </button>
          {modal ? (
            <Modal
              data={NewData}
              type="addnew"
              from="Account"
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
                <th>Transaction Id</th>
                <th>Date Time</th>
                <th>Mode</th>
                <th>Amount</th>
                <th>Remark</th>
                <th>Option</th>
              </tr>
            </thead>

            <tbody>
              {tdata.map((t) => (
                <TableData key={t.TransId} mem={t} updateTdata={updateTdata} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

const TableData = ({ mem, updateTdata }) => {
  let [d] = useState(mem)
  const [modal, setModal] = useState({ Delete: false })

  const handleDeletemodal = () => {
    console.log("From Delete: ", d)
    setModal({ Delete: true })
  }

  const changeVal = () => {}
  const handleSave = () => {}
  const handleDelete = (f, t) => {
    if (f === "Account" && t === "delete") {
      console.log("ID:", d)
      Axios.delete(links.home + links.accounts, {
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
        <td>
          {d.date_time.split("T")[0]} {d.date_time.split("T")[1].slice(0, 8)}
        </td>
        <td>{d.mode ? "Credit" : "Debit"}</td>
        <td>{d.amount}</td>
        <td>{d.remark}</td>
        <td>
          <button
            type="button"
            class="btn btn-outline-danger btn-sm"
            data-toggle="modal"
            data-target="#Account_Delete"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              handleDeletemodal()
            }}
          >
            Delete
          </button>
        </td>
      </tr>
      {modal.Delete ? (
        <Modal
          data={d}
          type="delete"
          from="Account"
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

export default Accounts
