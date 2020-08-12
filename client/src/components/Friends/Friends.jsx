import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";

export class Friends extends Component {
  render() {
    return (
      <div className="friends-div">
        <div className="friend-header">
          <div className="all-friends">All friends (5)</div>
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
          <div className="row">
            <div className="column">
              <Avatar>MZ</Avatar>
              <p className="friend-name">Mark Zuck</p>
            </div>
            <div className="column">
              <Avatar>SJ</Avatar>
              <p className="friend-name">Steve Jobs</p>
            </div>
            <div className="column">
              <Avatar>PL</Avatar>
              <p className="friend-name">Peter La Fleur</p>
            </div>
            <div className="column">
              <Avatar>MC</Avatar>
              <p className="friend-name">Mark Cuban</p>
            </div>
            <div className="column">
              <Avatar>JY</Avatar>
              <p className="friend-name">Julian Yuen</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Friends;
