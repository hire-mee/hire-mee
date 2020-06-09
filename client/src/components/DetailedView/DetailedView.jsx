import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

let calculateSalaryDifference = (desiredSalary,jobSalary)=>{
  let difference = 100 * Math.abs((desiredSalary - jobSalary)/((desiredSalary+jobSalary)/2));

  return  Math.round(difference);
};

let plusOrMinus = (desiredSalary,jobSalary) =>{
  if(desiredSalary < jobSalary){
    return '+'
  } else {
    return '-'
  }
};

let DetailedView = ({jobInfo, desired}) => {
  const [show, setShow] = useState(false);
  const style = {};

  style.jobTitle = {
    fontWeight:"400",
    fontStyle: "normal",
    color:"rgb(82, 89, 112)",
    textDecoration:"none",
    lineHeight: "1.4",
    fontFamily: "YACkoM60Ufo 0, _fb_, auto"
  };

  style.company = {
    fontWeight: "400",
    fontStyle: "normal",
    color: "rgb(56, 182, 255)",
    textDecoration: "none",
    lineHeight: "1.4",
    fontFamily: "YACkoA9eHeY 0, _fb_, auto",
    fontSize: "42.6667px"
  };

  style.desired = {
    fontWeight: "700",
    fontStyle: "normal",
    color: desired < jobInfo.salary ? "rgb(32, 187, 136)" : "rgb(220,20,60)"
  }

  return (
    <div >
      <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="detailed-view"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title" style={{paddingLeft:"50px"}}>
            <h1 style={style.jobTitle} >{jobInfo.positionTitle}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="popupholder" style={{paddingLeft: "60px",paddingBottom:"100px"}}>
            <div className = "popupholder-left">
              <h1 style={style.company}>{jobInfo.companyName}</h1><br />
              Salary: <br />
              ${jobInfo.salary} <br />
              <div style={style.desired}>
                Desired {plusOrMinus(desired,jobInfo.salary) + calculateSalaryDifference(desired,jobInfo.salary) + ' %'} <br/>
              </div>
              Submitted: <br />
              {jobInfo.submitDate} <br />
              Deadline: <br />
              {jobInfo.deadLine} <br />
              Location: <br />
              {jobInfo.loc}
            </div>
            <div className = "popupholder-right">

            </div>
          </div>

        </Modal.Body>
      </Modal>
    </div>
  );
}


export default DetailedView;