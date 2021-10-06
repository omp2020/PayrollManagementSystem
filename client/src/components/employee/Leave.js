import React,{useState} from 'react';
import links from "../../links.json"
const Leave = () =>{
  const iL = sessionStorage.getItem("isLogin") ?? false
  iL || (window.location.href = links.login)
  const [Leave,setLeave] = useState({
    emp_id:"",
    leave:"",
    day:"",
    fromDate:"",
    toDate:"",
    Reason:""
  })
  const handleLeave = event =>{
    const name = event.target.name;
    const value = event.target.value;
    setLeave({
      ...Leave,
      [name]: value
    })
  }
  const handleSubmit = event =>{
      event.preventDefault();
      console.log(Leave)
  }
    return (
        <>
            <form style={{marginLeft:"200px"}} onSubmit={handleSubmit}>
              <h2 style={{marginTop:"10px"}}>Apply For Leave</h2>
              <br />
              
  <div className="form-row">
  <div className="col-auto my-1">
    
      
      <label className="mr-sm-2" for="inlineFormCustomSelect" style={{marginTop:"20px"}}>Leave Type</label>
      <select className="custom-select mr-sm-2" name="leave" id="inlineFormCustomSelect" onChange={handleLeave}>
        <option value = "Choose">Choose...</option>
        <option value="sick leave">Sick Leave</option>
        <option value="maternity leave">Maternity Leave</option>
        <option value="optional leave">Personal</option>
        <option value="vacation leave">Vacation</option>
        <option value="privilege leave">Privilege</option>
      </select>
    </div>
    
    <div className="col-auto my-1">
      
      <label className="mr-sm-2" for="inlineFormCustomSelect" style={{marginTop:"20px"}}>Day Type</label>
      <select className="custom-select mr-sm-2" name="day" id="inlineFormCustomSelect" onChange={handleLeave}>
        <option value="choose">Choose...</option>
        <option value="full">Full</option>
        <option value="First Half">First Half</option>
        <option value="Second Half">Second Half</option>
      </select>
    </div>
  </div>
  <div className="form-group">
    <br />
    <label for="date">FROM</label>
    <input type="date" name="fromDate" className="form-control" style={{width:"200px"}} onChange={handleLeave}/>
  </div>
  <div className="form-group" >
    <label for="date">TO</label>
    <input type="date" name="toDate" className="form-control" style={{width:"200px"}} onChange={handleLeave}/>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <h4>Reason</h4>
      <textarea name="Reason"  cols="50" rows="07" style={{width:"500px"}} onChange={handleLeave}></textarea>
    </div>
    
  </div>
  
  <button type="submit" className="btn btn-primary">Apply Leave</button>
  <button type="submit" className="btn btn-primary" style={{marginLeft:"30px"}}>Cancel</button>
</form>
        </>
    )
}
export default Leave;