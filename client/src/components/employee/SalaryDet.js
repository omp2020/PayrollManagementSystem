import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Axios from "axios"
import links from "../../links.json"
import token from "../../token.json"
import Modal from "../admin/Modal"

const SalaryDet = () => {
    const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get("/api/employee/listsalary", {params: { id: sessionStorage.getItem("ID") }
     
    })
      .then((res) => {
        console.log(res)
        setSData(res.data)
      })
      .catch((err) => console.log("Error", err))
  }, [])
  const [tdata, setTdata] = useState([])
  const [SData, setSData] = useState([
    // Salary_Id:"",
    // Employee_Id:"",
    // first_name:"",
    // last_name:"",
    // designation:"",
    // month:"",
    // year:"",
    // salary:"",
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
        case "Salary_Id":
            setSData({ ...SData, Salary_Id: val })
          break
        case "Employee_Id":
            setSData({ ...SData, Employee_Id: val })
          break
        case "First_Name":
            setSData({ ...SData, First_Name: val })
          break
        case "Last_Name":
            setSData({ ...SData, Last_Name: val })
          break
          case "designation":
          setSData({ ...SData, designation: val })
          break
        case "month":
            setSData({ ...SData, month: val })
            break
        case "year":
            setSData({ ...SData, year: val })
          break
        case "salary":
            setSData({ ...SData, salary: val })
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
    return(
        <div className="container">
        <div className="h1 p-4">Salary Details</div>
        {/* <div className="d-flex justify-content-center">
          {loader ? (
            <ReactLoading type="bars" color="black" height={55} width={90} />
          ) : (
            ""
          )}
        </div> */}
       
        <div className="members">
          <table id="members" className="table">
            <thead className="thead-light">
              <tr>
                <th>Salary ID</th>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Designation</th>
                <th>Month</th>
                <th>Year</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {SData.map((t) => (
                <TableData key={t.Salary_Id} mem={t} updateTdata={updateTdata} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
        <td>{d.Salary_Id}</td>
        <td>{d.Employee_Id}</td>
        <td>{d.first_name}</td>
        <td>{d.last_name}</td>
        <td>{d.designation}</td>
        <td>{d.month}</td>
        <td>{d.year}</td>
        <td>{d.salary}</td>
        
       
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
      
    </>
  )
}

export default SalaryDet
