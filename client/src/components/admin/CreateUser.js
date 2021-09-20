import React, { useState } from "react"
import links from "../../links.json"
import Toast from "../Toast"
import checkIcon from "../../img/check.svg"

const CreateUser = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)
  const [list, setList] = useState([])
  let toastProperties = null
  const [showtoast, settoast] = useState(false)
  const id = Math.floor(Math.random() * 101 + 1)
  const [userData, setUD] = useState({
    empID: "",
    mobile: "",
    fname: "",
    lname: "",
    dob: "",
    designation: "",
    city: "",
    state: "",
    hdate: "",
    uname: "",
  })

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
      case "uname":
        setUD({ ...userData, uname: val })
        break
      default:
        break
    }
  }

  const clearInputs = () => {
    document.getElementById("create-user").reset()
  }

  const createUser = () => {
    console.log("Create User called")
    toastProperties = {
      id,
      title: "Success",
      description: "This is a success toast component",
      backgroundColor: "#5cb85c",
      icon: checkIcon,
    }
    setList([...list, toastProperties])
    settoast(true)
  }
  return (
    <>
      <div className="contnainer">
        {showtoast ? (
          <Toast
            toastList={list}
            position="top-right"
            autoDelete={false}
            autoDeleteTime=""
          />
        ) : (
          ""
        )}
        <div className="h1 p-4">Create User</div>
        <form class="p-4" id="create-user">
          <div class="form-group row">
            <Input
              id="empID"
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
              id="uname"
              itype="text"
              legend="Username"
              required="true"
              onChange={(e) => changeVal(e, "uname")}
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

const Input = ({ id, itype, type, legend, onChange, required }) => {
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
            onChange={(e) => onChange(e, type, legend)}
            required
          />
        ) : (
          <input
            type={itype}
            class="form-control"
            id={id}
            onChange={(e) => onChange(e, type, legend)}
          />
        )}
      </div>
    </>
  )
}

export default CreateUser
