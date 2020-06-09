import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

let calculateSalaryDifference = (jobSalary,desiredSalary)=>{

  let numerator = Math.abs(jobSalary - desiredSalary);
  let denominator = (jobSalary + desiredSalary)/2;
  let result = numerator/denominator;

  return Math.round(result * 100);
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

  return (
    <div style={{height:"90%",width:"90%"}}>
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
          <Modal.Title id="example-custom-modal-styling-title">
            <h1 style={style.jobTitle} >{jobInfo.positionTitle}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="popupholder">
            <div className = "popupholder-left">
              <h1 >{jobInfo.companyName}</h1><br />
              Salary: <br />
              {jobInfo.salary} <br />
              Desired {calculateSalaryDifference(jobInfo.salary,desired) + ' %'} <br/>
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