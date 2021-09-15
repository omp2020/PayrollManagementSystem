import React, { useState } from "react"

const Modal = ({ data, type, from, changeVal, handleSave, handleDelete }) => {
  let [d, setData] = useState(data)

  const handleClose = (f) => {
    if (f === "members") {
      setData({
        memberID: "",
        flat: "",
        owner: "",
        contact: "",
        parking: "",
        status: "",
      })
    } else if (f === "Services") {
      setData({ name: "", contact: "", designation: "" })
    } else if (f === "Account") {
      setData({ TransId: "", DateTime: "", Mode: "", Amount: "", Remark: "" })
    }
  }

  return (
    <>
      {type === "addnew" ? (
        from === "members" ? (
          <div
            class="modal fade"
            id="Members_New"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Enter New Data
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleClose(from)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col">
                      <label for="Name" class="form-label">
                        Owner
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder={d.owner}
                        maxLength="50"
                        onChange={(e) => {
                          changeVal(e, "Name", type, from)
                        }}
                      />
                    </div>
                    <div class="col">
                      <label for="Wing" class="form-label">
                        Wing
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        maxLength="3"
                        placeholder={d.wing}
                        onChange={(e) => changeVal(e, "Wing", type, from)}
                      />
                    </div>
                    <div class="col">
                      <label for="Flat" class="form-label">
                        Flat
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder={d.flat}
                        onChange={(e) => changeVal(e, "Flat", type, from)}
                      />
                    </div>
                    <div class="col">
                      <label for="Contact" class="form-label">
                        Contact
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder={d.contact}
                        maxLength="13"
                        onChange={(e) => {
                          changeVal(e, "Contact", type, from)
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label for="Parking" class="form-label">
                        Parking
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder={d.parking}
                        maxLength="10"
                        onChange={(e) => {
                          changeVal(e, "Parking", type, from)
                        }}
                      />
                    </div>
                    <div className="col">
                      <label for="Status" class="form-label">
                        Status
                      </label>
                      <select
                        class="form-control"
                        type="sel1"
                        onChange={(e) => {
                          changeVal(e, "sel1", type, from)
                        }}
                      >
                        <option placeholder="1">Rented</option>
                        <option placeholder="2">Self</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => handleSave(from, type)}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : from === "Account" ? (
          <div
            class="modal fade"
            id="Account_New"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Enter New Transaction
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleClose(from)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div className="col">
                      <label for="Mode" class="form-label">
                        Mode
                      </label>
                      <select
                        class="form-control"
                        type="sel1"
                        onChange={(e) => {
                          changeVal(e, "sel1", type, from)
                        }}
                      >
                        <option placeholder="1">Credit</option>
                        <option placeholder="2">Debit</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label for="Amount" class="form-label">
                        Amount
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="Amount"
                        onChange={(e) => {
                          changeVal(e, "Amount", type, from)
                        }}
                      />
                    </div>
                    <div className="col">
                      <label for="Remark" class="form-label">
                        Remark
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="Remark"
                        maxLength="150"
                        onChange={(e) => {
                          changeVal(e, "Remark", type, from)
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => {
                      handleSave(from, type)
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            class="modal fade"
            id="Service_New"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Enter New Service Member
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleClose(from)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col">
                      <label for="Name" class="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        maxlength="100"
                        id="Name"
                        placeholder={d.name}
                        onChange={(e) => {
                          changeVal(e, "Name", type, from)
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label for="Designation" class="form-label">
                        Designation
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="Designation"
                        maxlength="30"
                        placeholder={d.designation}
                        onChange={(e) => {
                          changeVal(e, "Desig", type, from)
                        }}
                      />
                    </div>
                    <div className="col">
                      <label for="Contact" class="form-label">
                        Contact
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="Contact"
                        maxlength="13"
                        placeholder={d.contact}
                        onChange={(e) => {
                          changeVal(e, "Contact", type, from)
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => handleSave(from, type)}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        ""
      )}
      {from === "members" ? (
        type === "edit" ? (
          <div
            class="modal fade"
            id="Edit"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edit data for {d.owner}
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleClose(from)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col">
                      <label for="Name" class="form-label">
                        Owner
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="Name"
                        maxlength="50"
                        placeholder={d.owner}
                        onChange={(e) => {
                          changeVal(e, "Name", type, from)
                        }}
                      />
                    </div>
                    <div class="col">
                      <label for="Wing" class="form-label">
                        Wing
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="Wing"
                        maxlength="3"
                        placeholder={d.wing}
                        onChange={(e) => {
                          changeVal(e, "Flat", type, from)
                        }}
                      />
                    </div>
                    <div class="col">
                      <label for="Flat" class="form-label">
                        Flat
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="Flat"
                        placeholder={d.flat_no}
                        onChange={(e) => {
                          changeVal(e, "Flat", type, from)
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div class="col">
                      <label for="Contact" class="form-label">
                        Contact
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="Contact"
                        maxlength="13"
                        placeholder={d.contact}
                        onChange={(e) => {
                          changeVal(e, "Contact", type, from)
                        }}
                      />
                    </div>
                    <div className="col">
                      <label for="Parking" class="form-label">
                        Parking
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="Parking"
                        maxlength="10"
                        placeholder={d.parking}
                        onChange={(e) => {
                          changeVal(e, "Parking", type, from)
                        }}
                      />
                    </div>
                    <div className="col">
                      <label for="Status" class="form-label">
                        Status
                      </label>
                      <select
                        class="form-control"
                        id="sel1"
                        onChange={(e) => {
                          changeVal(e, "sel1", type, from)
                        }}
                      >
                        <option>Rented</option>
                        <option>Self</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => {
                      handleSave(from, type)
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            class="modal fade"
            id="Delete"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Delete data for {d.owner}
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleClose(from)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Are you sure you want to delete this user?
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => {
                      handleDelete(from, type)
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      ) : type === "edit" ? (
        <div
          class="modal fade"
          id="Services_Edit"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit data for {d.name}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleClose(from)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col">
                    <label for="Name" class="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="Name"
                      maxlength="100"
                      placeholder={d.name}
                      onChange={(e) => {
                        changeVal(e, "Name", type, from)
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label for="Designation" class="form-label">
                      Designation
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="Designation"
                      maxlength="30"
                      placeholder={d.designation}
                      onChange={(e) => {
                        changeVal(e, "Desig", type, from)
                      }}
                    />
                  </div>
                  <div className="col">
                    <label for="Contact" class="form-label">
                      Contact
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="Contact"
                      maxlength="13"
                      placeholder={d.contact}
                      onChange={(e) => {
                        changeVal(e, "Contact", type, from)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => handleSave(from, type)}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          class="modal fade"
          id="Services_Delete"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Delete data for {d.name}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleClose(from)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Are you sure you want to delete this user?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => {
                    handleDelete(from, type)
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {from === "Account" ? (
        type === "delete" ? (
          <div
            class="modal fade"
            id="Account_Delete"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Delete data for TransactionID: {d.id}
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleClose(from)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  Are you sure you want to delete this user?
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => {
                      handleDelete(from, type)
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  )
}

export default Modal
