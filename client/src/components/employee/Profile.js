import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Modal from "../admin/Modal"
import Axios from "axios"
import links from "../../links.json"
import token from "../../token.json"
import ReactLoading from "react-loading"
import checkIcon from "../../img/check.svg"
import Toast from "../Toast"


const Profile = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)
  const [deptlist, setdept] = useState([])
  const [list, setList] = useState([])
  let toastProperties = null
  const [showtoast, settoast] = useState(false)
  const id = Math.floor(Math.random() * 101 + 1)
  const [userData, setUD] = useState([])

  const changeVal = (e, field) => {
    let val = e.target.value
    switch (field) {
      case "empID":
        setUD({ ...userData, empID: val })
        break
      case "mobile":
        setUD({ ...userData, mobile: val })
        break
      case "fname":
        setUD({ ...userData, fname: val })
        break
      case "lname":
        setUD({ ...userData, lname: val })
        break
      case "dob":
        setUD({ ...userData, dob: val })
        break
      case "designation":
        setUD({ ...userData, designation: val })
        break
      case "city":
        setUD({ ...userData, city: val })
        break
      case "state":
        setUD({ ...userData, state: val })
        break
      case "hdate":
        setUD({ ...userData, hdate: val })
        break
      case "dept":
        setUD({ ...userData, dept: val })
        break
      default:
        break
    }
  }

  const clearInputs = () => {
    document.getElementById("create-user").reset()
  }

  const createUser = () => {
    Axios.get("/api/admin/createUser", {}).then((result) => {
      if (result.data.error == "0") {
        toastProperties = {
          id,
          title: "Success",
          description: "This is a success toast component",
          backgroundColor: "#5cb85c",
          icon: checkIcon,
        }
        setList([...list, toastProperties])
        settoast(true)
      } else {
      }
    })
  }
 
  useEffect(() => {
    // console.log(sessionStorage.getItem("ID"))
    Axios.get("/api/employee/eDet", { params: { id: sessionStorage.getItem("ID") } }).then((result) => {
      // setdept(result.data)
      // console.log(result)
      setUD(result.data)
      console.log(userData)
      console.log(result.data)
      console.log(result.data.City)
    })
  }, [])
//   City: "Mumbai"
// DOB: "2001-08-06T18:30:00.000Z"
// Department_ID: 12
// Designation: "Director"
// Employee_Id: 101
// Employee_Role: "Technical"
// First_Name: "Om"
// Hire_Date: "2020-08-19T18:30:00.000Z"
// Last_Name: "Patel"
// Mobile_No: "8918201820"
// State: "Maharashtra"
  return (
    <>
      <div className="contnainer">
        {showtoast ? (
          <Toast
            toastList={list}
            position="top-right"
            autoDelete={false}
            autoDeleteTime={3000}
          />
        ) : (
          ""
        )}
        <div className="h1 p-4">Profile Page</div>
        <form class="p-4" id="create-user">
          <div class="form-group row">
            <Input
              
              id="empID"
              // value = {userData.Employee_Id}
              itype="text"
              legend="Employee ID"
              required="true"
              onChange={(e) => changeVal(e, "empID")}
            />
            <Input
              id="MobileNo"
              itype="text"
              legend="Mobile No."
              required="true"
              onChange={(e) => changeVal(e, "mobile")}
            />
          </div>
          <div class="form-group row">
            <Input
              id="fname"
              itype="text"
              legend="First Name"
              required="true"
              onChange={(e) => changeVal(e, "fname")}
            />
            <Input
              id="lname"
              itype="text"
              legend="Last Name"
              required="true"
              onChange={(e) => changeVal(e, "lname")}
            />
          </div>
          <div class="form-group row">
            <Input
              id="dob"
              itype="date"
              legend="Date of Birth"
              required="false"
              onChange={(e) => changeVal(e, "dob")}
            />
            <Input
              id="designation"
              itype="text"
              legend="Designation"
              required="true"
              onChange={(e) => changeVal(e, "designation")}
            />
          </div>
          <div class="form-group row">
            <Input
              id="city"
              itype="text"
              legend="City"
              required="false"
              onChange={(e) => changeVal(e, "city")}
            />
            <Input
              id="state"
              itype="text"
              legend="State"
              required="false"
              onChange={(e) => changeVal(e, "state")}
            />
          </div>
          <div class="form-group row">
            <Input
              id="hdate"
              itype="date"
              legend="Hire Date"
              required="true"
              onChange={(e) => changeVal(e, "hdate")}
            />
            <Input
              id="dept"
              itype="text"
              legend="Department"
              required="true"
              onChange={(e) => changeVal(e, "dept")}
            />
         
          </div>
        </form>
        <div class="d-flex justify-content-center">
          <button
            className="btn btn-secondary mr-5"
            onClick={() => clearInputs()}
          >
            Clear
          </button>
          <button
            type="button"
            class="btn btn-outline-success"
            onClick={() => createUser()}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

const Input = ({ id,data, itype, type, legend, onChange, required }) => {
  return (
    <>
      <label for={id} class="col-sm-2 col-form-label">
        {legend}
      </label>
      <div class="col-sm-4">
        {required == "true" ? (
          <input
            type={itype}
            class="form-control"
            id={id}
            value = {data}
            onChange={(e) => onChange(e, type, legend)}
            required disabled
          />
        ) : (
          <input
            type={itype}
            class="form-control"
            id={id}
            value = {data}
            onChange={(e) => onChange(e, type, legend)}
             disabled
          />
        )}
      </div>
    </>
  )
}
export default Profile
