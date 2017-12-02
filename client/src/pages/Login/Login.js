import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import axios from "axios";
import SnackBar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog';
import Router from "react-router-dom"



class Login extends Component {

// Setting the component's initial state
state = {
    firstName: "",
    lastName: "",
    userEmail: "",
    userPass: "",
    passConfirm: "",
    userName: "",
    userPW: "",
    option: "",
    alertSnackBarOpen: false,
    confirmationModalOpen: false
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
   
  };

  handleRegistration = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    //ensure all fields are completed
    if(this.state.firstName === "" ||
        this.state.lastName === ""||
        this.state.userEmail === ""||
        this.state.userPass === ""||
        this.state.passConfirm === "") {
            return this.setState({ alertSnackbarMessage: "Please Complete All Fields", alertSnackbarOpen: true, processed: true })
        }
        //ensure passwords do match
    if (this.state.userPass !== this.state.passConfirm){
        return this.setState({ alertSnackbarMessage: "Passwords do not match", alertSnackbarOpen: true, processed: true })
    } else {
        const user = {
            name: this.state.firstName + " " + this.state.lastName,
            email: this.state.userEmail,
            password: this.state.userPass

        }
        //route to the server to add user to the database
        axios.post("/userSignup", user).then(res=>{
           
            this.setState({ confirmationModalOpen: !this.state.confirmationModalOpen });
        // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
            this.setState({
            firstName: "",
            lastName: "",
            userEmail: "",
            userPass: "",
            passConfirm: ""
        });
        
        }).catch(err=>console.log(err));
         //redirect user to dashboard/main page.  This will load react component according to router in App.js within client/src folder 
         this.props.history.push("/login");      
    }
  };
  validateEmail(email) {
    const regex = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i
    return regex.test(email) ? this.setState({ email: email, validEmail: true }) : this.setState({ validEmail: false })
  }
  
  handleLogin = (event) => {
      event.preventDefault();
      if (this.state.userName === "" || this.state.userPW === ""){
        return this.setState({ alertSnackbarMessage: "Please Complete All Fields", alertSnackbarOpen: true, processed: true })
      }
      const userLogin = {
          login_name: this.state.userName,
          user_pass: this.state.userPW
      }
      //send username and password to server
      axios.post("/userSignup/userCheck", userLogin)
      .then(res=>{
            //reset form data
            this.setState({
          userName: "",
          userPW: ""            
        });
        let result=res.data;
       
        if(result.error){
             //alert user password is incorrect 
            this.setState({ alertSnackbarMessage: result.error, alertSnackbarOpen: true, processed: true })
            //direct user back to login;
            this.props.history.push("/login");
        } else {
            //otherwise password is good and send user to main page
            this.props.history.push({
                pathname: "/dash/" + result,
                //this is only good for the single route, email is lost while navigating through the nav
            state: {id: res.data}
            });
           
        }
        
        }).catch(err=>console.log(err));
  }

  render() {
      //preparing modal actions
    const modalActions = [
        <FlatButton
          label="Confirm"
          primary={false}
          onClick={() => this.setState({ confirmationModalOpen : false})} />,
      ]

    return (
      <Container fluid>

           <nav className="navbar navbar-expand-lg navbar-light bg-default">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to = "/"><a className="navbar-brand cover-brand" href="">Vigor</a></Link>
    </div>
  </nav> 
        <div className="text-center">
     
        <br />
        <br />
        <br />
        <div className="row" id="parent" >
            <div className="col-md-8 col-12 offset-sm-4 offset-lg-3 offset-xl-2 card d-block border-0 py-2" >
                <a href="" className="btn btn-outline-secondary" data-toggle="collapse" data-target="#cardLogin" data-parent="#parent">Login</a><span> </span>
                <a href="" className="btn btn-outline-secondary" data-toggle="collapse" data-target="#cardRegister" data-parent="#parent">Register</a>
                <div className="collapse show py-2" id="cardLogin" >
                    <div className="card"  style={{borderRadius: "5px", border: "1px solid rgb(0, 10, 20)"}}>
                        <div className="card-block">
                            <h2 className="text-xs-center">Login</h2>
                            <ul className="list-inline text-center">
                                <li className="list-inline-item"><a className="btn btn-lg" href="" title="Twitter"><i className="fa fa-2x fa-twitter"></i></a>&nbsp; </li>
                                <li className="list-inline-item"><a className="btn btn-lg" href="" title=""><i className="fa fa-2x fa-google-plus"></i></a>&nbsp; </li>
                                <li className="list-inline-item"><a className="btn btn-lg" href="" title="Facebook"><i className="fa fa-2x fa-facebook"></i></a></li>
                            </ul>
                            <form>
                                <div className="form-group row">
                                    <label for="inputEmailForm" className="sr-only control-label">Email</label>
                                    <div className="offset-sm-2 col-sm-8">
                                        <input type="text" 
                                        className="form-control" 
                                        id="inputEmailForm"
                                        placeholder="Email"
                                        value={this.state.userName}
                                        name="userName"
                                        onChange={this.handleInputChange}
                                        required="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    {/* <label for="inputPasswordForm" className="sr-only control-label">Password</label> */}
                                    <div className="offset-sm-2 col-sm-8">
                                        <input type="password" 
                                        className="form-control" 
                                        id="inputPasswordForm"
                                        placeholder="Password"
                                        value={this.state.userPW}
                                        name="userPW"
                                        onChange={this.handleInputChange}
                                        required="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="offset-sm-2 col-sm-8 pb-3 pt-2">
                                        <button type="submit" className="btn btn-primary btn-lg mt-2 btn-block" onClick={this.handleLogin}>Sign-in</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="collapse py-2" id="cardRegister">
                    <div className="card"   style={{borderRadius: "5px", border: "1px solid rgb(0, 10, 20)"}}>
                        <div className="card-block">
                            <h2 className="text-center">Register</h2>
                            <ul className="list-inline text-center">
                                <li className="list-inline-item"><a className="btn btn-lg" href="" title="Twitter"><i className="fa fa-2x fa-twitter"></i></a>&nbsp; </li>
                                <li className="list-inline-item"><a className="btn btn-lg" href="" title=""><i className="fa fa-2x fa-google-plus"></i></a>&nbsp; </li>
                                <li className="list-inline-item"><a className="btn btn-lg" href="" title="Facebook"><i className="fa fa-2x fa-facebook"></i></a></li>
                            </ul>
                            <form>
                                <div className="form-group row">
                                    {/* <div className="offset-sm-2 col-sm-8">
                                        <select name="gender" className="form-control" type="" id="gender"
                                        value={this.state.option} onChange={this.handleInputChange}>
                                            <option value="">Select Gender</option>
                                            <option value="genderM">Male</option>
                                            <option value="genderF">Female</option>
                                        </select>
                                    </div> */}
                                </div>
                                <div className="form-group row">
                                    <label for="input2FnameForm" className="sr-only control-label">First Name</label>
                                    <div className="offset-sm-2 col-sm-8">
                                        <input type="text" 
                                        className="form-control"
                                        value={this.state.firstName}
                                        name="firstName"
                                        onChange={this.handleInputChange} 
                                        id="input2FnameForm" 
                                        placeholder="First Name" 
                                        required="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    {<label for="input2LnameForm" className="sr-only control-label">Last Name</label>}
                                    <div className="offset-sm-2 col-sm-8">
                                        <input type="text" 
                                        className="form-control"
                                        value={this.state.lastName}
                                        name="lastName"
                                        onChange={this.handleInputChange}  
                                        id="input2LnameForm" 
                                        placeholder="Last Name" 
                                        required="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    {<label for="input2EmailForm" className="sr-only control-label">Email</label>}
                                    <div className="offset-sm-2 col-sm-8">
                                        <input type="text" 
                                        className="form-control"
                                        value={this.state.userEmail}
                                        name="userEmail"
                                        onChange={this.handleInputChange}  
                                        id="input2EmailForm" 
                                        placeholder="Email" 
                                        required="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    {<label for="input2PasswordForm" className="sr-only control-label">Password</label>}
                                    <div className="offset-sm-2 col-sm-8">
                                        <input type="password" 
                                        className="form-control"
                                        value={this.state.userPass}
                                        name="userPass"
                                        onChange={this.handleInputChange} 
                                        id="input2PasswordForm" 
                                        placeholder="Password" required="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    {<label for="input2Password2Form" className="sr-only control-label">Verify</label>}
                                    <div className="offset-sm-2 col-sm-8">
                                        <input type="password" 
                                        className="form-control"
                                        value={this.state.passConfirm}
                                        name="passConfirm"
                                        onChange={this.handleInputChange}  
                                        id="input2Password2Form" placeholder="Verify password" 
                                        required="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="offset-sm-2 col-sm-8 pb-3 pt-2">
                                        <button type="submit" 
                                        className="btn btn-primary btn-lg mt-2 btn-block"
                                        onClick={this.handleRegistration}>Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                           
                        </div>
                    </div>
                </div>
                <Dialog
                modal={true}
                open={this.state.confirmationModalOpen}
                actions={modalActions}
                title="Thank you for registering, please login.">
                
                </Dialog>

                <SnackBar
                open={this.state.alertSnackbarOpen}
                message={this.state.alertSnackbarMessage || ''}
                autoHideDuration={10000}
                onRequestClose={() => this.setState({ alertSnackbarOpen: false })} />
            </div>
        </div>
        </div>
      </Container>
    );
  }
}

export default Login;
