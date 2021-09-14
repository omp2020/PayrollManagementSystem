import React from "react"
import Sidebar from "./Sidebar"
import "../../css/admin.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AdminMain from "./AdminMain"
import Members from "./Members"
import Services from "./Services"
import Accounts from "./Accounts"
import Navbar from "./Navbar"

const Admin = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid" style={{ backgroundColor: "white" }}>
        <Router>
          <div className="row">
            <Sidebar />
            {/* <Navbar /> */}
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <Switch>
                <Route path="/admin" exact>
                  <AdminMain />
                </Route>
                <Route path="/admin/members">
                  <Members />
                </Route>
                <Route path="/admin/services">
                  <Services />
                </Route>
                <Route path="/admin/accounts">
                  <Accounts />
                </Route>
              </Switch>
            </main>
          </div>
        </Router>
      </div>
    </>
  )
}

export default Admin
