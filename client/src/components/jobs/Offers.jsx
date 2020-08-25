import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "./Box.jsx";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import axios from "axios";

class Offers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      company_name: "",
      app_description: "",
      app_location: "",
      position_title: "",
      salary: "",
      submit_date: "",
      deadline: "",
      url_link: "",
      status: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.toggleNewApplicationModal = this.toggleNewApplicationModal.bind(this);
    this.formChecker = this.formChecker.bind(this);
    this.salaryChecker = this.salaryChecker.bind(this);
    this.updateStreaks = this.updateStreaks.bind(this);
  }

  toggleNewApplicationModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  changeHandler(e) {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  formChecker(newApp) {
    return new Promise((resolve, reject) => {
      for (let key in newApp) {
        if (newApp[key] === "") {
          reject(new Error("Please Fill In All Text Boxes"));
        }
      }
      resolve("Forms are Gucci!");
    });
  }

  updateStreaks() {
    let {
      id,
      applied_today,
      applied_month,
      total_applied,
    } = this.props.currentUser;

    axios
      .put(`/api/users/${id}`, {
        applied_today: (applied_today += 1),
        applied_month: (applied_month += 1),
        total_applied: (total_applied += 1),
      })
      .then(() => {
        this.props.getApplications();
        this.props.getUpdatedUserData(id);
      })
      .catch((err) => console.error(err));
  }

  salaryChecker(newAppSal) {
    return new Promise((resolve, reject) => {
      if (Number.isNaN(newAppSal)) {
        reject(new Error("Please Type A number for salary"));
        return;
      } else {
        resolve("Salary Is Gucci!");
        //this function is called after an object is built that holds the new job info and
        //this was the only way I could submit and clear input fields AFTER the checker functions were called
        this.setState({
          company_name: "",
          app_description: "",
          app_location: "",
          position_title: "",
          salary: "",
          submit_date: "",
          deadline: "",
          url_link: "",
        },  () => this.toggleNewApplicationModal());
      }
    });
  }

  submitHandler() {
    let { id, total_applied } = this.props.currentUser;
    let {
      company_name,
      app_description,
      app_location,
      position_title,
      submit_date,
      deadline,
      url_link,
      salary,
    } = this.state;
    let newApp = {
      user_id: id,
      category: "offers",
      company_name: company_name,
      app_description: app_description,
      app_location: app_location,
      position_title: position_title,
      salary: parseInt(salary),
      submit_date: submit_date,
      deadline: deadline,
      url_link: url_link,
      total_applied: total_applied++,
    };

    this.formChecker(newApp).then((res) => {
      this.salaryChecker(newApp.salary).catch((err) => {
        console.error(err);
        alert(err);
      });
    });

    axios
      .post(`/api/applications/${id}`, newApp)
      .then((data) => {
        this.updateStreaks();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="applied-component-holder">
        <Grid
          item
          xs={12}
          className="jobs_component_column_subcontainer"
        >
          <div className="applied-holder">
            <p className="applications_columns">Offers</p>
            <p className="applications_count_number">
              {this.props.offers.length} Offer(s)
            </p>
          </div>

          <div
            className=""
            style={{
              backgroundColor: "white",
              width: "65%",
              margin: "0 auto 16px auto",
              borderRadius: "3px"
            }}
          >
            <h3
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={this.toggleNewApplicationModal}
            >
              +
            </h3>
          </div>

          <div className="applied-jobs">
            {this.props.offers.map((jobInfo, i) => {
              return (
                <Box
                  jobInfo={jobInfo}
                  desired={this.props.desired}
                  key={i}
                  getApplications={this.props.getApplications}
                />
              );
            })}
          </div>
        </Grid>

        <div className="new-application-holder">
          <Modal
            show={this.state.modalOpen}
            onHide={() => this.toggleNewApplicationModal()}
            dialogClassName="detailed-view"
            aria-labelledby="modal-styling-title"
          >
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title className="modal-title">
                <h1 style={{ color: "rgb(84, 84, 84)", fontSize: "30px" }}>
                  New Offer Entry
                </h1>{" "}
                <br />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ margin: "auto" }}>
              <Grid
                container
                direction={"row"}
                spacing={3}
                className="new-app-row-1"
                style={{ paddingTop: "20px" }}
              >
                <Grid item>
                  <TextField
                    required
                    label="Company Name"
                    name="company_name"
                    onChange={this.changeHandler}
                    value={this.state.company_name}
                    variant="outlined"
                  />
                </Grid>

                <Grid item>
                  <TextField
                    required
                    label="Job Location"
                    name="app_location"
                    placeholder="Ex: 1442 2nd St A Santa Monica CA"
                    onChange={this.changeHandler}
                    value={this.state.app_location}
                    variant="outlined"
                  />
                </Grid>

                <Grid item>
                  <TextField
                    required
                    label="Position Title"
                    name="position_title"
                    onChange={this.changeHandler}
                    value={this.state.position_title}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction={"row"}
                spacing={3}
                style={{ paddingTop: "5%" }}
                className="new-app-row-2"
              >
                <Grid item>
                  <TextField
                    required
                    label="Salary"
                    name="salary"
                    onChange={this.changeHandler}
                    value={this.state.salary}
                    variant="outlined"
                  />
                </Grid>

                <Grid item>
                  <TextField
                    required
                    label="Job Posting Link"
                    name="url_link"
                    onChange={this.changeHandler}
                    value={this.state.url_link}
                    variant="outlined"
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label="Description"
                    required
                    name="app_description"
                    onChange={this.changeHandler}
                    value={this.state.app_description}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction={"row"}
                spacing={3}
                style={{ paddingTop: "5%" }}
                className="new-app-row-3"
              >
                <Grid item>
                  <TextField
                    required
                    label="Date Submitted"
                    name="submit_date"
                    onChange={this.changeHandler}
                    value={this.state.submit_date}
                    variant="outlined"
                    placeholder={"Ex: 01/01/2020"}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    required
                    label="Application Deadline"
                    name="deadline"
                    onChange={this.changeHandler}
                    value={this.state.deadline}
                    variant="outlined"
                    placeholder={"Ex: 01/01/2020"}
                  />
                </Grid>
              </Grid>

              <div
                className="button-holder"
                style={{
                  paddingLeft: "550px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <Button
                  variant="contained"
                  style={{ textAlign: "center" }}
                  color="secondary"
                  onClick={() => this.submitHandler()}
                >
                  {" "}
                  Submit{" "}
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Offers;
