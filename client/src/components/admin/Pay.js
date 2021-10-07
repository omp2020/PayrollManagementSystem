import React, { useState, useEffect } from "react"
import "../../css/members.css"
import Axios from "axios"
import links from "../../links.json"
import Toast from "../Toast"
import checkIcon from "../../img/check.svg"
import errorIcon from "../../img/error.svg"
import ReactLoading from "react-loading"

const Pay = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    Axios.get("/api/admin/listpay", {})
      .then((res) => {
        console.log(res)
        setSData(res.data)
        setLoader(false)
      })
      .catch((err) => console.log("Error", err))
  }, [])
  const [SData, setSData] = useState([])

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center">
          {loader ? (
            <ReactLoading type="bars" color="black" height={55} width={90} />
          ) : (
            ""
          )}
        </div>
        <div className="h1 p-4">Pay Employee</div>

        <div className="members">
          <table id="members" className="table">
            <thead className="thead-light">
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Salary</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {SData.map((t) => (
                <TableData key={t.Salary_Id} mem={t} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

const TableData = ({ mem }) => {
  let [d, setData] = useState(mem)
  const [list, setList] = useState([])
  let toastProperties = null
  const [showtoast, settoast] = useState(false)
  const id = Math.floor(Math.random() * 101 + 1)
  const handleEdit = () => {
    console.log(d)
    Axios.get("/api/admin/payroll", { params: { id: d.Employee_Id } }).then(
      (result) => {
        if (result.data.error == "0") {
          toastProperties = {
            id,
            title: "Success",
            description: "Payment Success",
            backgroundColor: "#5cb85c",
            icon: checkIcon,
          }
          setList([...list, toastProperties])
          settoast(true)
        } else {
          toastProperties = {
            id,
            title: "Danger",
            description: "Failed",
            backgroundColor: "#d9534f",
            icon: errorIcon,
          }
          setList([...list, toastProperties])
          settoast(true)
        }
      }
    )
  }

  return (
    <>
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
      <tr>
        <td>{d.Employee_Id}</td>
        <td>{d.first_name}</td>
        <td>{d.last_name}</td>
        <td>{d.salary}</td>
        <td>
          <button
            type="button"
            class="btn btn-success btn-sm"
            data-toggle="modal"
            data-target="#Edit"
            onClick={() => {
              handleEdit()
            }}
          >
            Pay
          </button>
        </td>
      </tr>
    </>
  )
}

export default Pay
