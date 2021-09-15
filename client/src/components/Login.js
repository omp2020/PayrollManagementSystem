import React, { useState } from "react"
import "../css/login.css"
import Field from "./Field"
import { Redirect } from "react-router-dom"
import axios from "axios"

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

  const makeLogin = () => {
    axios
      .get("/login", {
        params: { username: loginData.username, password: loginData.password },
      })
      .then((result) => {
        console.log(result.data.error)
        if (result.data.error == "0") {
          sessionStorage.setItem("isLogin", true)
          setLogin(true)
        } else {
          setError({
            status: true,
            value: "Username/Password Invalid",
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
                <b className="h4">DBMS Project</b>
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

                {isLogin ? <Redirect to="/admin" /> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
