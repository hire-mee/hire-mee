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
      logoutToggled: false
    };
    this.componentInitialMountGetData = this.componentInitialMountGetData.bind(this);
    this.storeUserData = this.storeUserData.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.getUpdatedUserData = this.getUpdatedUserData.bind(this);
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount(){
    this.componentInitialMountGetData(); // initial call function to set data into state to be passed to other components
  }

  storeUserData(data) {
    this.setState({
      currentUser: data,
    });
  }

  componentInitialMountGetData() {
      axios.get(`/api/user/${localStorage.id}`) // first get data from localID and set state with retrieved user info
      .then((results) => {
        this.setState({
           currentUser: results.data 
          }, () => {
            axios.get(`/api/friends/${localStorage.id}`) // then retrieve friends data
            .then((results) => this.setState({
              friends: results.data
              }))
            .catch(err => console.error(err))
        })
      })
      .catch(err => console.error(err))
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
    this.setState({ showLogoutModal: !this.state.showLogoutModal});
  }

  handleLogout(){
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    console.log(localStorage)
    this.setState({logoutToggled: true})
  }

  render() {
      if(!this.state.currentUser){
        return (
            <div style={{ textAlign: "center", paddingTop: "25%" }}>
            <CircularProgress /> Loading...
          </div>
        )
      } else if (this.state.logoutToggled) {
        return( 
        <Redirect to={{
          pathname: "/login"
        }}/> 
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
                    <a className="sidebar_nav_link" onClick={this.handleModal} style={{cursor:"pointer", color:"#6a6e7b"}}>
                      Logout
                    </a>
                  </div>
                </div>

              </div> {/* end of Nav element */}


              <div className="Main_Display_with_header_container">
                  
                <div className="Header">
                  <div className="Header-title">Welcome!</div>
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
                          <Friends friends={this.state.friends}/>
                        </Route>

                        <Route path={`${path}/leaderboard`}>
                          <Leaderboard
                            userData={this.state.currentUser}
                          
                          />
                        </Route>

                        <Route path={`${path}/map`}>
                          <MapContainer 
                            userData={this.state.currentUser}
                          
                          />
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

                </div> {/*end of main display with header container */}


            </div>
          </div>

          <Logout
            user={this.state.currentUser}
            showLogoutModal={this.state.showLogoutModal}
            handleModal={this.handleModal}
            handleLogout={this.handleLogout}
          />
        </div>
      </div>
        );
      }
  }
}

export default withRouter(Main);
