import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Modal from "../admin/Modal"
import Axios from "axios"
import links from "../../links.json"
import token from "../../token.json"
import ReactLoading from "react-loading"

const Employee_details = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get("/api/emp/details", {
    
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
    empID: sessionStorage.getItem(" empID"),
    fname: "",
    lname: "",
    mobile: "",
    dob: "",
    designation: "",
    Deptartment: "",
    deptID: "", 
    hdate: "",
    city: "",
    state: "",


  })

  const updateTdata = (id) => {
    console.log("Id fromt data", id)
    const data = tdata.filter((t) => t.id !== id)
    setTdata(data)
  }

  const changeVal = (e, id, t, f) => {
    // let val = e.target.value
    // console.log(e)
    // if (t === "addnew" && f === "members") {
    //   switch (id) {
    //     case "Name":
    //       setNewData({ ...NewData, fname: val })
    //       break
    //       case " Surname":
    //       setNewData({ ...NewData, lname: val })
    //       break
    //     case "Department ":
    //       setNewData({ ...NewData, Deptartment: val })
    //       break
    //     case "Contact":
    //       setNewData({ ...NewData, mobile: val })
    //       break
    //     case "DeptID":
    //       setNewData({ ...NewData, parking: val })
    //       break
    //     case "Date Of Birth ":
    //       setNewData({ ...NewData, dob: val })
    //       break
    //     case "Designation":
    //       setNewData({ ...NewData, designation: val })
    //       break
    //     case "Hire Date":
    //       setNewData({ ...NewData, hdate: val })
    //       break
    //     case "City":
    //       setNewData({ ...NewData, city: val })
    //       break
    //     case "State":
    //       setNewData({ ...NewData, state: val })
    //       break
    //     default:
    //       break
    //   }
    // }
  }

  const handleSave = (f, t) => {
    // if (f === "Employee" && t === "addnew") {
    //   console.log("NewData", NewData)
    //   Axios.post(links.home + links.members, NewData, {
    //     headers: {
    //       Authorization: `token ${token.token}`,
    //     },
    //   })
    //     .then(() => {
    //       console.log("Success")
    //       Axios.get(links.home + links.members, {
    //         params: { empID: sessionStorage.getItem("empID") },
    //         headers: {
    //           Authorization: `token ${token.token}`,
    //         },
    //       })
    //         .then((res) => {
    //           console.log(res.data)
    //           setTdata(res.data)
    //         })
    //         .catch((err) => console.log("Error", err))
    //     })
    //     .catch((err) => {
    //       console.log("Error", err)
    //     })
    // }
  }

  const handleNew = () => {
    // setModal(true)
    // console.log("Handle New Clicked")
  }

  return (
    <>
      <div className="container">
        <div className="h1 p-4">Employee</div>
        <div className="d-flex justify-content-center">
          {loader ? (
            <ReactLoading type="bars" color="black" height={55} width={90} />
          ) : (
            ""
          )}
        </div>
        <div className="row col-md-1 offset-md-10">
          {/* <button
            className="m-2 btn btn-primary"
            data-toggle="modal"
            data-target="#Members_New"
            onClick={() => handleNew()}
          >
            + Add New
          </button> */}
          {modal ? (
            <Modal
              data={NewData}
              type="addnew"
              from="Employee"
              changeVal={changeVal}
              handleSave={handleSave}
            />
          ) : (
            ""
          )}
        </div>
        <div className="Employee">
          <table id="Employee" className="table">
            <thead className="thead-light">
              <tr>
                <th>empID</th>
                <th> fname</th>
                <th>lname</th>
                <th>mobile</th>
                <th>dob</th>
                <th>designation</th>
                <th>Deptartment</th>
                <th>deptID</th>
                <th>hdate</th>
                <th>city</th>
                <th>state</th>
              </tr>
            </thead>
            <tbody>
              {tdata.map((t) => (
                <TableData key={t.empID} mem={t} updateTdata={updateTdata} />
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
    if (t === "edit" && f === "Employee") {
      switch (id) { 
    case "Name":
      setData({ ...d, fname: val })
      break
    case " Surname":
      setData({ ...d, lname: val })
      break
    case "Department ":
      setData({ ...d, Deptartment: val })
      break
    case "Contact":
      setData({ ...d, mobile: val })
      break
    case "DeptID":
      setData({ ...d, deptID: val })
      break
    case "Date Of Birth ":
      setData({ ...d, dob: val })
      break
    case "Designation":
      setData({ ...d, designation: val })
      break
    case "Hire Date":
      setData({ ...d, hdate: val })
      break
    case "City":
      setData({ ...d, city: val })
      break
    case "State":
    setData({ ...d, state: val })
      break
    default:
      break
        
      }
    }
  }

  const handleSave = (f, t) => {
    if (f === "Employee" && t === "edit") {
      console.log(d)
      Axios.put("/api/emp/details", {
      //   params: { id: d.id },
      //   headers: {
      //     Authorization: `token ${token.token}`,
      //   },
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
    if (f === "Employee" && t === "delete") {
      console.log("ID:", d)
      Axios.delete("/api/emp/details", {
        // params: { id: d.id },
        // headers: {
        //   Authorization: `token ${token.token}`,
        // },
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
        <td>{d.empID}</td>
        <td>{d.fname}</td>
        <td>{d.lname}</td>
        <td>{d.mobile}</td>
        <td>{d.dob}</td>
        <td>{d.designation}</td>
        <td>{d.deptID}</td>
        <td>{d.hdate}</td>
        <td>{d.city}</td>
        <td>{d.state}</td>
        {/* <td>
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
        </td> */}
      </tr>
      {modal.Edit ? (
        <Modal
          data={d}
          type="edit"
          from="Employee"
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
          from="Employee"
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

export default Employee_details

 