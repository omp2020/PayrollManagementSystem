import React,{useState} from 'react';
import Sidebar from './components/css/sidebar.css';
const Leave = () =>{
  const [Leave,setLeave] = useState({
    leave:"",
    day:"",
    fromDate:"",
    toDate:"",
    reason:""
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
            <form style={{marginLeft:"450px"}} onSubmit={handleSubmit}>
              <h2 style={{marginTop:"50px"}}>Apply For Leave</h2>
  <div className="form-row">
  <div className="col-auto my-1">
    <br />
      <label className="mr-sm-2" for="inlineFormCustomSelect">Leave Type</label>
      <select className="custom-select mr-sm-2" name="leave" id="inlineFormCustomSelect" onChange={handleLeave}>
        <option value = "Choose">Choose...</option>
        <option value="sick leave">Sick Leave</option>
        <option value="maternity leave">Maternity Leave</option>
        <option value="optional">Personal</option>
        <option value="sick leave">Vacation</option>
        <option value="sick leave">Privilege</option>
      </select>
    </div>
    <div className="col-auto my-1">
      <br />
      <label className="mr-sm-2" for="inlineFormCustomSelect">Day Type</label>
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