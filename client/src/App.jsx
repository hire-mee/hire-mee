import React from 'react';
import MapContainer from './components/Map/Map.jsx';
import SignUp from './components/SignUp/SignUp.jsx';

import Jobs from './components/jobs/Jobs.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signUp: false,
      map: true,
      appliedJobs:[{positionTitle: "Full Stack WebDeveloper",companyName: "Google", salary: 150000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"www.fake",descr:"not real" },{positionTitle: "Front End WebDeveloper",companyName: "Facebook", salary: 100000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"www.fake",descr:"not real" },{positionTitle: "Back End WebDeveloper",companyName: "Amazon", salary: 120000, submitDate: "06/05/2020",  deadLine: "06/2020",loc:"Mountain View, Ca", urlLink:"www.fake",descr:"not real" }],

      onSite: [{positionTitle: "Full Stack WebDeveloper",companyName: "google", salary: 100000, submittedDate: "06/05/2020",deadLine: "06/2020",loc:"Mountain View, Ca", link:"www.fake",descr:"not real" },{positionTitle: "Full Stack WebDeveloper",companyName: "google", salary: 100000, submittedDate: "06/05/2020",deadLine: "06/2020",loc:"Mountain View, Ca", link:"www.fake",descr:"not real" },{positionTitle: "Full Stack WebDeveloper",companyName: "google", salary: 100000, submittedDate: "06/05/2020",deadLine: "06/2020",loc:"Mountain View, Ca", link:"www.fake",descr:"not real" }],

      rejected: [{positionTitle: "Full Stack WebDeveloper",companyName: "google", salary: 100000, submittedDate: "06/05/2020",deadLine: "06/2020",loc:"Mountain View, Ca", link:"www.fake",descr:"not real" },{positionTitle: "Full Stack WebDeveloper",companyName: "google", salary: 100000, submittedDate: "06/05/2020",deadLine: "06/2020",loc:"Mountain View, Ca", link:"www.fake",descr:"not real" },{positionTitle: "Full Stack WebDeveloper",companyName: "google", salary: 100000, submittedDate: "06/05/2020",deadLine: "06/2020",loc:"Mountain View, Ca", link:"www.fake",descr:"not real" }],

      offered: [{positionTitle: "Full Stack WebDeveloper",companyName: "google", salary: 100000, submittedDate: "06/05/2020",deadLine: "06/2020",loc:"Mountain View, Ca", link:"www.fake",descr:"not real" },{positionTitle: "Full Stack WebDeveloper",companyName: "google", salary: 100000, submittedDate: "06/05/2020",deadLine: "06/2020",loc:"Mountain View, Ca", link:"www.fake",descr:"not real" },{positionTitle: "Full Stack WebDeveloper",companyName: "google", salary: 100000, submittedDate: "06/05/2020",deadLine: "06/2020",loc:"Mountain View, Ca", link:"www.fake",descr:"not real" }],

      desired: 120000
    }
    this.componentHandler = this.componentHandler.bind(this);
  }

  componentHandler() {
    if (this.state.map === true) {
      return <MapContainer />;
    }
  }

  render() {

    return (
      <div>

          <Jobs applied={this.state.appliedJobs} desired={this.state.desired} onSite={this.state.onSite} rejected={this.state.rejected}/>

      </div>
    );

  }

}

export default App;

/*   <div className="navbar">
          <div className="title">Hire-Mee</div>
          <div className="dashboard">
            <div className="applications">Applications</div>
            <div className="statistics">Statistics</div>
            <div className="leaderboard">Leaderboard</div>
            <div className="map">Map</div>
            <div className="friends">Friends</div>
          </div>
          <div className="account">
            <div className="settings">Settings</div>
            <div className="pause">Pause</div>
            <div className="resetWeek">Reset Week</div>
            <div className="logout">Logout</div>
          </div>
        </div>

           <div>{this.componentHandler()}</div>
 */
