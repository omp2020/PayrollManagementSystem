import React, { useState } from "react"
import "../css/login.css"
import Field from "./Field"
import { Redirect } from "react-router-dom"
import axios from "axios"
import wpuLogo from "../img/wpu-logo.png"

const Login = () => {
  const [loginData, setLD] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState()

  const changeVal = (e, field) => {
    let val = e.target.value
    switch (field) {
      case "username":
        setLD({ ...loginData, username: val })
        break
      case "password":
        setLD({ ...loginData, password: val })
        break
      default:
        break
    }
  }

  const [isLogin, setLogin] = useState(false)
  const [isAdmin, setAdmin] = useState()

  const makeLogin = () => {
    axios
      .get("/login", {
        params: { username: loginData.username, password: loginData.password },
      })
      .then((result) => {
        if (result.data.error == "0" && result.data.isadmin == "1") {
          sessionStorage.setItem("isLogin", true)
          sessionStorage.setItem("isAdmin", true)
          sessionStorage.setItem("ID", result.data.id)
          setAdmin(true)
          setLogin(true)
        } else if (result.data.error == "0") {
          sessionStorage.setItem("isLogin", true)
          sessionStorage.setItem("isAdmin", false)
          sessionStorage.setItem("ID", result.data.id)
          setAdmin(false)
          setLogin(true)
        } else {
          setError({
            status: true,
            value: result.data.errormsg,
          })
        }
      })
  }

  return (
    <>
      <div className="container mt-5 h-100">
        <div className="row align-self-center h-100">
          {error ? (
            <div
              class="alert alert-danger alert-dismissible fade show align-content-center offset-sm-5"
              role="alert"
            >
              <strong>{error.value}</strong>
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <div className="card h-100 card-primary justify-content-center">
              <div className="login-brand align-self-center p-3">
                <center>
                  <img src={wpuLogo} alt="MIT World Peace University" />
                </center>
                <br />
                <b className="h4">Payroll Management System</b>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <Field
                    legend="Username"
                    itype="text"
                    type="login"
                    onChange={(e) => changeVal(e, "username")}
                    name="username"
                  />
                  <Field
                    legend="Password"
                    itype="password"
                    type="login"
                    onChange={(e) => changeVal(e, "password")}
                    name="password"
                  />
                </div>

                <button className="btn btn-primary" onClick={() => makeLogin()}>
                  Login
                </button>

                {isLogin && isAdmin ? <Redirect to="/admin" /> : ""}
                {isLogin && !isAdmin ? <Redirect to="/employee" /> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
