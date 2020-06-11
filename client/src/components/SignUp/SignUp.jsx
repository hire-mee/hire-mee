import React, { Component } from "react";
import axios from "axios"
import { PersonFill } from 'react-bootstrap-icons';
import { Envelope } from 'react-bootstrap-icons';
import { Lock } from 'react-bootstrap-icons';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      pass: '',
      signUpPage: true
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  inputChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitHandler(e) {
    let { firstName, lastName, email, pass } = this.state;
    e.preventDefault();
    
    axios.post('/api/signup', {firstName, lastName, email, pass})
    .then(() => {
      this.setState({
        signUpPage: false
      })
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className="signup_main_container">
      <div id="signup_main_title">Hire-Mee</div>
      <div id="signup_gist">Better than your own Excel Sheet.</div>
      <div id="signup_start_here"> Start Here.</div>
        <div className="sign_up_input_container">
            <div className="sign_up_create_new_account_text">Create a free account</div>
            <div className="sign_up_create_new_account_text">to start organizing.</div>
            <div className="signup_google_container">
              <img id="signup_google_icon" src="https://cdn.worldvectorlogo.com/logos/google-icon.svg"></img>
              <div id="signup_google_text">Continue with Google</div>
            </div>

            <div className="signup_or_separator_container">
              <hr className="signup_or_hr_tag"/>
              <div>or</div>
              <hr className="signup_or_hr_tag"/>
            </div>

              <div className="signup_input_form_container">
                <form onSubmit={this.submitHandler}>
                  <div className="signup_input_icon_div">
                    <PersonFill className="signup_bootstrap_icon"/>
                    <input
                      onChange={this.inputChangeHandler}
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                    ></input>
                  </div>
                  <div className="signup_input_icon_div">
                  <PersonFill className="signup_bootstrap_icon"/>
                    <input
                      onChange={this.inputChangeHandler}
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                    ></input>
                  </div>
                  <div className="signup_input_icon_div">
                    <Envelope className="signup_bootstrap_icon"/>
                    <input
                      onChange={this.inputChangeHandler}
                      type="text"
                      name="email"
                      placeholder="Email"
                      required
                    ></input>
                  </div>
                  <div className="signup_input_icon_div">
                  <Lock className="signup_bootstrap_icon"/>
                    <input
                      onChange={this.inputChangeHandler}
                      type="password"
                      name="pass"
                      placeholder="Password"
                      required
                    ></input>
                  </div>
                  <div className="signup_button_container">
                    <button id="signup_signup_button" onClick={() => window.alert("functionality coming soon ;-)")}>Sign up</button>
                  </div>
                </form>
              </div>

              <div className="signup_already_signedup_container">
                <div id="signup_already_signedup_text">Already have an account?</div>
                <div id="signup_already_signedup_button">Login</div>
              </div>
        </div>
      </div>
    );
  }
}
