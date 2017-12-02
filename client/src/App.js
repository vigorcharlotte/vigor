import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dash from "./pages/Dash";
import Appointments from "./pages/Appointments";
import Payments from "./pages/Payments";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NoMatch from "./pages/NoMatch";
import adminLogin from "./pages/adminLogin";




class App extends Component {
  

render() {
 
return (
<div>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        {<Route exact path="/login" component={Login} />}
        {<Route exact path="/dash/:id" component={Dash}/>}
        {<Route exact path="/dash" component={Login} />}
        {<Route exact path="/appointments" component={Appointments} />}
        {<Route exact path="/payments" component={Payments} />}
        {<Route exact path="/about" component={About} />}
        {<Route exact path="/contact" component={Contact} />}
        <Route path="/adminLogin" component={adminLogin}/>
        {<Route component={NoMatch} />}
      </Switch>
    </div>
  </Router>
  </div>
)}
}

  
export default App;
