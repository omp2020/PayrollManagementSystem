import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Axios from "axios"
import links from "../../links.json"
import Toast from "../Toast"
import checkIcon from "../../img/check.svg"
import errorIcon from "../../img/error.svg"
const Pay = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get("/api/admin/listpay", {
     
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

  return (
    <>
      <div className="container">
        <div className="h1 p-4">Pay Employee</div>
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
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Salary</th>
                <th>Option</th>
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
    Axios.get("/api/admin/payroll", {params: { id: d.Employee_Id }})
    .then((result) => {
      if (result.data.error == "0") {
        toastProperties = {
          id,
          title: "Success",
          description: "Payment Success",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        }
        setList([...list, toastProperties])
        settoast(true)
      } else {
        toastProperties = {
          id,
          title: "Danger",
          description: "Failed",
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
        <td>{d.Employee_Id}</td>
        <td>{d.first_name}</td>
        <td>{d.last_name}</td>
        <td>{d.salary}</td>
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
            Pay
          </button>
         
        </td>
      </tr>
      
      
    </>
  )
}

export default Pay
