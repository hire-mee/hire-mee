import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from './Box.jsx';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';


let style = {}
style.applied = {
  textAlign:"center",
  fontWeight: "700",
  fontStyle: "normal",
  color: "rgb(84, 84, 84)",
  textDecoration: "none",
  fontSize:"2vw"
};

style.jobs = {
  textAlign:"center",
  fontWeight: "400",
  fontStyle: "normal",
  color: "rgb(84, 84, 84)",
  textDecoration: "none",
  fontSize:"1vw"
};

class Applied extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      showNew: false,
      companyName:"",
      descr:"",
      loc:"",
      positionTitle:"",
      salary: "",
      submitDate:"",
      deadline:"",
      urlLink:"",
      foo:false,
      status: ""
    }

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.openOrCloseNewApp = this.openOrCloseNewApp.bind(this);
    this.formChecker = this.formChecker.bind(this);
    this.salaryChecker = this.salaryChecker.bind(this);
  }

  openOrCloseNewApp(){
    this.setState({
      showNew: !this.state.showNew
    })
  }

  changeHandler(e){
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formChecker(newApp){
    return new Promise((resolve,reject)=>{
      for(let key in newApp){
        if(newApp[key] === ""){
          reject(new Error('Please Fill In All Text Boxes'));
        }
      }
    resolve('Forms are Gucci!');
    })
  }



  salaryChecker(newAppSal){
    return new Promise((resolve,reject)=>{
      console.log(newAppSal)
      if(Number.isNaN(newAppSal)){
        reject(new Error('Please Type A number for salary'));
        return
      } else {
        resolve('Salary Is Gucci!');
        //this function is called after an object is built that holds the new job info and
        //this was the only way I could submit and clear input fields AFTER the checker functions were called
        this.setState({
          companyName:"",
          descr:"",
          loc:"",
          positionTitle:"",
          salary: "",
          submitDate:"",
          deadline:"",
          urlLink:""
        })
        this.props.render()
        alert('Added New Job Application');
      }
    })
  }

  submitHandler(){

    let newApp = {
      userId: this.props.userid,
      category: "applied",
      companyName: this.state.companyName,
      descr: this.state.descr,
      loc: this.state.loc,
      positionTitle:this.state.positionTitle,
      salary: parseInt(this.state.salary),
      submitDate: this.state.submitDate,
      deadline: this.state.deadline,
      urlLink: this.state.urlLink,
    }

    console.log(newApp);

    this.formChecker(newApp)
    .then((res)=>{
      console.log(res)
      this.salaryChecker(newApp.salary)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.error(err);
        alert(err);
      })
    })
    .then(()=>{
      axios.post(`/api/applications/${newApp.userId}`, newApp)
      .catch((err)=>{
        console.error("Error Posting:",err);
      })
    })
    .catch((err)=>{
      console.log('Error Posting')
      alert(err);
    })
  }


  render(){
    return (

      <div className="applied-component-holder" style={{backgroundColor:"rgb(232, 236, 239)",height:"100%"}}>
        <Grid item xs={12} style={{backgroundColor:"rgb(232, 236, 239)",height:"100%"}}>
          <div className="applied-holder" style={{padding:"1em"}}>
            <p style={style.applied}>Applied</p>
            <p style={style.jobs}>{this.props.applied.length} Job(s)</p>
          </div>

          <div className="" style={{backgroundColor:"white",width:"65%",margin: "0 auto", borderRadius: "3px"}}>
           <h3 style={{textAlign:"center",cursor:"pointer"}} onClick={this.openOrCloseNewApp}>+</h3>
          </div>

          <div className="applied-jobs">
            {this.props.applied.map((jobInfo,i)=>{
            return(
              <Box jobInfo={jobInfo} desired={this.props.desired} key={i}/>
              )
            })}
          </div>

       </Grid>

        <div className="new-application-holder">
          <Modal
          show={this.state.showNew}
          onHide={() => this.openOrCloseNewApp()}
          dialogClassName="detailed-view"
          aria-labelledby="modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="emodal-styling-title" style={{paddingLeft:"50px"}}>
                <h1 style={{color:"rgb(84, 84, 84)",fontSize:"3vw"}}>New Job Application?</h1> <br/>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Grid container direction={"row"} spacing={2}  className="new-app-row-1">

                <Grid item>
                  <TextField required  label="Company Name" name="companyName" onChange={this.changeHandler} value={this.state.companyName}     variant="filled"/>
                </Grid>

                <Grid item>
                  <TextField required  label="Job Location" name="loc"  onChange={this.changeHandler} value={this.state.loc} variant="filled"/>
                </Grid>

                <Grid item>
                  <TextField required  label="Position Title" name="positionTitle" onChange={this.changeHandler} value={this.state. positionTitle}     variant="filled"/>
                </Grid>

                </Grid>

                <Grid container direction={"row"} spacing={2} style={{paddingTop:"10%"}} className="new-app-row-2">

                <Grid item>
                  <TextField required  label="Job Salary" name="salary" onChange={this.changeHandler} value={this.state.salary} variant="filled"/>
                </Grid>

                <Grid item>
                  <TextField required  label="Job Posting Link" name="urlLink" onChange={this.changeHandler} value={this.state.urlLink}       variant="filled"/>
                </Grid>

                <Grid item>
                  <TextField label="Job Description" required name="descr"  onChange={this.changeHandler} value={this.state.descr}  variant="filled"/>
                </Grid>

                </Grid>

                <Grid container direction={"row"} spacing={2} style={{paddingTop:"10%"}} className="new-app-row-3">
                <Grid item>
                  <TextField required  label="Date Submitted" name="submitDate" onChange={this.changeHandler} value={this.state.submitDate}       variant="filled"/>
                </Grid>

                <Grid item>
                  <TextField required  label="Application Deadline" name="deadline"  onChange={this.changeHandler} value={this.state.deadline}      variant="filled"/>
                </Grid>

              </Grid>

              <div className="button-holder" style={{paddingLeft:"75%"}}>
                <Button variant="contained" style={{textAlign:"center"}} color="secondary" onClick={this.submitHandler}> Submit </Button>
              </div>




        </Modal.Body>
       </Modal>
        </div>
      </div>
        )
  }

}

export default Applied;