import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";

export class Friends extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    axios
      .get(`/api/friends/${nextProps.id}`)
      .then((res) => {
        this.setState({
          friends: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let friendList = this.state.friends.map((friend) => {
      return (
        <div className="column" key={friend.first_name}>
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
            <input size="18"></input>
            <Button
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
