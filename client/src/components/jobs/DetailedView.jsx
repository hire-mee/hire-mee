import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import axios from "axios";

let calculateSalaryDifference = (desiredSalary, jobSalary) => {
  if (desiredSalary < jobSalary) {
    return jobSalary - desiredSalary;
  } else if (desiredSalary === jobSalary) {
    return "Salary is exactly what you are looking for";
  } else {
    return desiredSalary - jobSalary;
  }
};

let plusOrMinus = (desiredSalary, jobSalary) => {
  if (desiredSalary < jobSalary) {
    return "+$";
  } else if (desiredSalary === jobSalary) {
    return "";
  } else {
    return "-$";
  }
};

let moneyTemp = (desiredSalary, jobSalary) => {
  if (desiredSalary < jobSalary) {
    return (
      <div style={style.desired}>
        Desired:{" "}
        {plusOrMinus(desired, jobInfo.salary) +
          calculateSalaryDifference(desired, jobInfo.salary)}
      </div>
    );
  } else if (desiredSalary === jobSalary) {
    return (
      <div
        style={{
          color: "rgb(32, 187, 136)",
          fontWeight: "700",
          fontStyle: "normal",
        }}
      >
        <MonetizationOnIcon style={{ color: green[500] }} /> Salary is exactly
        what you are looking for !!!
      </div>
    );
  } else {
    return (
      <div style={style.desired}>
        Desired:{" "}
        {plusOrMinus(desired, jobInfo.salary) +
          calculateSalaryDifference(desired, jobInfo.salary)}
      </div>
    );
  }
};

let DetailedView = ({ jobInfo, desired, show, getApplications }) => {
  let updateApplicationStatus = (status) => {
    axios
      .put(`/api/update/${jobInfo.id}`, {
        user_id: jobInfo.user_id,
        category: status,
        color: jobInfo.color,
        company_name: jobInfo.company_name,
        app_description: jobInfo.app_description,
        app_location: jobInfo.app_location,
        position_title: jobInfo.position_title,
        salary: jobInfo.salary,
        submit_date: jobInfo.submit_date,
        deadline: jobInfo.deadline,
        url_link: jobInfo.url_link,
      })
      .then((data) => {
        getApplications();
      })
      .catch((err) => console.error(err));
  };

  let deleteApplication = () => {
    let deletePrompt = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (deletePrompt) {
      axios
        .delete(`/api/applications/${jobInfo.user_id}`)
        .then((res) => {
          window.alert("Application Deleted");
          getApplications();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const style = {};

  style.jobTitle = {
    fontWeight: "400",
    fontStyle: "normal",
    color: "rgb(82, 89, 112)",
    textDecoration: "none",
    lineHeight: "1.4",
    fontFamily: "YACkoM60Ufo 0, _fb_, auto",
    fontWeight: "bold",
  };

  style.company = {
    fontWeight: "400",
    fontStyle: "normal",
    color: "rgb(56, 182, 255)",
    textDecoration: "none",
    lineHeight: "1.4",
    fontFamily: "YACkoA9eHeY 0, _fb_, auto",
    fontSize: "42.6667px",
  };

  style.desired = {
    fontWeight: "700",
    fontStyle: "normal",
    color: desired < jobInfo.salary ? "rgb(32, 187, 136)" : "rgb(220,20,60)",
    paddingBottom: "15px",
  };

  style.salary = {
    fontWeight: "400",
    fontStyle: "normal",
    color: "rgb(0, 0, 0)",
    lineHeight: "1.4",
    fontSize: "21.3333px",
  };

  style.submitted = {
    fontWeight: "400",
    fontStyle: "normal",
    color: "rgb(0, 0, 0)",
    textDecoration: "none",
    lineHeight: "1.4",
    fontFamily: "YACkoA9eHeY 0, _fb_, auto",
    fontSize: "21.3333px",
  };

  style.submittedDate = {
    fontWeight: "400",
    fontStyle: "normal",
    color: "rgb(84, 84, 84)",
    textDecoration: "none",
    lineHeight: "1.4",
    fontFamily: "YACkoA9eHeY 0, _fb_, auto",
    fontSize: "19.8757px",
    textTransform: "none",
    fontWeight: "300",
  };

  style.Url = {
    fontWeight: "400",
    fontStyle: "normal",
    color: "rgb(0, 0, 0)",
    textDecoration: "none",
    lineHeight: "1.4",
    fontFamily: "YACkoA9eHeY 0, _fb_, auto",
    fontSize: "21.3333px",
    textTransform: "none",
  };

  style.link = {
    fontWeight: "400",
    fontStyle: "normal",
    color: "rgb(56, 182, 255)",
    textDecoration: "none",
    lineHeight: "1.4",
    fontFamily: "YACkoA9eHeY 0, _fb_, auto",
    fontSize: "21.2201px",
    textTransform: "none",
    cursor: "pointer",
  };

  let moneyTemp = (desiredSalary, jobSalary) => {
    if (desiredSalary < jobSalary) {
      return (
        <div style={style.desired}>
          Desired:{" "}
          {plusOrMinus(desired, jobInfo.salary) +
            calculateSalaryDifference(desired, jobInfo.salary)}
        </div>
      );
    } else if (desiredSalary === jobSalary) {
      return (
        <div
          style={{
            color: "rgb(32, 187, 136)",
            fontWeight: "700",
            fontStyle: "normal",
          }}
        >
          <MonetizationOnIcon
            style={{ color: "green[500]" }}
            fontSize="large"
          />{" "}
          Salary is exactly what you are looking for !!!
        </div>
      );
    } else {
      return (
        <div style={style.desired}>
          Desired:{" "}
          {plusOrMinus(desired, jobInfo.salary) +
            calculateSalaryDifference(desired, jobInfo.salary)}
        </div>
      );
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={() => {}}
        dialogClassName="detailed-view"
        aria-labelledby="modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="emodal-styling-title"
            style={{ paddingLeft: "50px" }}
          >
            <h1 className="detailedView_position_text">
              {jobInfo.position_title}
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ borderRadius: "50px" }}>
          <div
            className="popupholder"
            style={{
              paddingLeft: "60px",
              paddingBottom: "100px",
              paddingTop: "1em",
              letterSpacing: "0.1em",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div className="popupholder-left">
              <h2 className="detailedView_position_company_text">
                {jobInfo.company_name}
              </h2>
              <br />

              <div className="detailedView_position_salary_text">
                Salary: <br />${jobInfo.salary} <br />
              </div>

              <div style={style.desired}>
                {moneyTemp(desired, jobInfo.salary)} <br />
              </div>

              <div
                className="submitted-holder"
                style={{ paddingBottom: "15px" }}
              >
                <div className="detailedView_position_submitted_text">
                  Submitted: <br />
                </div>
                <div className="detailedView_position_submitted_date">
                  {jobInfo.submit_date} <br />
                </div>
              </div>

              <div
                className="deadline-holder"
                style={{ paddingBottom: "15px" }}
              >
                <div className="detailedView_position_submitted_text">
                  Deadline: <br />
                </div>

                <div className="detailedView_position_submitted_date">
                  {jobInfo.deadline} <br />
                </div>
              </div>

              <div
                className="location-holder"
                style={{ paddingBottom: "15px" }}
              >
                <div className="detailedView_position_submitted_text">
                  Location: <br />
                </div>

                <div className="detailedView_position_submitted_date">
                  {jobInfo.app_location}
                </div>
              </div>
            </div>

            <div
              className="popupholder-right"
              style={{ paddingTop: "1em", paddingLeft: "5em" }}
            >
              <div className="url-holder">
                <div className="detailedView_position_url">
                  URL:{" "}
                  <a
                    className="detailedView_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${jobInfo.url_link}`}
                  >
                    Click Me To Go To Job posting
                  </a>
                </div>
              </div>
              <div>
                <div className="detailedView_position_submitted_text">
                  Description: <br />
                </div>
                <div className="detailedView_position_submitted_date">
                  {jobInfo.app_description}
                </div>
                <ul className="detailedView_update_button_container">
                  <button
                    className="detailedView_update_rejected"
                    onClick={() => updateApplicationStatus("rejected")}
                  >
                    Rejected
                  </button>
                  <button
                    className="detailedView_update_interviews"
                    onClick={() => updateApplicationStatus("interview")}
                  >
                    Interviews
                  </button>
                  <button
                    className="detailedView_update_offers"
                    onClick={() => updateApplicationStatus("offers")}
                  >
                    Offers
                  </button>
                  <button
                    className="detailedView_delete_app"
                    onClick={() => deleteApplication("offers")}
                  >
                    Delete
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DetailedView;
