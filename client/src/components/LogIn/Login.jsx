import React, { Component } from "react";
import axios from "axios"
import { PersonFill } from 'react-bootstrap-icons';
import { Envelope } from 'react-bootstrap-icons';
import { Lock } from 'react-bootstrap-icons';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        pass: '',
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(e){
    e.preventDefault();
    axios.post('/api/login', {
      email: this.state.email,
      pass: this.state.pass
    })
    .then(() => {
      axios.get(`/api/email/${this.state.email}`)
      .then(innerResults => this.props.storeUserData(innerResults.data[0]))
      .catch(() =>window.alert("Error with login, please check your email & password"))
    })
    .then(() => this.props.changePage('page', 'Statistics'))
    .catch(() => {location.reload(); window.alert("Error with login, please check your email & password")})
  }

  inputChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, ()=>console.log(this.state));
  }

  render() {
      return (
        <div className="signup_main_container">
        <div className="login_main_title" onClick={() => this.props.changePage('page', 'Signup')}>Hire-Mee</div>
        <div id="signup_gist">Better than your own Excel Sheet.</div>
        <div id="signup_start_here"> Welcome back!</div>
          <div className="sign_up_input_container">
              <div className="sign_up_create_new_account_text">Log in to continue.</div>
                <div className="signup_input_form_container">
                  <form onSubmit={this.submitHandler}>
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
                    <button id="signup_signup_button" onClick={this.handleLogin}>Login</button>
                  </div>
                  <div className="signup_already_signedup_container">
                  <div id="signup_already_signedup_text">Click here to sign up.</div>
                  <div id="signup_already_signedup_button" onClick={()=>this.props.changePage('page', 'Signup')}>Sign Up</div>
                </div>
                  </form>
                </div>

          </div>
        </div>
      );
  }
}