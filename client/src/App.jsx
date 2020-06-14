import React from 'react';
import axios from 'axios';

import { Briefcase, GraphUp, Trophy, GeoAlt, PersonFill, GearFill, PauseFill, ArrowClockwise, BoxArrowRight } from 'react-bootstrap-icons';
import MapContainer from './components/Map/Map.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Login from './components/LogIn/Login.jsx';
import Statistics from './components/Statistics/Statistics.jsx';
import Jobs from './components/jobs/Jobs.jsx';
import Logout from './components/Logout/Logout.jsx';
import Profile from './components/Profile/Profile.jsx';
import Settings from './components/Settings/Settings.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      page: 'Signup',
      userId: '',
      users: '',
      currentUser: '',
      logoutBox: false,
      jobInfo:[{positionTitle: "Full Stack WebDeveloper",companyName: "Google", salary: 150000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real",category:"applied" },{positionTitle: "Front End WebDeveloper",companyName: "Facebook", salary: 100000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real",category:"applied" },{positionTitle: "Back End WebDeveloper",companyName: "Amazon", salary: 120000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real",category:"applied" },{positionTitle: "Software Engineer",companyName: "IBM", salary: 125000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"San Diego, Ca", urlLink:"https://www.google.com/",descr:"not real",category:'rejected' }, {positionTitle: "React Developer",companyName: "GO Daddy", salary: 90000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Los Angeles, Ca", urlLink:"https://www.google.com/",descr:"not real",category:'rejected'}, {positionTitle: "Software Engineer 1",companyName: "Weedmaps", salary: 200000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"https://www.google.com/",descr:"not real",category:"interview" }, {positionTitle: "Software Engineer 3",companyName: "Apple", salary: 200000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Remote", urlLink:"https://www.google.com/",descr:"not real",category:"offers" } ],

      desired: 120000,

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
    this.getData();
  }

  componentStartUp() {
    if (this.state.page === 'Signup') {
      return <SignUp changePage={this.changePage}/>
    } else if (this.state.page === 'Login') {
      return <Login
      changePage={this.changePage}
      storeUserData={this.storeUserData}/>
    } else {
      return (
        <div>
          <div className="grid-container">
            <div className="Nav">
              <div className="company_name">Hire-Mee</div>
              <div className="Dashboard">
                <div className="category_title">Dashboard</div>
                <div className="category" data-letter="Jobs" onClick={() => this.changePage('page', 'Jobs')}><Briefcase color="white" /> Jobs</div>
                <div className="category" data-letter="Statistics" onClick={() => this.changePage('page', 'Statistics')}><GraphUp color="white" /> Statistics</div>
                <div className="category" data-letter="Leaderboard" onClick={() => this.changePage('page', 'Leaderboard')}><Trophy color="white" /> Leaderboard</div>
                <div className="category" data-letter="Map" onClick={() => this.changePage('page', 'Map')}><GeoAlt color="white" /> Map</div>
                <div className="category" data-letter="Friends" onClick={() => this.changePage('page', 'Friends')}><PersonFill color="white" /> Friends</div>
              </div>
              <div className="Account">
                <div className="category_title">Account</div>
                <div className="category" data-letter="Settings" onClick={() => this.changePage('page', 'Settings')}><GearFill color="white" /> Settings</div>
                <div className="category" data-letter="Logout" onClick={this.handleModal}><BoxArrowRight color="white" /> Logout</div>
              </div>
            </div>
            <div className="Header">
              <div className="Header-title">{this.state.page}</div>
              <div className="Profile-area"><Profile userData={this.state.currentUser} getUpdatedData={this.getUpdatedUserData}/></div>
            </div>
            <div className="Display">{this.componentHandler()}</div>
          </div>
        </div>
      )
    }
  }

  componentHandler() {
      if (this.state.page === 'Jobs') {
        return <Jobs desired={this.state.desired} jobsInfo = {this.state.jobInfo}/>
      } else if (this.state.page === 'Statistics') {
        return <Statistics user={this.state.currentUser} />
      } else if (this.state.page === 'Leaderboard') {
        return (<div id='Leaderboard'></div>)
      } else if (this.state.page === 'Map') {
        return <MapContainer />
      } else if (this.state.page === 'Friends') {
        return (<div id='Friends'></div>)
      } else if (this.state.page === 'Settings') {
        return <Settings user={this.state.currentUser} getData={this.getData} changePage={this.changePage} loggedIn={this.state.loggedIn} handleModal={this.handleModal}/>
      } else if (this.state.page === 'Signup'){
        return <SignUp/>
      }
  }

  componentSignOut() {
    if (this.state.logoutBox) {
      return (<Logout user={this.state.currentUser} show={this.state.logoutBox} handleModal={this.handleModal} changePage={this.changePage} />)
    }
  }

  storeUserData(data) {
    this.setState({
      currentUser: data
    }, () => console.log(this.state.currentUser))
  }

  getData() {
    axios
      // .get(`/api/user/${this.state.userId}`) //commented out for data testing
      .get(`/api/users`)
      .then(data => {
        this.setState({
          users: data.data,
          currentUser: data.data[0],
        }, () => console.log(this.state.currentUser))
      })
      .catch(err => console.error(err))
  }

  getUpdatedUserData(id){
    axios.get(`/api/user/${id}`)
    .then(data => {
      this.setState({
        currentUser: data.data[0]
      })
    })
    .catch(err => console.error(err))
  }

  changePage(key, value) {
    this.setState({
      [key]: value
    })
  }

  handleModal() {
    this.setState({logoutBox: !this.state.logoutBox})
  }

  render() {
    console.log('LOGGED IN', this.state.loggedIn);
    return (
      <div>
        <div className="StartUp">
          {this.componentStartUp()}
          {this.componentSignOut()}
          <button onClick={() => this.changePage('page', 'Jobs')}>LOGGED IN</button>
        </div>
      </div>
    );
  }
}

export default App;

