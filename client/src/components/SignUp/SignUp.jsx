import React, { Component } from "react";
import axios from "axios"
import { PersonFill } from 'react-bootstrap-icons';
import { Envelope } from 'react-bootstrap-icons';
import { Lock } from 'react-bootstrap-icons';
import { NavLink , Redirect} from "react-router-dom";



export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      pass: '',
      passVerify: '',
      redirect: false,
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  inputChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount(){
    this.setState({ 
      redirect: false,
      signupFailure: false
    })
  }

  validateEmail() {
    const regex = RegExp(/^[^@ ]+@[^@ ]+\.[^@ \.]{2,}$/)
    const email = this.state.email;


    if(!regex.test(email)) {
      let emailInput = document.getElementById("email_input_field")
      emailInput.classList.add('red-placeholder')
      emailInput.style.border = "2px solid #c13737"
      emailInput.value = ""
      emailInput.placeholder = "Invalid Email"
      return false
    }
    return true
   }

   validateName(){
     let first_name, last_name = this.state;
   }

  submitHandler(e) {
    let { first_name, last_name, email, pass, passVerify } = this.state;
    e.preventDefault();

   if (!first_name) {
      let firstNameInput = document.getElementById("firstName_input_field")
      firstNameInput.classList.add('red-placeholder')
      firstNameInput.style.border = "2px solid #c13737"
      firstNameInput.placeholder = "Required"
   }
   if (!last_name) {
      let lastNameInput = document.getElementById("lastName_input_field")
      lastNameInput.classList.add('red-placeholder')
      lastNameInput.style.border = "2px solid #c13737"
      lastNameInput.placeholder = "Required"

   }
   if (!this.validateEmail()){  //email must pass validation
      let emailInput = document.getElementById("email_input_field")
      emailInput.classList.add('red-placeholder')
      emailInput.style.border = "2px solid #c13737"
      emailInput.value = ""
      emailInput.placeholder = "Invalid Email"
    } 

     if (!first_name || !last_name || this.state.pass !== this.state.passVerify) { // password and passferify must pass validation
      let passInput = document.getElementById('password_input_field')
      passInput.style.border = "2px solid #c13737"
      passInput.classList.add('red-placeholder')
      passInput.placeholder = "Required"

      let passVerifyInput = document.getElementById('passVerify_input_field')
      passVerifyInput.style.border = "2px solid #c13737"
      passVerifyInput.placeholder = "Passwords do not match!"
      passVerifyInput.classList.add('red-placeholder')
    } 

    if (first_name && last_name && this.validateEmail && pass === passVerify) {
      axios.post('/api/signup/', {first_name, last_name, email, pass})
      .then(() => {
        this.setState({
          redirect: true,
        })
      })
      .catch(() => { // TODO: FIX ERROR HANDLING FOR SIGNUP EMAILS THAT ALREADY EXIST IN DATABASE! Create another get request before post to confirm for clearance
        window.alert("Invalid email, please try another email")
        document.getElementById('signup_input_form').reset(); 
    })
    }
  }

  render() {
     if (localStorage.length) {
      return (
        <Redirect to="/main/jobs"/>
      )
    } else if (this.state.redirect) {
      return (
        <Redirect to="/redirect"/>
      )
    } else {
      return (
        <div className="signup_main_container">
        <NavLink className="login_main_title" to="/">Hire-Mee</NavLink>
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
                  <form onSubmit={this.submitHandler} id="signup_input_form">
                    <div className="signup_input_icon_div">
                      <PersonFill className="signup_bootstrap_icon"/>
                      <input
                        onChange={this.inputChangeHandler}
                        className="signup_input_field"
                        id="firstName_input_field"
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        required
                      ></input>
                    </div>
                    <div className="signup_input_icon_div">
                    <PersonFill className="signup_bootstrap_icon"/>
                      <input
                        onChange={this.inputChangeHandler}
                        className="signup_input_field"
                        id="lastName_input_field"
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        required
                      ></input>
                    </div>
                    <div className="signup_input_icon_div">
                      <Envelope className="signup_bootstrap_icon"/>
                      <input
                        onChange={this.inputChangeHandler}
                        className="signup_input_field"
                        id="email_input_field"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                      ></input>
                    </div>
                    <div className="signup_input_icon_div">
                    <Lock className="signup_bootstrap_icon"/>
                      <input
                        onChange={this.inputChangeHandler}
                        className="signup_input_field"
                        id="password_input_field"
                        type="password"
                        name="pass"
                        placeholder="Password"
                        required
                      ></input>
                    </div>
                    <div className="signup_input_icon_div">
                    <Lock className="signup_bootstrap_icon"/>
                      <input
                        onChange={this.inputChangeHandler}
                        className="signup_input_field"
                        id="passVerify_input_field"
                        type="password"
                        name="passVerify"
                        placeholder="Re-enter Password"
                        required
                      ></input>
                    </div>
                    <div className="signup_button_container">
                      <button id="signup_signup_button" onClick={(e) => this.submitHandler(e)}>Sign up</button>
                    </div>
                  </form>
                </div>
  
                <div className="signup_already_signedup_container">
                  <div id="signup_already_signedup_text">Already have an account?</div>
                  <NavLink id="signup_already_signedup_button" to="/login">Login</NavLink>
                </div>
          </div>
        </div>
      );
    }
  }
}