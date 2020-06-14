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
    .then(result => {
      axios.get(`api/user/${result.data}`)
      .then(innerResults => this.props.storeUserData(innerResults.data[0]))
      .catch(innerErr => console.error(innerErr))
    })
    .then(() => this.props.changePage('page', 'Jobs'))
    .catch(() => (location.reload()))
    // .catch(err => window.alert("error with handling login"))
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
                  <div id="signup_already_signedup_button" onClick={() => this.props.changePage('page', 'Signup')}>Sign Up</div>
                </div>
                  </form>
                </div>

          </div>
        </div>
      );
  }
}
// commented out for when Google auth is correctly implemented
// 
// <div className="signup_google_container">
//                 <img id="signup_google_icon" src="https://cdn.worldvectorlogo.com/logos/google-icon.svg"></img>
//                 <div id="signup_google_text">Continue with Google</div>
//               </div>
  
//               <div className="signup_or_separator_container">
//                 <hr className="signup_or_hr_tag"/>
//                 <div>or</div>
//                 <hr className="signup_or_hr_tag"/>
//               </div>