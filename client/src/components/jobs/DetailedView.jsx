import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import axios from "axios";

let calculateSalaryDifference = (desiredSalary, jobSalary) => {
  //let difference = 100 * Math.abs((desiredSalary - jobSalary)/((desiredSalary+jobSalary)/2));

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

let DetailedView = ({ jobInfo, desired, show }) => {
  let updateApplicationStatus = (status) => {
    axios
      .put(`/api/update/${jobInfo.id}`, {
        userid: jobInfo.userid,
        category: status,
        color: jobInfo.color,
        companyName: jobInfo.companyname,
        descr: jobInfo.descr,
        loc: jobInfo.loc,
        positionTitle: jobInfo.positiontitle,
        salary: jobInfo.salary,
        submitDate: jobInfo.submitdate,
        deadline: jobInfo.deadline,
        urlLink: jobInfo.urllink,
      })
      .catch((err) => console.log(err));
  };

  let deleteApplication = () => {
    let deletePrompt = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (deletePrompt) {
      axios
        .delete(`/api/applications/${jobInfo.userid}`)
        .then((res) => {
          window.alert("Application Deleted");
        })
        .catch((err) => {
          console.log(err);
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
            <h1 style={style.jobTitle}>{jobInfo.positiontitle}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ borderRadius: "50px" }}>
          <div
            className="popupholder"
            style={{
              paddingLeft: "60px",
              paddingBottom: "100px",
              letterSpacing: "0.1em",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div className="popupholder-left">
              <h2 style={style.company}>{jobInfo.companyname}</h2>
              <br />

              <div style={style.salary}>
                Salary: <br />${jobInfo.salary} <br />
              </div>

              <div style={style.desired}>
                {moneyTemp(desired, jobInfo.salary)} <br />
              </div>

              <div
                className="submitted-holder"
                style={{ paddingBottom: "15px" }}
              >
                <div style={style.submitted}>
                  Submitted: <br />
                </div>
                <div style={style.submittedDate}>
                  {jobInfo.submitdate} <br />
                </div>
              </div>

              <div
                className="deadline-holder"
                style={{ paddingBottom: "15px" }}
              >
                <div style={style.submitted}>
                  Deadline: <br />
                </div>

                <div style={style.submittedDate}>
                  {jobInfo.deadline} <br />
                </div>
              </div>

              <div
                className="location-holder"
                style={{ paddingBottom: "15px" }}
              >
                <div style={style.submitted}>
                  Location: <br />
                </div>

                <div style={style.submittedDate}>{jobInfo.loc}</div>
              </div>
            </div>

            <div
              className="popupholder-right"
              style={{ paddingTop: "2em", paddingLeft: "10em" }}
            >
              <div className="url-holder">
                <div stle={style.Url}>
                  URL:{" "}
                  <a
                    style={style.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${jobInfo.urllink}`}
                  >
                    Click Me To Go To Job posting
                  </a>
                </div>
              </div>
              <div>
                <div style={style.submitted}>
                  Description: <br />
                </div>
                <div style={style.submittedDate}>{jobInfo.descr}</div>
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
