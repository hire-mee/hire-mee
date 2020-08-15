import React from "react";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";


export default function Redirect() {
    return (
        <div>
          <div className="signup_redirect_text">Account successfully created!</div>
          <div id="signup_redirect_login" onClick={() => this.props.changePage('page', 'Login')}>Login Here</div>
        </div>
    )
}