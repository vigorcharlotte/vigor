import React, { Component } from "react";
import { Container } from "../../components/Grid";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import Dialog from 'material-ui/Dialog'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton'
import SnackBar from 'material-ui/Snackbar'
import Card from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment'
import API from "../../utils/API.js"
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import {
  Step,
  Stepper,
  StepContent,
  StepButton
} from 'material-ui/Stepper'

class Appointments extends Component {


state = {
  appointments: [],
  confirmationModalOpen: false,
  validEmail: true,
  validPhone: true,
  firstName:"",
  lastName:"",
  date: "",
  stepIndex: 0,
  confirmationSnackbarOpen: false,
  apptType: "",
  pfdTherapist: "",
  smallScreen: window.innerWidth < 768,
  schedule: {}
}


handleFetch(response) {
  const initSchedule = {}
  const therapistArray= []
  const today = moment().startOf('day')
  initSchedule[today.format('YYYY-DD-MM')] = true
  //reduce applies a function against an accumulator and each element in the array
  //to reduce it to a single value. 
  if(response.length>0){
  response.forEach(function(appt, index){
    therapistArray.push(appt.pfdTherapist);
  })
}
console.log(response);
  const schedule = !response.length ? initSchedule : response.reduce((currentSchedule, appointment) => {
    const { date, slot} = appointment
    const dateString = moment(date, "YYYY-DD-MM").format('YYYY-DD-MM')
    console.log(date);
    console.log(moment(dateString).isValid())
    console.log(dateString);
    !currentSchedule[date]  ? currentSchedule[dateString] = Array(14).fill(false) : null;
    //!currentSchedule[date] ? currentSchedule[therapistArray] = Array(14).fill(false) : null
    Array.isArray(currentSchedule[dateString]) ?
      currentSchedule[dateString][slot] = true : null;
    return currentSchedule
  }, initSchedule)

  //Imperative x 100, but no regrets
  for (let day in schedule) {
    let slots = schedule[day]
    slots.length ? (slots.every(slot => slot === true)) ? schedule[day] = true : null : null
  }
  this.setState({
    schedule: schedule
  })
  console.log(this.state.schedule);
}

// componentWillMount(){
//   async.series({
//     appointments(callback){
//       API.getAllAppointments()
//       .then(res=> {console.log(res.data);
//       callback(null, res.data)
//     }
//     )}
//     }, (err,response)=>{
//       err? console.log(err) : this.handleFetch(response)
//     })
// }

  handleSubmit(event) {
   
    const appointment = {
      apptType: this.state.apptType,
      pfdTherapist: this.state.pfdTherapist,
      date: moment(this.state.appointmentDate).format('YYYY-DD-MM'),
      slot: this.state.appointmentSlot,
      name: this.state.firstName + ' ' + this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    }

    console.log(moment().hour(8).minute(0).add(this.state.appointmentSlot, 'hours').format('h:mm a'));
    console.log(appointment.date);

    API.saveAppointment(appointment)
    .then(response => 
      {
        //send text message to users number using Twilio
        
        this.setState({ confirmationSnackbarMessage: "Appointment succesfully added!", confirmationModalOpen: false, confirmationSnackbarOpen: true, processed: true })
      }
    )
    .catch(err => {
      console.log(err)
      return this.setState({ confirmationSnackbarMessage: "Appointment failed to save.", confirmationModalOpen: false, confirmationSnackbarOpen: true })
    })
  }

  
  handleNavToggle() {
    return this.setState({ navOpen: !this.state.navOpen })
  }

  handleNextStep() {
    const { stepIndex } = this.state
    return (stepIndex < 5) ? this.setState({ stepIndex: stepIndex + 1}) : null
  }

  handleSetAppointmentDate(date) {
    this.handleNextStep();
    this.setState({ appointmentDate: date, confirmationTextVisible: true })
    console.log(this.state.appointmentDate);
  }

  handleSetAppointmentSlot(slot) {
    this.handleNextStep();
    this.setState({ appointmentSlot: slot })
  }

  handleSetAppointmentMeridiem(meridiem) {
    this.setState({ appointmentMeridiem: meridiem})
  }
  handleFetchError(err) {
    console.log(err)
    this.setState({ confirmationSnackbarMessage: 'Error fetching data', confirmationSnackbarOpen: true })
  }


  validateEmail(email) {
    const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i
    return regex.test(email) ? this.setState({ email: email, validEmail: true }) : this.setState({ validEmail: false })
  }

  validatePhone(phoneNumber) {
    const regex = /^(1\s|1|)?((\(\d{3}\))|\d{3})(-|\s)?(\d{3})(-|\s)?(\d{4})$/;
    return regex.test(phoneNumber) ? this.setState({ phone: phoneNumber, validPhone: true }) : this.setState({ validPhone: false })
  }
  checkDisableDate(day) {
    const dateString = moment(day).format('YYYY-DD-MM')
    return this.state.schedule[dateString] === true || moment(day).startOf('day').diff(moment().startOf('day')) < 0
  }

  checkPfdTherapistSchedule(therapist){
     
      API.findByTherapist({pfdTherapist: therapist})
      .then(res=>{this.handleFetch(res.data);
      })
      .catch(err=>console.log(err));
  }
  
  renderConfirmationString() {
    const spanStyle = {color: '#00bcd4'}
    return this.state.confirmationTextVisible ? <h2 style={{ textAlign: this.state.smallScreen ? 'center' : 'left', color: '#bdbdbd', lineHeight: 1.5, padding: '0 10px', fontFamily: 'Roboto'}}>
      { <span>
        Scheduling a

          <span style={spanStyle}> 1 hour </span>

        appointment {this.state.appointmentDate && <span>
          on <span style={spanStyle}>{moment(this.state.appointmentDate).format('dddd[,] MMMM Do')}</span>
      </span>} {Number.isInteger(this.state.appointmentSlot) && <span>at <span style={spanStyle}>{moment().hour(8).minute(0).add(this.state.appointmentSlot, 'hours').format('h:mm a')}</span></span>}
      </span>}
    </h2> : null
  }

  renderAppointmentTimes() {
    console.log(moment(this.state.appointmentDate).format('YYYY-DD-MM'));
    if (!this.state.loading) {
      const slots = [...Array(14).keys()]
      return slots.map(slot => {
        //map creates a new array with the results of calling a provided function on every element in the calling array
        const appointmentDateString = moment(this.state.appointmentDate).format('YYYY-DD-MM')
        const t1 = moment().hour(8).minute(0).add(slot, 'hours')
        const t2 = moment().hour(8).minute(0).add(slot + 1, 'hours')
        const scheduleDisabled = this.state.schedule[appointmentDateString] ? this.state.schedule[moment(this.state.appointmentDate).format('YYYY-DD-MM')][slot] : false
        const meridiemDisabled = this.state.appointmentMeridiem ? t1.format('a') === 'am' : t1.format('a') === 'pm'
        return <RadioButton
          label={t1.format('h:mm a') + ' - ' + t2.format('h:mm a')}
          key={slot}
          value={slot}
          style={{marginBottom: 15, display: meridiemDisabled ? 'none' : 'inherit'}}
          disabled={scheduleDisabled || meridiemDisabled}/>
      })
    } else {
      return null
    }
  }

  renderAppointmentConfirmation() {
    const spanStyle = { color: '#00bcd4' }
    return <section>
      <p>Appointment Type: <span style={spanStyle}>{this.state.apptType}</span></p>
      <p>Preferred Therapist: <span style={spanStyle}>{this.state.pfdTherapist}</span></p>
      <p>Name: <span style={spanStyle}>{this.state.firstName} {this.state.lastName}</span></p>
      <p>Number: <span style={spanStyle}>{this.state.phone}</span></p>
      <p>Email: <span style={spanStyle}>{this.state.email}</span></p>
      <p>Appointment: <span style={spanStyle}>{moment(this.state.appointmentDate).format('dddd[,] MMMM Do[,] YYYY')}</span> at <span style={spanStyle}>{moment().hour(8).minute(0).add(this.state.appointmentSlot, 'hours').format('h:mm a')}</span> </p>
    </section>//moment(this.state.slot).format('h:mm a')
  }
  
  resize() {
    this.setState({ smallScreen: window.innerWidth < 768 })
  }

  render() {
    const {loading, stepIndex, pfdTherapist, confirmationModalOpen, smallScreen, ...data} = this.state
    const contactFormFilled = this.state.apptType && this.state.pfdTherapist && this.state.firstName && 
    this.state.lastName && this.state.phone && this.state.email && this.state.validPhone && 
    this.state.validEmail

    const modalActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={() => this.setState({ confirmationModalOpen : false})} />,
      <FlatButton
        label="Confirm"
        primary={true}
        onClick={() => this.handleSubmit()} />
    ]
    let therapist= ["Carrie", "Judge", "Steven"]
    return (
     
      <Container fluid>
        <Nav />
        <main className="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
        <Header>
          <h1 className="float-left text-center text-md-left header">Appointments</h1>
        </Header>
        <section>
          <div class="card mb-4">
            <div class="card-block">
            <h3 class="card-title">Make an Appointment</h3>
            <Card style={{
              padding: '10px 10px 25px 10px',
              height: smallScreen ? '100vh' : null
              }}>
            <Stepper
              activeStep={stepIndex}
              linear={false}
              orientation="vertical">
              
              <Step disabled={loading}>
              <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
                  Choose a type of appointment
              </StepButton>
              <StepContent>
              <SelectField
                      style={{
                        marginLeft: 10
                      }}
                      floatingLabelText="Select Type"
                      value={this.state.apptType}
                      onChange={(event, index, value) =>{
                        this.handleNextStep()
                        this.setState({apptType:value})}}>
                      <MenuItem value={"Massage Therapy"} primaryText="Massage Therapy" />
                      <MenuItem value={"Personal Training"} primaryText="Personal Training" />
                      <MenuItem value={"Movement Education"} primaryText="Movement Education" />
                      <MenuItem value={"Clinical Bodywork"} primaryText="Clinical Bodywork" />
                      <MenuItem value={"Cardio Training"} primaryText="Cardio Training" />
                      
                      </SelectField>
                </StepContent>
                </Step>
                <Step disabled={!this.state.apptType}>
              <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
                  Choose a Preferred Therapist
              </StepButton>
              <StepContent>
              <SelectField
                      style={{
                        marginLeft: 10
                      }}
                      floatingLabelText="Select Therapist"
                      value={this.state.pfdTherapist}
                      onChange={(event, index, value) =>{
                        this.handleNextStep()
                        this.setState({pfdTherapist:value})
                        this.checkPfdTherapistSchedule(value)}}>
                      <MenuItem value={therapist[0]} primaryText={therapist[0]} />
                      <MenuItem value={therapist[1]} primaryText={therapist[1]} />
                      <MenuItem value={therapist[2]} primaryText={therapist[2]} />
                   
                      
              </SelectField>
              </StepContent>
             </Step>
              <Step disabled={!this.state.pfdTherapist}>
                <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
                  Choose an available day for your appointment
                </StepButton>
                <StepContent>       
                <DatePicker
                      style={{
                        marginTop: 10,
                        marginLeft: 10
                      }}
                      mode={data.smallScreen ? 'portrait' : 'landscape'}
                      value={data.appointmentDate}
                      hintText="Select a date"
                      onChange={(n, date) => this.handleSetAppointmentDate(date)}
                      shouldDisableDate={day =>this.checkDisableDate(day)}
                      />
                </StepContent>
              </Step>
              <Step disabled={ !data.appointmentDate }>
                <StepButton onClick={() => this.setState({ stepIndex: 3 })}>
                  Choose an available time for your appointment
                </StepButton>
                <StepContent>
                  <SelectField
                    floatingLabelText="AM or PM"
                    value={data.appointmentMeridiem}
                    onChange={(evt, key, payload) => this.handleSetAppointmentMeridiem(payload)}
                    selectionRenderer={value => value ? 'PM' : 'AM'}>
                    <MenuItem value={0}>AM</MenuItem>
                    <MenuItem value={1}>PM</MenuItem>
                  </SelectField>
                  <RadioButtonGroup
                    style={{ marginTop: 15,
                             marginLeft: 15
                           }}
                    name="appointmentTimes"
                    defaultSelected={data.appointmentSlot}
                    onChange={(evt, val) => this.handleSetAppointmentSlot(val)}>
                    {this.renderAppointmentTimes()}
                  </RadioButtonGroup>
                </StepContent>
              </Step>
              <Step disabled={ !Number.isInteger(this.state.appointmentSlot) }>
                <StepButton onClick={() => this.setState({ stepIndex: 4 })}>
                  Share your contact information with us and we'll send you a reminder
                </StepButton>
                <StepContent>
              <section>
                    <TextField
                      style={{ display: 'block' }}
                      name="first_name"
                      hintText="First Name"
                      floatingLabelText="First Name"
                      onChange={(evt, newValue) => this.setState({ firstName: newValue })}/>
                    <TextField
                      style={{ display: 'block' }}
                      name="last_name"
                      hintText="Last Name"
                      floatingLabelText="Last Name"
                      onChange={(evt, newValue) => this.setState({ lastName: newValue })}/>
                    <TextField
                      style={{ display: 'block' }}
                      name="email"
                      hintText="name@mail.com"
                      floatingLabelText="Email"
                      errorText={this.state.validEmail ? null : 'Enter a valid email address'}
                      onChange={(evt, newValue) => this.validateEmail(newValue)}/>
                    <TextField
                      style={{ display: 'block' }}
                      name="phone"
                      hintText="(888) 888-8888"
                      floatingLabelText="Phone"
                      errorText={this.state.validPhone ? null: 'Enter a valid phone number'}
                      onChange={(evt, newValue) => this.validatePhone(newValue)} />
                    <RaisedButton
                      style={{ display: 'block', marginTop: 20, maxWidth: 100}}
                      label={contactFormFilled ? 'Schedule' : 'Fill out your information to schedule'}
                      labelPosition="before"
                      primary={true}
                      fullWidth={true}
                      onClick={() => this.setState({ confirmationModalOpen: !this.state.confirmationModalOpen })}
                      disabled={!contactFormFilled}
                       />
                  </section>
                </StepContent>
              </Step>
            </Stepper>
          </Card>
          <Dialog
            modal={true}
            open={this.state.confirmationModalOpen}
            actions={modalActions}
            title="Confirm your appointment">
            {this.renderAppointmentConfirmation()}
          </Dialog>

          <SnackBar
            open={this.state.confirmationSnackbarOpen}
            message={this.state.confirmationSnackbarMessage || ''}
            autoHideDuration={10000}
            onRequestClose={() => this.setState({ confirmationSnackbarOpen: false })} />
              
            
        
                <div class="calendly-inline-widget" id="calendar" data-url="https://calendly.com/vigor">
                
                </div>

              <div id="calendar"></div>
            </div>
          </div>
        </section>
      </main>
    </Container>
    );
  }
}

export default Appointments;
