
import React, { Component } from "react";
import { Container } from "../../components/Grid";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import {orange500, blue500} from 'material-ui/styles/colors';
import API from "../../utils/API.js"

class Contact extends Component {
  state = {
    appointments: [],
    confirmationModalOpen: false,
    validEmail: false,
    validMessage: false,
    name:"",
    email: "",
    message: "",
    confirmationSnackbarOpen: false
  }
  handleContactRequest =() =>{
  const requestObj = {
    name: this.state.name,
    email: this.state.email,
    message: this.state.message
  };
  API.saveRequest(requestObj)
  .then(res => {
    this.setState({ confirmationModalOpen: !this.state.confirmationModalOpen})
    
  })
  .catch(err=>console.log(err));
 
  }

  validateEmail(email) {
    const regex = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i
    return regex.test(email) ? this.setState({ email: email, validEmail: true }) : this.setState({ validEmail: false })
  }

  validateMessage(Message) {
    
    return Message.length > 0 ? this.setState({ message: Message, validMessage: true }) : this.setState({ validMessage: false })
  }

  render() {
    const inputStyles = { 
      errorStyle: {
      color: orange500,
    },
      underlineStyle: {
        borderColor: orange500,
      },
      floatingLabelStyle: {
        color: orange500,
      },
      floatingLabelFocusStyle: {
        color: blue500,
      },
    };
    
    const contactFormFilled = this.state.name && this.state.email && this.state.message
    && this.state.validEmail && this.state.validMessage
  
    const modalActions = [
      <FlatButton
        label="Dismiss"
        primary={true}
        onClick={() => {this.setState({ confirmationModalOpen : false})
        this.setState({name:"", email:"", message:""});
  
      }}
        />
    ]
    return (
      <Container fluid>
        <Nav />
        <main className="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
        <Header>
          <h1 className="float-left text-center text-md-left header">Contact</h1>
        </Header>
        <section>
          <div className="card card-inverse card-primary">
            <div class="card-block">
              <section className="row">
                <div class="col-lg-4 mb-4">
                  <div class="card-block">
                    <h3 className="card-title">Contact info</h3>
                    <h3>(980) 474 1124</h3>
                  </div>
                </div>
                <div class="col-lg-8 mb-8">
                  <div class="card-block">
                    <h3 className="card-title">Open By Appointment And Walk In</h3>
                    <h3>216 Iverson Way, Charlotte, NC 28203</h3>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <br />
          <div className="card">
            <iframe
              width="100%"
              height="450"
              frameborder="0" 
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB0GBwgrG183HMdL5EBK2Pt_jrNCN52izg&q=Vigor+Charlotte,+NC" allowfullscreen>
            </iframe>
          </div>
        </section>
        <br />
        <section className="row">
          <div className="col-sm-12">
            <section className="row">
              
              <div className="col-sm-12 col-md-12">
                <div className="card mb-12">
                  <div className="card-block">
                    <h3 className="card-title">Contact us</h3>
                    
                    <div className="dropdown card-title-btn-container">
                      <button className="btn btn-sm btn-subtle dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><em className="fa fa-cog"></em></button>
                      
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton"><a className="dropdown-item" href=""><em className="fa fa-search mr-1"></em> More info</a>
                        <a className="dropdown-item" href=""><em className="fa fa-thumb-tack mr-1"></em> Pin Window</a>
                        <a className="dropdown-item" href=""><em className="fa fa-remove mr-1"></em> Close Window</a></div>
                    </div>
                    
                    <h6 className="card-subtitle mb-2 text-muted">We are ready to answer all of your questions</h6>
                    
                    <form className="form-horizontal">
                      <fieldset>
                  
                      <TextField
                      style={{ display: 'block' }}
                      name="name"
                      floatingLabelStyle={inputStyles.floatingLabelStyle}
                      hintText="Name"
                      floatingLabelText="Name"
                      errorText={this.state.name.length > 0 ? null : 'This field is required'}
                      errorStyle= {inputStyles.errorStyle}
                      onChange={(evt, newValue) => newValue.length > 0 ? this.setState({ name: newValue }): this.setState({ name: "" })}/>
                      
                      <TextField
                      style={{ display: 'block' }}
                      name="email"
                      hintText="name@mail.com"
                      floatingLabelStyle={inputStyles.floatingLabelStyle}
                      floatingLabelText="Email"
                      errorText={this.state.validEmail ? null : 'This field is required'}
                      errorStyle= {inputStyles.errorStyle}
                      onChange={(evt, newValue) => this.validateEmail(newValue)}/>

                      <TextField
                      style={{ display: 'block' }}
                      name="message"
                      multiLine= "true"
                      rows = "3"
                      hintText="Let us know how we can help"
                      floatingLabelStyle={inputStyles.floatingLabelStyle}
                      floatingLabelText="Message"
                      errorText={this.state.validMessage ? null: 'This field is required'}
                      errorStyle= {inputStyles.errorStyle}
                      onChange={(evt, newValue) => this.validateMessage(newValue)}
                      />

                      <RaisedButton
                      backgroundColor="#c0a136"
                      label={contactFormFilled ? 'Contact Us' : 'Fill out your information'}
                      disabled={!contactFormFilled}
                      onClick={this.handleContactRequest}
                      style= {{ marginTop: '25px',
                      float: 'right'}}
                      labelColor="#fff"/>
                      </fieldset>
                    </form>
                    <Dialog
                    modal={true}
                    open={this.state.confirmationModalOpen}
                    actions={modalActions}
                    title="Thank you for reaching out!">
                   </Dialog>
                  </div>
                </div>

              </div>
            </section>
            <section className="row">
              <div className="col-12 mt-1 mb-4">Template by <a href="https://www.medialoot.com">Medialoot</a></div>
            </section>
          </div>
        </section>
        </main>
      </Container>
    );
  }
}

export default Contact;