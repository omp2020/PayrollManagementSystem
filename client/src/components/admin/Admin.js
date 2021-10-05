import React, { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import "../../css/admin.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AdminMain from "./AdminMain"
import EmployeeMain from "../employee/EmployeeMain"
import Leave from "../employee/Leave"
import Members from "./Members"
import AccRejLeave from "./AccRejLeave"
import Salary from "./Salary"
import Services from "./Services"
import Accounts from "./Accounts"
import Navbar from "./Navbar"
import CreateUser from "./CreateUser"
import AddDept from "./AddDept"
<<<<<<< HEAD
<<<<<<< HEAD
import EmpDetails from "../employee/Employee_details"
import Department from "./Department"
=======
// import Profile from "../employee/Profile"
>>>>>>> 865a232e4771cd1000a1d5a7115bc208098c3cba
=======
import SalaryDet from "../employee/SalaryDet"
import Profile from "../employee/Profile"
import EmpDetails from "../employee/Employee_details"
import Department from "./Department"
import axios from "axios"
import ChangePassword from "../ChangePassword"
>>>>>>> 581f562f181c0bf26b4090a465a58fb1f9b3716a

const Admin = () => {
  const [isAdmin] = useState(sessionStorage.getItem("isAdmin"))
  const [name, setName] = useState()
  useEffect(() => {
    console.log(sessionStorage.getItem("ID"))
    axios
      .get("/getName", { params: { id: sessionStorage.getItem("ID") } })
      .then((result) => {
        setName(result.data.name)
      })
  }, [])
  return (
    <>
      <Navbar
        employee={isAdmin == "true" ? "Admin" : "Employee"}
        empname={name}
      />
      <div className="container-fluid" style={{ backgroundColor: "white" }}>
        <Router>
          <div className="row">
            <Sidebar isAdmin={isAdmin} />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <Switch>
                <Route path="/admin" exact>
                  <AdminMain />
                </Route>
                <Route path="/employee" exact>
                  <EmployeeMain />
                </Route>
                <Route path="/changePassword">
                  <ChangePassword />
                </Route>
                <Route path="/employee/applyLeave">
                  <Leave />
                </Route>
                <Route path="/employee/Profile" >
                  <Profile />
                </Route>
                <Route path="/employee/SalaryDet" >
                  <SalaryDet />
                </Route>
                <Route path="/admin/createUser">
                  <CreateUser />
                </Route>
                <Route path="/admin/addDept">
                  <AddDept />
                </Route>
                <Route path="/admin/members">
                  <Members />
                </Route>
                <Route path="/admin/AccRejLeave">
                  <AccRejLeave />
                </Route>
                <Route path="/admin/Salary">
                  <Salary />
                </Route>
                <Route path="/admin/services">
                  <Services />
                </Route>
                <Route path="/admin/accounts">
                  <Accounts />
                </Route>
<<<<<<< HEAD
                <Route path="/emp/details">
                  <EmpDetails />
                </Route>
                <Route path="/admin/department">
                  <EmpDetails />
                </Route>
=======
                {/* <Route path="/employee/Profile">
                  <Profile />
                </Route> */}
>>>>>>> 865a232e4771cd1000a1d5a7115bc208098c3cba
              </Switch>
            </main>
          </div>
        </Router>
      </div>
    </>
  )
}

export default Admin
