import React from 'react';
import axios from "axios";
import {
  Briefcase,
  GraphUp,
  Trophy,
  GeoAlt,
  PersonFill,
  GearFill,
  PauseFill,
  ArrowClockwise,
  BoxArrowRight,
} from "react-bootstrap-icons";
import MapContainer from "./components/Map/MapView.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import Login from "./components/LogIn/Login.jsx";
import Statistics from "./components/Statistics/Statistics.jsx";
import Friends from "./components/Friends/Friends.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";
import Jobs from "./components/jobs/Jobs.jsx";
import Logout from "./components/Logout/Logout.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Settings from "./components/Settings/Settings.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      page: "Signup",
      userId: "",
      users: "",
      currentUser: "",
      // friends: [],
      currentUserApplications: [],
      logoutBox: false,
    };
    this.componentHandler = this.componentHandler.bind(this);
    this.componentStartUp = this.componentStartUp.bind(this);
    this.getData = this.getData.bind(this);
    this.changePage = this.changePage.bind(this);
    this.storeUserData = this.storeUserData.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.componentSignOut = this.componentSignOut.bind(this);
    this.getUpdatedUserData = this.getUpdatedUserData.bind(this);
  }

  componentDidMount() {
    // console.log("testing");
  }

  componentStartUp() {
    if (this.state.page === "Signup") {
      return <SignUp changePage={this.changePage} />;
    } else if (this.state.page === "Login") {
      return (
        <Login
          changePage={this.changePage}
          storeUserData={this.storeUserData}
        />
      );
      // <div className="category" data-letter="Friends" onClick={() => this.changePage('page', 'Friends')}><PersonFill color="white" /> Friends</div>
      //   <div className="category" data-letter="Leaderboard" onClick={() => this.changePage('page', 'Leaderboard')}><Trophy color="white" /> Leaderboard</div>
      // <div className="category" data-letter="Map" onClick={() => this.changePage('page', 'Map')}><GeoAlt color="white" /> Map</div>
    } else {
      return (
        <div>
          <div className="grid-container">
            <div className="Nav">
              <div
                className="company_name"
                onClick={() => this.changePage("page", "Jobs")}
              >
                Hire-Mee
              </div>
              <div className="Dashboard">
                <div className="category_title">Dashboard</div>
                <div
                  className="category"
                  data-letter="Jobs"
                  onClick={() => this.changePage("page", "Jobs")}
                >
                  <Briefcase color="white" /> Jobs
                </div>
                <div
                  className="category"
                  data-letter="Statistics"
                  onClick={() => this.changePage("page", "Statistics")}
                >
                  <GraphUp color="white" /> Statistics
                </div>
                <div
                  className="category"
                  data-letter="Friends"
                  onClick={() => this.changePage("page", "Friends")}
                >
                  <PersonFill color="white" /> Friends
                </div>
                <div
                  className="category"
                  data-letter="Leaderboard"
                  onClick={() => this.changePage("page", "Leaderboard")}
                >
                  <Trophy color="white" /> Leaderboard
                </div>
                <div
                  className="category"
                  data-letter="Map"
                  onClick={() => this.changePage("page", "Map")}
                >
                  <GeoAlt color="white" /> Map
                </div>
              </div>
              <div className="Account">
                <div className="category_title">Account</div>
                <div
                  className="category"
                  data-letter="Settings"
                  onClick={() => this.changePage("page", "Settings")}
                >
                  <GearFill color="white" /> Settings
                </div>
                <div
                  className="category"
                  data-letter="Logout"
                  onClick={this.handleModal}
                >
                  <BoxArrowRight color="white" /> Logout
                </div>
              </div>
            </div>
            <div className="Header">
              <div className="Header-title">{this.state.page}</div>
              <div className="Profile-area">
                <Profile
                  userData={this.state.currentUser}
                  getUpdatedData={this.getUpdatedUserData}
                />
              </div>
            </div>
            <div className="Display">{this.componentHandler()}</div>
          </div>
        </div>
      );
    }
  }

  componentHandler() {
    if (this.state.page === "Jobs") {
      return (
        <Jobs
          desired={this.state.currentUser}
          currentUser={this.state.currentUser}
          changePage={this.changePage}
          getUpdatedUserData={this.getUpdatedUserData}
        />
      );
    } else if (this.state.page === "Statistics") {
      if (!this.state.currentUser.total_applied) {
        return (
          <div id="emptyStatisticsMessage">
            Submit applications to see your statistics here!
          </div>
        );
      }
      return (
        <Statistics
          user={this.state.currentUser}
          getData={this.getData}
          user_app_data={this.state.currentUserApplications}
        />
      );
    } else if (this.state.page === "Leaderboard") {
      return <Leaderboard id={this.state.currentUser.id} userData={this.state.currentUser} />;
    } else if (this.state.page === "Leaderboard") {
      return (
        <div>
          <h1>Under Construction!</h1>
          <img src="./Leaderboard.png" id="Leaderboard"></img>
        </div>
      );
    } else if (this.state.page === "Map") {
      return <MapContainer userData={this.state.currentUser} />;
    } else if (this.state.page === "Friends") {
      return <Friends id={this.state.currentUser.id} />;
    } else if (this.state.page === "Settings") {
      return (
        <Settings
          user={this.state.currentUser}
          getData={this.getData}
          changePage={this.changePage}
          loggedIn={this.state.loggedIn}
          handleModal={this.handleModal}
        />
      );
    } else if (this.state.page === "Signup") {
      return <SignUp />;
    }
  }

  componentSignOut() {
    if (this.state.logoutBox) {
      return (
        <Logout
          user={this.state.currentUser}
          show={this.state.logoutBox}
          handleModal={this.handleModal}
          changePage={this.changePage}
        />
      );
    }
  }

  storeUserData(data) {
    this.setState({
      currentUser: data,
    });
  }

  getData(id) {
    axios
      .get(`/api/users`)
      .then((data) => {
        this.setState({
          users: data.data,
          currentUser: data.data[0],
        });
      })
      .catch((err) => console.error(err));
  }

  getUpdatedUserData(id) {
    axios
      .get(`/api/user/${id}`)
      // .get(`/api/user/1`)
      .then((data) => {
        this.setState({
          currentUser: data.data[0],
        });
      })
      .catch((err) => console.error(err));
  }

  changePage(key, value) {
    this.setState({
      [key]: value,
    });
  }

  handleModal() {
    this.setState({ logoutBox: !this.state.logoutBox });
  }

  render() {
    return (
      <div>
        <div className="StartUp">
          {this.componentStartUp()}
          {this.componentSignOut()}
        </div>
      </div>
    );
  }
}

export default App;