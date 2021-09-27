import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Modal from "./Modal"
import Axios from "axios"
import links from "../../links.json"
import token from "../../token.json"
import ReactLoading from "react-loading"

const Department = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get("/api/admin/department", {
      // params: {  deptID: sessionStorage.getItem(" DeptID") },
      // headers: {
      //   Authorization: `token ${token.token}`,
      // },
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
    deptID: sessionStorage.getItem(" deptID"),
    DeptartmentName: "",
    NumberofEmployees: "",
  })

  const updateTdata = (id) => {
    console.log("Id fromt data", id)
    const data = tdata.filter((t) => t.id !== id)
    setTdata(data)
  }

  const changeVal = (e, id, t, f) => {
    // let val = e.target.value
    // console.log(e)
    // if (t === "addnew" && f === "Department") {
    //   switch (id) {
    //     case "Deptartment Name":
    //       setNewData({ ...NewData, DeptartmentName: val })
    //       break
    //       case " Employee Name":
    //       setNewData({ ...NewData, EmpName: val })
    //       break
    //     case "Employee ID ":
    //       setNewData({ ...NewData, empID: val })
    //       break
    //     case "Employee designation":
    //       setNewData({ ...NewData, designation: val })
    //       break
    //     default:
    //       break
    //   }
    // }
  }

  const handleSave = (f, t) => {
//     if (f === "Department" && t === "addnew") {
//       console.log("NewData", NewData)
//       Axios.post(links.home + links.members, NewData, {
//         headers: {
//           Authorization: `token ${token.token}`,
//         },
//       })
//         .then(() => {
//           console.log("Success")
//           Axios.get(links.home + links.members, {
//             params: { deptID: sessionStorage.getItem("deptID") },
//             headers: {
//               Authorization: `token ${token.token}`,
//             },
//           })
//             .then((res) => {
//               console.log(res.data)
//               setTdata(res.data)
//             })
//             .catch((err) => console.log("Error", err))
//         })
//         .catch((err) => {
//           console.log("Error", err)
//         })
//     }
  }

  const handleNew = () => {
    // setModal(true)
    // console.log("Handle New Clicked")
  }

  return (
    <>
      <div className="container">
        <div className="h1 p-4">Department</div>
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
              from="Department"
              changeVal={changeVal}
              handleSave={handleSave}
            />
          ) : (
            ""
          )}
        </div>
        <div className="Department">
          <table id="Department" className="table">
            <thead className="thead-light">
              <tr>
                <th>deptID</th>
                <th>DeptartmentName </th>
                <th>NumberofEmployees</th>
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
    if (t === "edit" && f === "Department") {
      switch (id) { 
    case "Department ":
      setData({ ...d, Deptartment: val })
      break
    case "DeptID":
      setData({ ...d, deptID: val })
      break
    case "Number of Employees ":
      setData({ ...d, dob: val })
      break
    default:
      break
        
      }
    }
  }

  const handleSave = (f, t) => {
    if (f === "Department" && t === "edit") {
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
    if (f === "Department" && t === "delete") {
      console.log("ID:", d)
      Axios.delete("/api/admin/Department", {
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
        <td>{d.DeptartmentName}</td>
        <td>{d.deptID}</td>
        <td>{d.NumberofEmployees}</td>
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
          from="Department"
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

export default Department
 