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
      first_name: "",
      last_name: "",
      email: "",
      pass: "",
      passVerify: "",
      redirect: false,
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.turnEmailInputGreenWhenValid = this.turnEmailInputGreenWhenValid.bind(this);
    this.turnNamesInputGreenWhenValid = this.turnNamesInputGreenWhenValid.bind(this);
    this.turnPasswordInputGreenWhenValid = this.turnPasswordInputGreenWhenValid.bind(this);
    this.passVerifyInputGreenWhenValid = this.passVerifyInputGreenWhenValid.bind(this);
  }

  inputChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, ()=>{
      // invoked immediately after each change in input
      this.passVerifyInputGreenWhenValid("passVerify_input_field", "Passwords must match!")
    }); 
    }

  componentDidMount() {
    this.setState({
      redirect: false,
      signupFailure: false,
    });
  }

  turnEmailInputGreenWhenValid(){
    // green border when email is validated, red border when invalid
    // used on onChange event
    const regex = RegExp(/^[^@ ]+@[^@ ]+\.[^@ \.]{2,}$/);
    let email = this.state.email;
    let emailInput = document.getElementById("email_input_field");

    if (!regex.test(email)) {
        emailInput.classList.add("red-placeholder");
        emailInput.style.border = "2px solid #c13737";
        emailInput.placeholder = "Invalid Email";
        return false
    } else {
        emailInput.classList.remove("red-placeholder");
        emailInput.style.border = "2px solid rgb(44, 197, 84)";
        emailInput.placeholder = "Email";
        return true;
    }
  }

  turnNamesInputGreenWhenValid(id, placeHolderText){
    let nameInput = document.getElementById(id);

    if (nameInput.value.length){
      nameInput.classList.remove("red-placeholder");
      nameInput.style.border = "2px solid rgb(44, 197, 84)";
    } else {
      nameInput.classList.add("red-placeholder");
      nameInput.style.border = "2px solid #c13737";
      nameInput.placeholder = placeHolderText;
    }

  }

  turnPasswordInputGreenWhenValid(id, placeHolderText){
    let input = document.getElementById(id);
    if (input.value.length){
      input.classList.remove("red-placeholder");
      input.style.border = "2px solid rgb(44, 197, 84)";
    } else {
      input.classList.add("red-placeholder");
      input.style.border = "2px solid #c13737";
      input.placeholder = placeHolderText;
    }

  }

  passVerifyInputGreenWhenValid(id, placeHolderText){
    let input = document.getElementById(id);
    if (this.state.pass === this.state.passVerify && input.value.length){
      input.classList.remove("red-placeholder");
      input.style.border = "2px solid rgb(44, 197, 84)";
    } else if (this.state.pass !== this.state.passVerify){ // mismatched pw or no input value
      input.classList.add("red-placeholder");
      input.style.border = "2px solid #c13737";
      input.placeholder = placeHolderText;
    }
  }

  submitHandler(e) {
    let { first_name, last_name, email, pass, passVerify } = this.state;
    e.preventDefault();
  
    // ON SUBMIT validations:
    // first name validation
    if (!first_name) {
      this.turnNamesInputGreenWhenValid("firstName_input_field", "Required");
      document.getElementById("signup-input_error_message").innerText = "Please fix one or more fields above."
    }
      // last name validation
    if (!last_name) {
      this.turnNamesInputGreenWhenValid("lastName_input_field", "Required");
      document.getElementById("signup-input_error_message").innerText = "Please fix one or more fields above."
    }
      // email validation
    if (!this.turnEmailInputGreenWhenValid()) {  //email must pass validation, function returns a boolean
      document.getElementById("signup-input_error_message").innerText = "Please fix one or more fields above."
    }
  
    // password and password verify validation
    if(!pass){// empty password 
      this.turnPasswordInputGreenWhenValid("password_input_field", "Required");
      document.getElementById("signup-input_error_message").innerText = "Please fix one or more fields above."
    }
    if (!passVerify){ // empty passVerify
      this.turnPasswordInputGreenWhenValid("passVerify_input_field", "Passwords must match!");
      document.getElementById("signup-input_error_message").innerText = "Please fix one or more fields above."
    } 
    if (pass !== passVerify){ // password mismatch
      this.turnPasswordInputGreenWhenValid("password_input_field", "Required");
      this.turnPasswordInputGreenWhenValid("passVerify_input_field", "Passwords must match!");
      document.getElementById("signup-input_error_message").innerText = "Please fix one or more fields above."
    }
  
    if (
      first_name &&
      last_name &&
      this.turnEmailInputGreenWhenValid() &&
      pass && passVerify &&
      pass === passVerify
    ) {
      axios.get(`/api/email/${email}`) // get request to DB for existing email
      .then((data)=> {
          document.getElementById("signup-input_error_message").innerText = "Email is already in use!"

          let emailInput = document.getElementById("email_input_field");
          emailInput.style.border = "2px solid #c13737";
      })
      .catch((err)=>{ // if nothing returns back, continue with post req
          axios.post("/api/signup/", { first_name, last_name, email, pass })
            .then(() => {
              this.setState({
                redirect: true,
              });
            })
            .catch(() => { // redundant catch block, may not need
              window.alert("Internal error, please refresh page and try again.");
              document.getElementById("signup_input_form").reset();
            });
      })
     
    }
  }

  render() {
    if (localStorage.length) {
      return <Redirect to="/main/jobs" />;
    } else if (this.state.redirect) {
      return <Redirect to="/redirect" />;
    } else {
      return (
        <div className="signup_main_container">
          <NavLink className="login_main_title" to="/">
            Hire-Mee
          </NavLink>
          <div id="signup_gist">Better than your own Excel Sheet.</div>
          <div id="signup_start_here"> Start Here.</div>
          <div className="sign_up_input_container">
            <div className="sign_up_create_new_account_text">
              Create a free account
            </div>
            <div className="sign_up_create_new_account_text">
              to start organizing.
            </div>

            <div className="signup_google_container">
              <img
                id="signup_google_icon"
                src="https://cdn.worldvectorlogo.com/logos/google-icon.svg"
              ></img>
              <div id="signup_google_text">Continue with Google</div>
            </div>

            <div className="signup_or_separator_container">
              <hr className="signup_or_hr_tag" />
              <div>or</div>
              <hr className="signup_or_hr_tag" />
            </div>

            <div className="signup_input_form_container">
              <form onSubmit={this.submitHandler} id="signup_input_form">
                <div className="signup_input_icon_div">
                  <PersonFill className="signup_bootstrap_icon" />
                  <input
                    onChange={(e) => {
                      this.inputChangeHandler(e);
                      this.turnNamesInputGreenWhenValid("firstName_input_field", "Required")
                    }}
                    className="signup_input_field"
                    id="firstName_input_field"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    required
                  ></input>
                </div>
                <div className="signup_input_icon_div">
                  <PersonFill className="signup_bootstrap_icon" />
                  <input
                    onChange={(e) => {
                      this.inputChangeHandler(e);
                      this.turnNamesInputGreenWhenValid("lastName_input_field", "Required")
                    }}
                    className="signup_input_field"
                    id="lastName_input_field"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    required
                  ></input>
                </div>
                <div className="signup_input_icon_div">
                  <Envelope className="signup_bootstrap_icon" />
                  <input
                    onChange={(e) => {
                      this.inputChangeHandler(e)
                      this.turnEmailInputGreenWhenValid()
                    }}
                    className="signup_input_field"
                    id="email_input_field"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  ></input>
                </div>
                <div className="signup_input_icon_div">
                  <Lock className="signup_bootstrap_icon" />
                  <input
                    onChange={(e) => {
                      this.inputChangeHandler(e)
                      this.turnPasswordInputGreenWhenValid("password_input_field", "Required")
                    }}
                    className="signup_input_field"
                    id="password_input_field"
                    type="password"
                    name="pass"
                    placeholder="Password"
                    required
                  ></input>
                </div>
                <div className="signup_input_icon_div">
                  <Lock className="signup_bootstrap_icon" />
                  <input
                     onChange={(e) => {
                      this.inputChangeHandler(e)
                    }}
                    className="signup_input_field"
                    id="passVerify_input_field"
                    type="password"
                    name="passVerify"
                    placeholder="Re-enter Password"
                    required
                  ></input>
                </div>

                <p id="signup-input_error_message"></p>

                <div className="signup_button_container">
                  <button
                    id="signup_signup_button"
                    onClick={(e) => this.submitHandler(e)}
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
            <div id="signup_already_signedup_text">
            <div className="signup_already_signedup_container">
                Already have an account?
              </div>
              <NavLink id="signup_already_signedup_button" to="/login">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      );
    }
  }
}