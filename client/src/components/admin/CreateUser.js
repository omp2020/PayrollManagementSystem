import React from "react"

const CreateUser = () => {
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)

  return (
    <>
      <div className="contnainer">
        <div className="h1 p-4">Create User</div>
        <div className="row"></div>
      </div>
    </>
  )
}

export default CreateUser
