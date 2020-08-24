import React from "react";
import Rejected from "./Rejected.jsx";
import Applied from "./Applied.jsx";
import Offers from "./Offers.jsx";
import Interviews from "./Interviews.jsx";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Modal from "react-bootstrap/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

class Jobs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedJobInfo: false,
      show: false,
      xClicked: false,
      sorted: false,
      render: false,
    };
    this.sortJobInfo = this.sortJobInfo.bind(this);
    this.getApplications = this.getApplications.bind(this);
  }


  sortJobInfo(apps) {
    let jobs = apps;
    let sortedJobInfo = {};
    sortedJobInfo.applied = [];
    sortedJobInfo.rejected = [];
    sortedJobInfo.interview = [];
    sortedJobInfo.offers = [];
    return new Promise((resolve, reject) => {
      jobs.map((job) => {
        if (job.category === "applied") {
          sortedJobInfo.applied.push(job);
        } else if (job.category === "rejected") {
          sortedJobInfo.rejected.push(job);
        } else if (job.category === "interview") {
          sortedJobInfo.interview.push(job);
        } else if (job.category === "offers") {
          sortedJobInfo.offers.push(job);
        } else if (
          job.category === null ||
          job.category === undefined ||
          job.category === ""
        ) {
          reject(new Error("Error Sorting Job Info..."));
        }
      });
      resolve(sortedJobInfo);
    });
  }

  openOrClosePopup() {
    this.setState({
      show: !this.state.show,
    });
  }

  changeHandler(e) {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getApplications() {
    axios
      .get(`/api/applications/${localStorage.id}`)
      .then((data) => {
        this.sortJobInfo(data.data)
          .then((sortedJobs) => {
            this.setState({
              sortedJobInfo: sortedJobs
            }, () => this.props.getUpdatedUserData(localStorage.id))
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error("Error Getting Applications data", err));
  }

  componentDidMount() {
    this.getApplications();
  }

  render() {
    if (!this.state.sortedJobInfo) {
      return (
        <div style={{ textAlign: "center", paddingTop: "25%" }}>
          <CircularProgress /> Loading...
        </div>
      );
    } else {
      return (
        <div className="jobs-component">
          <Grid container spacing={2} style={{ padding: "5px" }}>
            <div className="jobs_applied_column_container">
              <Applied applied={this.state.sortedJobInfo.applied} desired={this.props.currentUser.salary} currentUser={this.props.currentUser} getApplications={this.getApplications} getUpdatedUserData={this.props.getUpdatedUserData} />
            </div>

            <div className="jobs_column_container">
              <Rejected
                rejected={this.state.sortedJobInfo.rejected}
                desired={this.props.currentUser.salary}
                currentUser={this.props.currentUser}
                getApplications={this.getApplications}
              />
            </div>

            <div className="jobs_column_container">
              <Interviews
                interviews={this.state.sortedJobInfo.interview}
                desired={this.props.currentUser.salary}
                currentUser={this.props.currentUser}
                getApplications={this.getApplications}
              />
            </div>

            <div className="jobs_column_container">
              <Offers
                offers={this.state.sortedJobInfo.offers}
                desired={this.props.currentUser.salary}
                currentUser={this.props.currentUser}
                getApplications={this.getApplications}
              />
            </div>
          </Grid>
        </div>
      );
    }
  }
}

export default Jobs;
