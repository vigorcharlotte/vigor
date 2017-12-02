import React, { Component } from "react";

class Nav extends Component {

render() {
  return (
    <div>
  <nav className="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2 bg-faded sidebar-style-1">
    <h1 className="site-title"><a href="/about"><em className="logo" ></em> Vigor</a></h1>

    <a href="#menu-toggle" className="btn btn-default " id="menu-toggle"><em className="fa fa-bars"></em></a>
    
    <ul className="nav nav-pills flex-column sidebar-nav">
      <li className="nav-item"><a className="nav-link active" href="/dash"><em className="fa fa-dashboard"></em> Dashboard <span className="sr-only">(current)</span></a></li>
      <li className="nav-item"><a className="nav-link" href="/appointments"><em className="fa fa-calendar-o"></em> Appointments</a></li>
      <li className="nav-item"><a className="nav-link" href="/payments"><em className="fa fa-credit-card-alt"></em> Payments</a></li>
      <li className="nav-item"><a className="nav-link" href="/about"><em className="fa fa-info-circle"></em> About Vigor</a></li>
      <li className="nav-item"><a className="nav-link" href="/contact"><em className="fa fa-globe"></em> Contact Us</a></li>
    </ul>

   <a href="/" className="logout-button" ><em className="fa fa-power-off"></em> Signout</a>
  </nav>
  </div>
  )}
}
export default Nav;
