import React, { useState } from "react"
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
import SalaryDet from "../employee/SalaryDet"
import Profile from "../employee/Profile"

const Admin = () => {
  const [isAdmin] = useState(sessionStorage.getItem("isAdmin"))
  return (
    <>
      <Navbar employee={isAdmin == "true" ? "Admin" : "Employee"} />
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
                <Route path="/employee/applyLeave" >
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
                {/* <Route path="/employee/Profile">
                  <Profile />
                </Route> */}
              </Switch>
            </main>
          </div>
        </Router>
      </div>
    </>
  )
}

export default Admin
