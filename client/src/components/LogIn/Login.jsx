import React, { Component } from "react";
import axios from "axios"
import { PersonFill } from 'react-bootstrap-icons';
import { Envelope } from 'react-bootstrap-icons';
import { Lock } from 'react-bootstrap-icons';
import { NavLink, Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
        email: '',
        pass: '',
        userData: {},
        loginSuccess: false
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount(){
    this.setState({ loginSuccess: false})
  }


  handleLogin(e){
    e.preventDefault();
    axios.post('/api/login', {
      email: this.state.email,
      pass: this.state.pass
    })
      .then(() => {
          axios.get(`/api/email/${this.state.email}`)
            .then(userData => {
              this.setState({userData: userData.data[0]}, ()=> {
                this.setState({loginSuccess: true})
              })
            })
            .catch(() =>{
              window.alert("Error with login, please check your email & password");
              document.getElementById("login_input_form").reset();
            })
        })
      .catch(() => {
        window.alert("Error with login, please check your email & password");
        document.getElementById("login_input_form").reset();
      })
  }

  inputChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    if (this.state.loginSuccess) {
     return( <Redirect to={{
       pathname: "/main",
       state: { userData: this.state.userData}
     }}/> )
    } else {
      return (
        <div className="signup_main_container">
        <NavLink className="login_main_title" to="/">Hire-Mee</NavLink>
        <div id="signup_gist">Better than your own Excel Sheet.</div>
        <div id="signup_start_here"> Welcome back!</div>
          <div className="sign_up_input_container">
              <div className="sign_up_create_new_account_text">Log in to continue.</div>

                <div className="signup_input_form_container">

                    <div className="signup_google_container" onClick={()=>window.alert("Google Authentication coming soon!")}>
                    <img id="signup_google_icon" src="https://cdn.worldvectorlogo.com/logos/google-icon.svg"></img>
                    <div id="signup_google_text">Log in with Google</div>
                  </div>
      
                  <div className="signup_or_separator_container">
                    <hr className="signup_or_hr_tag"/>
                    <div>or</div>
                    <hr className="signup_or_hr_tag"/>
                  </div>


                  <form onSubmit={this.submitHandler} id="login_input_form">
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
                  <div id="signup_already_signedup_text">Click <NavLink to="/signup">here </NavLink> to sign up.</div>
                </div>
                  </form>
                </div>
          </div>
        </div>
      );
    }
  }
}