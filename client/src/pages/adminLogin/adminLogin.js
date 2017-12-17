import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import Admin from '../Admin'
import axios from 'axios';

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const adminLogin = () => (
  <Router>
    <div>
      <AuthButton/>
      <ul>
        <li><Link to="/admin">adminLogin</Link></li>
      </ul>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/admin" component={Admin}/>
    </div>
  </Router>
)
//authenticated user object
const authUser = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  authUser.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        authUser.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    authUser.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)



class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    userName: "",
    userPW: ""
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
   
  };

  login = () => {
    authUser.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
    //send username and password to server
  axios.post("/userSignup/adminCheck", adminLogin)
  .then(res=>{
        //reset form data
        this.setState({
      userName: "",
      userPW: ""            
    });
    let result=res.data;
    console.log(result);
    if (!(result.error ==="NO")){
      authUser.authenticate(() => {
        this.setState({ redirectToReferrer: true })
      })
    } else {
      this.setState({ redirectToReferrer: false})
    }    
  })
  .catch(err=>console.log(err));
  }
  

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <div className="form-group row">
          {<label htmlFor="input2EmailForm" className="sr-only control-label">Email</label>}
          <div className="offset-sm-2 col-sm-8">
              <input type="text" 
              className="form-control"
              value={this.state.userName}
              name="userName"
              onChange={this.handleInputChange}  
              id="input2EmailForm" 
              placeholder="Email" 
              required="" />
          </div>
      <div className="form-group row">
          {<label htmlFor="input2PasswordForm" className="sr-only control-label">Password</label>}
          <div className="offset-sm-2 col-sm-8">
              <input type="password" 
              className="form-control"
              value={this.state.userPW}
              name="userPW"
              onChange={this.handleInputChange} 
              id="input2PasswordForm" 
              placeholder="Password" required="" />
          </div>
          <button 
          disabled = {!this.state.userName || !this.state.userPW}
          onClick={this.login}>Log in</button>
      </div>
      </div>
      </div>
    )
  }
}

export default adminLogin