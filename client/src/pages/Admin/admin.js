import React, {Component} from 'react'
import API from "../../utils/API.js"
import moment from "moment"
import "./admin.css"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class Admin extends Component {
    state={
        contactRequests: [],
        appointments: [],
        therapistName: "",
        therapistAppts: []
    }
    
    //get all customer contact requests
    loadRequests=()=>{
        API.getAllRequests()
        .then(res=>{
            this.setState({contactRequests:res.data}); 
        })
    }
    deleteContactRequest=(id)=>{
        console.log(id);
        API.deleteRequest(id)
        .then(res=>this.loadRequests())
        .catch(err=>console.log(err));
    };

    loadAppointments=()=>{
        API.getAllAppointments()
        .then(res=>{
            this.setState({appointments:res.data}); 
        })
    }

    loadTherapistAppts=()=>{
        API.findByTherapist({pfdTherapist: this.state.therapistName})
        .then(res=>{
            if(!res.data){
                this.setState({therapistAppts: []})
            }
            this.setState({therapistAppts: res.data});
        })
    }
    deleteAppointment=(id)=>{
        console.log(id);
        API.deleteAppointment(id)
        .then(res=>this.loadTherapistAppts(this.state.therapistName))
        .catch(err=>console.log(err));
    };
  
    render(){
        let therapist= ["Carrie", "Judge", "Steven"]
    return(
        <div className="admin" style= {{backgroundColor:"white"}}>
        <h3>Protected</h3>
        <div className="row">
            <div className = "col-md-6">
            <RaisedButton label="Get Contact Requests" onClick={this.loadRequests}/>
        {this.state.contactRequests.length ? (
            <div>
            {this.state.contactRequests.map((request, key)=>
            <ul key = {request._id}>
            <button onClick={()=>this.deleteContactRequest(request._id)}>Delete</button>
            <li>Name: {request.name}</li>
            <li>Email: {request.email}</li>
            <li>Message: {request.message}</li>
                </ul>
                )}
            </div>
            ):(
                <div>
                <br></br>
                <p style={{color:"grey"}}>No Requests</p>
                </div>
            )}
        </div>
        <div className = "col-md-6">
        <SelectField
            style={{
            marginLeft: 10
            }}
            floatingLabelText="Select Therapist"
            value={this.state.therapistName}
            onChange={(event, index, value) =>{
            this.setState({therapistName:value})}}>
            <MenuItem value={therapist[0]} primaryText={therapist[0]} />
            <MenuItem value={therapist[1]} primaryText={therapist[1]} />
            <MenuItem value={therapist[2]} primaryText={therapist[2]} />
                            
        </SelectField>
        <br></br>
        <RaisedButton label="Get Appointments " onClick={this.loadTherapistAppts}/>
        {this.state.therapistAppts.length ? (
            <div >
            {this.state.therapistAppts.map((appt, key)=>
            <div style={{marginTop: "10px", borderRadius: "5px", border: "1px solid rgb(0, 10, 20)"}}>
            <ul key = {appt._id}>
            <RaisedButton label="Delete" onClick={()=>this.deleteAppointment(appt._id)} />
            <li>Appointment Type: {appt.apptType}</li>
            <li>Preferred Therapist: {appt.pfdTherapist}</li>
            <li>Name: {appt.name}</li>
            <li>Email: {appt.email}</li>
            <li>Phone: {appt.phone}</li>
            {/* moment(this.state.appointmentDate).format('dddd[,] MMMM Do[,] YYYY') */}
            <li>Date: {moment(appt.date,'YYYY-DD-MM').format('dddd[,] MMMM Do[,] YYYY')}</li>
            <li>Time: {moment().hour(8).minute(0).add(appt.slot, 'hours').format('h:mm a')}</li>
                </ul>
            </div>
                )}
            </div>
            ) : (<div>
                <br></br>
                <p style={{color:"grey"}}>No Appointments</p>
                </div>
            )}

            </div>
        </div>
        </div>
            )
        }
        }
        export default Admin