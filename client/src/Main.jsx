import React from "react";
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
import Statistics from "./components/Statistics/Statistics.jsx";
import Friends from "./components/Friends/Friends.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";
import Jobs from "./components/jobs/Jobs.jsx";
import Logout from "./components/Logout/Logout.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Settings from "./components/Settings/Settings.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  NavLink,
  withRouter,
  Redirect
} from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userId: "",
      users: "",
      currentUser: "",
      friends: [],
      currentUserApplications: [],
      showLogoutModal: false,
    };
    this.getData = this.getData.bind(this);
    this.storeUserData = this.storeUserData.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.getUpdatedUserData = this.getUpdatedUserData.bind(this);
  }

  componentDidMount(){
    this.setState({currentUser: this.props.location.state.userData}, () => {
      axios.get(`/api/friends/${this.state.currentUser.id}`)
      .then((results) => this.setState({friends: results.data}))
      .catch(err => console.error(err))
    })
  }

  storeUserData(data) {
    this.setState({
      currentUser: data,
    });
  }

  getData(id) {
    // route to get all users from user_info, currently not in use
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
      .then((data) => {
        this.setState({
          currentUser: data.data[0],
        });
      })
      .catch((err) => console.error(err));
  }

  handleModal() {
    // this.setState({ showLogoutModal: !this.state.showLogoutModal});

    axios.delete('/api/logout') //TODO: Fix logout
    .then(()=> {
      console.log("logout success....redirecting to Login")
    })
    .catch(err => console.error(err))
  }

  render() {
      if(!this.state.currentUser){
        return (
            <div style={{ textAlign: "center", paddingTop: "25%" }}>
            <CircularProgress /> Loading...
          </div>
        )
      } else {
        let { path, url } = this.props.match;
        return (
        <div>
        <div className="StartUp">
          <div>
            <div className="grid-container">
              <div className="Nav">
                <NavLink className="company_name" to="/">
                  Hire-Mee
                </NavLink>
                <div className="Dashboard">
                  <div className="category_title">Dashboard</div>
                  <div className="category" data-letter="Jobs">
                    <Briefcase color="white" />{" "}
                    <Link className="sidebar_nav_link" to={`${url}/jobs`}>
                      Jobs
                    </Link>
                  </div>
                  <div className="category" data-letter="Statistics">
                    <GraphUp color="white" />{" "}
                    <Link className="sidebar_nav_link" to={`${url}/statistics`}>
                      Statistics
                    </Link>
                  </div>
                  <div className="category" data-letter="Friends">
                    <PersonFill color="white" />
                    <Link className="sidebar_nav_link" to={`${url}/friends`} style={{marginLeft: "5px"}}>
                      Friends
                    </Link>
                  </div>
                  <div className="category" data-letter="Leaderboard">
                    <Trophy color="white" />{" "}
                    <Link
                      className="sidebar_nav_link"
                      to={`${url}/leaderboard`}
                    >
                      Leaderboard
                    </Link>
                  </div>
                  <div className="category" data-letter="Map">
                    <GeoAlt color="white" />{" "}
                    <Link className="sidebar_nav_link" to={`${url}/map`}>
                      Map
                    </Link>
                  </div>
                </div>
                <div className="Account">
                  <div className="category_title">Account</div>
                  <div className="category" data-letter="Settings">
                    <GearFill color="white" />{" "}
                    <Link className="sidebar_nav_link" to={`${url}/settings`}>
                      Settings
                    </Link>
                  </div>
                  <div
                    className="category"
                    data-letter="Logout"
                    onClick={this.handleModal}
                  >
                    <BoxArrowRight color="white" />{" "}
                    <a className="sidebar_nav_link" onClick={this.handleModal}>
                      {" "}
                      Logout{" "}
                    </a>
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
              <div className="Display">
                {
                  <Switch>
                    <Route exact path={`${path}`}>
                      <Jobs
                        currentUser={this.state.currentUser}
                        getUpdatedUserData={this.getUpdatedUserData}
                      />
                    </Route>

                    <Route path={`${path}/jobs`}>
                      <Jobs
                        currentUser={this.state.currentUser}
                        getUpdatedUserData={this.getUpdatedUserData}
                      />
                    </Route>

                    <Route path={`${path}/statistics`}>
                      <Statistics
                        user={this.state.currentUser}
                        user_app_data={this.state.currentUserApplications}
                      />
                    </Route>

                    <Route path={`${path}/friends`}>
                      <Friends currentUser={this.state.currentUser} friends={this.state.friends}/>
                    </Route>

                    <Route path={`${path}/leaderboard`}>
                      <Leaderboard
                        userData={this.state.currentUser}
                      />
                    </Route>

                    <Route path={`${path}/map`}>
                      <MapContainer userData={this.state.currentUser} />
                    </Route>

                    <Route path={`${path}/settings`}>
                      <Settings
                        user={this.state.currentUser}
                        getData={this.getData}
                        loggedIn={this.state.loggedIn}
                        handleModal={this.handleModal}
                      />
                    </Route>
                  </Switch>
                }
              </div>
            </div>
          </div>

          <Logout
            user={this.state.currentUser}
            showLogoutModal={this.state.showLogoutModal}
            handleModal={this.handleModal}
          />
        </div>
      </div>
        );
      }
  }
}

export default withRouter(Main);