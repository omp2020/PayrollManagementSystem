import React, { useState } from "react"
import Toast from "./Toast"
import links from "../links.json"
import axios from "axios"
import checkIcon from "../img/check.svg"
import errorIcon from "../img/error.svg"

const ChangePassword = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)
  const [list, setList] = useState([])
  let toastProperties = null
  const [showtoast, settoast] = useState(false)
  const id = Math.floor(Math.random() * 101 + 1)
  const [passData, setPassData] = useState({
    oldPass: "",
    newPass: "",
    cnfnewPass: "",
    empID: sessionStorage.getItem("ID"),
  })

  const clearInputs = () => {
    document.getElementById("changePassword").reset()
  }

  const updatePass = () => {
    if (passData.cnfnewPass != passData.newPass) {
      toastProperties = {
        id,
        title: "Danger",
        description: "Confirm and New Password Doesn't Match",
        backgroundColor: "#d9534f",
        icon: errorIcon,
      }
      setList([...list, toastProperties])
      settoast(true)
    } else {
      axios
        .get("/changePass", {
          params: {
            id: passData.empID,
            old: passData.oldPass,
            new: passData.newPass,
          },
        })
        .then((result) => {
          if (result.data.error == "0") {
            clearInputs()
            toastProperties = {
              id,
              title: "Success",
              description: "Password Changed Successfully",
              backgroundColor: "#5cb85c",
              icon: checkIcon,
            }
            setList([...list, toastProperties])
            settoast(true)
          } else {
            toastProperties = {
              id,
              title: "Danger",
              description: "Error in Changing Password",
              backgroundColor: "#d9534f",
              icon: errorIcon,
            }
            setList([...list, toastProperties])
            settoast(true)
          }
        })
    }
  }

  const changeVal = (e, field) => {
    let val = e.target.value
    switch (field) {
      case "oldPass":
        setPassData({ ...passData, oldPass: val })
        break
      case "newPass":
        setPassData({ ...passData, newPass: val })
        break
      case "cnfnewPass":
        setPassData({ ...passData, cnfnewPass: val })
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
        <div className="h1 p-4">Change Password</div>
        <form class="p-4" id="changePassword">
          <div class="form-group row">
            <Input
              id="oldPass"
              itype="text"
              legend="Old Password"
              required="true"
              onChange={(e) => changeVal(e, "oldPass")}
            />
            <Input
              id="newPass"
              itype="text"
              legend="New Password"
              required="true"
              onChange={(e) => changeVal(e, "newPass")}
            />
          </div>
          <div class="form-group row">
            <Input
              id="cnfnewPass"
              itype="text"
              legend="Confirm New Password"
              required="true"
              onChange={(e) => changeVal(e, "cnfnewPass")}
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
            onClick={() => updatePass()}
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
export default ChangePassword
