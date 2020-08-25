import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";

export class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFriend: "",
      friends: [],
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.getFriendData = this.getFriendData.bind(this)
  }

  componentDidMount(){
    this.setState({
        currentId: localStorage.id,
      }, () => this.getFriendData());
  }

  inputChangeHandler(e) {
    this.setState({
      newFriend: e.target.value,
    });
  }

  getFriendData(){
    axios
    .get(`/api/friends/${localStorage.id}`)
    .then((res) => {
      this.setState({
        friends: res.data,
      });
    })
    .catch((err) => console.error(err));
  }

  submitHandler(e) {
    e.preventDefault();
    let inputBar = document.getElementById("friends-add-email-input");
    if (this.state.newFriend.includes("@") && this.state.newFriend.includes(".")) {
      axios
      .post(`/api/friends/${localStorage.id}`, {
        email: this.state.newFriend,
      })
      .then((res) => this.getFriendData())
      .catch((err) => {
        inputBar.style.border = "2px solid #c13737"
        inputBar.value = ""
        inputBar.placeholder = "Invalid email, please try again"
        // console.error(err)
      });
    } else {
      inputBar.style.border = "2px solid #c13737"
      inputBar.value = ""
      inputBar.placeholder = "Invalid email, please try again"
    }

  }

  render() {
    let friendList = this.state.friends.map((friend, i) => {
      return (
        <div className="column" key={i}>
          <Avatar>{friend.first_name[0] + friend.last_name[0]}</Avatar>
          <p className="friend-name">
            {friend.first_name + " " + friend.last_name}
          </p>
        </div>
      );
    });
    return (
      <div className="friends-div">
        <div className="friend-header">
          <div className="all-friends">
            All friends ({this.state.friends.length})
          </div>
          <div className="add-friend">
            <input onChange={this.inputChangeHandler} id="friends-add-email-input"></input>
            <Button
              onClick={this.submitHandler}
              style={{
                marginLeft: "20px",
                marginBottom: "7px",
                width: "20px",
                height: "30px",
                backgroundColor: "#fbbc05",
              }}
              variant="contained"
            >
              Add
            </Button>
          </div>
        </div>
        <div className="friend-grid-holder">
          {this.state.friends.length === 0 ? (
            <p className="friend-none">
              Add friends by inputting their email address.
            </p>
          ) : (
            <div className="row">{friendList}</div>
          )}
        </div>
      </div>
    );
  }
}

export default Friends;