import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Axios from "axios"
import links from "../../links.json"


const Profile = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [userData, setUD] = useState({})

  useEffect(() => {
    Axios.get("/api/employee/eDet", {
      params: { id: sessionStorage.getItem("ID") },
    }).then((result) => {
      result.data.DOB = result.data.DOB.split("T")[0]
      result.data.Hire_Date = result.data.Hire_Date.split("T")[0]
      setUD(result.data)
    })
  }, [])
  return (
    <>
      <div className="contnainer">
        <div className="h1 p-4">Profile Page</div>
        <form class="p-4" id="create-user">
          <div class="form-group row">
            <Input
              
              id="empID"
              data={userData.Employee_Id}
              itype="text"
              legend="Employee ID"
            />
            <Input
              id="MobileNo"
              data={userData.Mobile_No}
              itype="text"
              legend="Mobile No."
            />
          </div>
          <div class="form-group row">
            <Input
              id="fname"
              data={userData.First_Name}
              itype="text"
              legend="First Name"
            />
            <Input
              id="lname"
              data={userData.Last_Name}
              itype="text"
              legend="Last Name"
            />
          </div>
          <div class="form-group row">
            <Input
              id="dob"
              data={userData.DOB}
              itype="date"
              legend="Date of Birth"
            />
            <Input
              id="designation"
              data={userData.Designation}
              itype="text"
              legend="Designation"
            />
          </div>
          <div class="form-group row">
            <Input id="city" data={userData.City} itype="text" legend="City" />
            <Input
              id="state"
              data={userData.State}
              itype="text"
              legend="State"
            />
          </div>
          <div class="form-group row">
            <Input
              id="hdate"
              data={userData.Hire_Date}
              itype="date"
              legend="Hire Date"
            />
            <Input
              id="dept"
              data={userData.Department_ID}
              itype="text"
              legend="Department"
            />
          </div>
        </form>
      </div>
    </>
  )
}


const Input = ({ id, data, itype, legend }) => {
  return (
    <>
      <label for={id} class="col-sm-2 col-form-label">
        {legend}
      </label>
      <div class="col-sm-4">
        <input
          type={itype}
          class="form-control"
          id={id}
          value={data}
          disabled
        />
      </div>
    </>
  )
}
export default Profile
