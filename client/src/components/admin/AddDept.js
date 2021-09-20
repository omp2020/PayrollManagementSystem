import React, { useState } from "react"
import links from "../../links.json"
import Toast from "../Toast"
import checkIcon from "../../img/check.svg"
import errorIcon from "../../img/error.svg"
import axios from "axios"

const AddDept = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)
  const [list, setList] = useState([])
  let toastProperties = null
  const [showtoast, settoast] = useState(false)
  const id = Math.floor(Math.random() * 101 + 1)
  const [deptData, setDD] = useState({
    deptID: "",
    deptName: "",
  })

  const clearInputs = () => {
    document.getElementById("create-user").reset()
  }

  const addDept = () => {
    axios
      .get("/api/admin/createdept", {
        params: { data: deptData },
      })
      .then((result) => {
        if (result.data.error == "0") {
          clearInputs()
          toastProperties = {
            id,
            title: "Success",
            description: "Department Added Successfully",
            backgroundColor: "#5cb85c",
            icon: checkIcon,
          }
          setList([...list, toastProperties])
          settoast(true)
        } else {
          toastProperties = {
            id,
            title: "Danger",
            description: "Department was not added",
            backgroundColor: "#d9534f",
            icon: errorIcon,
          }
          setList([...list, toastProperties])
          settoast(true)
        }
      })
  }

  const changeVal = (e, field) => {
    let val = e.target.value
    switch (field) {
      case "deptID":
        setDD({ ...deptData, deptID: val })
        break
      case "deptName":
        setDD({ ...deptData, deptName: val })
        break
      default:
        break
    }
  }
  return (
    <>
      <div className="contnainer">
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
        <div className="h1 p-4">Add Department</div>
        <form class="p-4" id="create-user">
          <div class="form-group row">
            <Input
              id="deptID"
              itype="text"
              legend="Department ID"
              required="true"
              onChange={(e) => changeVal(e, "deptID")}
            />
            <Input
              id="deptName"
              itype="text"
              legend="Department Name"
              required="true"
              onChange={(e) => changeVal(e, "deptName")}
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
            onClick={() => addDept()}
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

export default AddDept
