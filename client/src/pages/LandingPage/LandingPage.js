import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";

import axios from "axios";


class LandingPage extends Component {

componentWillMount= () => {

  //this post call is used to logout user and delete cookie
  axios.post("/userSignup/logout")
  .then(res=>{;
    //logout 
    this.props.history.push("/");    
    }).catch(err=>console.log(err));
};

  render() {
    return (
<div>        
  <nav className="navbar navbar-light bg-default">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to = "/about"><a className="navbar-brand cover-brand">Vigor</a></Link>
    </div>
  </nav>

  <Container fluid>
    <div className="cover-div text-center">
      <h3 className="cover-heading">Vigor</h3>
      <p className="cover-text">Helping You Become Independent Of All Therapists, Including Ourselves</p>
      <a href="login"><button className="btn btn-dark">Login</button></a><span> <a href="about"><button className="btn btn-dark">Continue as Guest</button></a></span>
    </div>
  </Container>
  </div>
    )
  }
}
export default LandingPage;