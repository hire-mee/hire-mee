import React, { Component } from "react";
import axios from "axios"

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
    
    axios.post('/api/signUp', {firstName, lastName, email, pass})
    .then(() => {
      this.setState({
        signUpPage: false
      })
    })
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              onChange={this.inputChangeHandler}
              type="text"
              name="firstName"
              placeholder="First Name"
              required
            ></input>
          </div>
          <div>
            <input
              onChange={this.inputChangeHandler}
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
            ></input>
          </div>
          <div>
            <input
              onChange={this.inputChangeHandler}
              type="text"
              name="email"
              placeholder="Email"
              required
            ></input>
          </div>
          <div>
            <input
              onChange={this.inputChangeHandler}
              type="password"
              name="pass"
              placeholder="Password"
              required
            ></input>
          </div>
          <div>
            <button>Sign up</button>
          </div>
        </form>
      </div>
    );
  }
}
