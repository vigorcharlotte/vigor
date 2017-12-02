import React from 'react';
import ReactDOM from 'react-dom';
import './sqpaymentform.css';
import App from './App';
// import Cover from './Cover';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render( 
    <MuiThemeProvider>
    < App />
    </MuiThemeProvider>, document.getElementById('root'));