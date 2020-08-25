import React, { Component } from "react";
import axios from "axios";
import styled, {keyframes} from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const fillBar = (width) => keyframes`
      0% {
          width: 0px;
      }
      100% {
          width: ${props => width* 300}px;
      }
`;

const BarWrapper = styled.div`
  .leader-bar {
  background-color: #38b6ff;
  height: 20px;
  width: ${props => props.stat/props.max * 300}px;
  margin: 0 0 10px 15px;
  text-align: right;
  animation: ${props => fillBar((props.stat/props.max))} ease 0.5s;
}
`;

export class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      friends: [],
      doneSorting: false
    };
    this.getUserData = this.getUserData.bind(this)
    this.getUserFriends = this.getUserFriends.bind(this)
  }

  componentDidMount() {
    this.getUserData(); 
  }

  getUserData(){ // gets userData for total_applied applications
    axios.get(`/api/user/${localStorage.id}`)
    .then( (results) => {
      this.setState({
        userData: results.data[0]
      }, () => this.getUserFriends()) // gets friends info
    })
    .catch(err => console.error(err))
  }

  getUserFriends(){
    var {first_name, last_name, applied_month } = this.state.userData
    var myStats = {first_name, last_name, applied_month}

    axios
      .get(`/api/friends/${localStorage.id}`)
      .then((res) => {
        var unsorted = res.data
        unsorted.push(myStats)
        var sorted = unsorted.sort((a, b) =>
          a.applied_month > b.applied_month ? - 1 : 1
        );

        this.setState({
          friends: sorted,
          doneSorting: true
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    if (!this.state.doneSorting) { // loading indication until friends are sorted
      return (
        <div style={{ textAlign: "center", paddingTop: "25%" }}>
        <CircularProgress /> Loading...
      </div>
      )
    } else if (this.state.friends.length < 2) { // warning message if there's no friends added
      return (
        <div className="module_component_container">
          <p className="no-leader">To view leaderboard, add friends first.</p>
        </div>
      );
    } else {
      let names = this.state.friends.slice(1).map((friend, i) => {
        return (
          <p className="participant-name" key={i}>
            {i+2}.{" "}
            {friend.first_name + " " + friend.last_name}
          </p>
        );
      });
  
      let bars = this.state.friends.slice(1).map((stat, i) => {
        return (
          <BarWrapper key={i} stat={stat.applied_month} max={this.state.friends[0].applied_month}>
          <div className="leader-bar">
              <span className="weekly-num">{stat.applied_month}</span>
          </div>
          </BarWrapper>
        );
      });
  
        return (
          <div className="module_component_container">
            <div className="leader-header">
              Top users by average{" "}
              <span className="orange-text">applications</span> per{" "}
              <span className="orange-text">week</span>:
            </div>
            <div className="leader-columns">
              <img
                className="crown"
                src="crown.svg"
                alt="crown svg"
                width="35"
                height="35"
              />
              <div className="left-div">
                <div className="leader-rows">
                  <p className="participant-name">
                  1.{" "}
                    {this.state.friends[0].first_name +
                      " " +
                      this.state.friends[0].last_name}
                  </p>
                  <div>
                    {names}
                  </div>
                </div>
              </div>
  
              <div className="divider"></div>
                <div className="right-div">
                  <div className="leader-rows">
                    <div className="leader-bar-first">
                      <span className="weekly-num">
                      {this.state.friends[0].applied_month}
                      </span>
                    </div>
                    <div>
                      {bars}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        );
      
    }
  }
}

export default Leaderboard;
