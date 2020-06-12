import React from 'react';
import Rejected from './Rejected.jsx';
import Applied from './Applied.jsx';
import Offers from './Offers.jsx';
// import Interviews from './Interviews.jsx'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';



//INSERT INTO applications(userId, category, color, companyName, descr, loc, positionTitle, salary, submitDate, deadline, urlLink) VALUES
class Jobs extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      jobInfo: [],
      show: false,
      companyName:"",
      descr:"",
      loc:"",
      positionTitle:"",
      salary: "",
      submitDate:"",
      deadline:"",
      urlLink:"",
      xClicked: false
    }
    this.openOrClosePopup = this.openOrClosePopup.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  openOrClosePopup(){

    this.blink();

    this.setState({
      show: !this.state.show
    })

  }

  blink(){
    console.log('Blink')
      this.setState({
        xClicked: !this.state.xClicked
      })

  }

  changeHandler(e){
    e.preventDefault()
    console.log([e.target.name])

    this.setState({
      [e.target.name]: e.target.value
    },()=>console.log(this.state))
  }

  submitHandler(){
    let newApp = {
      id: 0 ,
      category: "Applied",
      companyName: this.state.companyName,
      descr: this.state.descr,
      loc: this.state.loc,
      positionTitle:this.state.positionTitle,
      salary: this.state.salary,
      submitDate: this.state.submitDate,
      deadline: this.state.deadline,
      urlLink: this.state.urlLink,
    }

    console.log('Submitting...');

    for(let key in newApp){
      if(newApp[key] === ""){
        alert('Please Fill In All Text Boxes');
        return;
      }
    }

    if(typeof parseInt(this.state.salary) !== "number"){
      alert('Please Type a Number for Salary');
      return;
    }

    console.log('Submitted !!!');
  }


  render(){

    let style={}
    style.popup = {
      display: "flex",
      width:"70%",
      height:"70%",
      position: "fixed",
      zIndex:"9",
      backgroundColor: "rgb(232, 236, 239)",
      top: "10%",
      left: "18%"
    }
    style.x ={
      color: this.state.xClicked ? "black" : "grey",
      fontWeight: this.state.xClicked ? "800" : "600",
      cursor:"pointer",
      position:"absolute",
      right:"0",
      top:"0"
    }

    return (
      <div className="jobs" style={{paddingRight:"5%"}} >

        <Grid container spacing={2} >
          <Applied applied={this.props.applied} desired={this.props.desired} openPopup={this.openOrClosePopup}/>

          <div style={{paddingLeft:"1%",width:"25%"}} className="rejected-container">
            <Rejected rejected={this.props.rejected} desired={this.props.desired}/>
          </div >

          {/* <div style={{paddingLeft:"1%",width:"25%"}} className="interviews-container">
            <Interviews interviews={this.props.interviews} desired={this.props.desired}/>
          </div> */}

          <div style={{paddingLeft:"1%",width:"25%"}} className="offers-container">
            <Offers offers={this.props.offered} desired={this.props.desired}/>
          </div>

        </Grid>

      <Slide direction="down" in={this.state.show} mountOnEnter unmountOnExit>

        <div className="new-application-popup" style={style.popup}>
          <h1 style={{color:"rgb(84, 84, 84)",fontSize:"3vw"}}>New Job Application?</h1> <br/>
          <p style={style.x} onClick={this.openOrClosePopup}>X</p>

          <Grid container direction={"column"} spacing={2} style={{paddingTop:"10%"}} className="new-app-row-1">

            <Grid item>
              <TextField required  label="Company Name" name="companyName" onChange={this.changeHandler} value={this.state.companyName}variant="filled"/>
            </Grid>

            <Grid item>
              <TextField required  label="Job Location" name="loc"  onChange={this.changeHandler} value={this.state.loc} variant="filled"/>
            </Grid>

            <Grid item>
              <TextField required  label="Position Title" name="positionTitle" onChange={this.changeHandler} value={this.state.positionTitle} variant="filled"/>
            </Grid>

          </Grid>

          <Grid container direction={"column"} spacing={2} style={{paddingTop:"10%"}} className="new-app-row-2">

            <Grid item>
              <TextField required  label="Job Salary" name="salary" onChange={this.changeHandler} value={this.state.salary} variant="filled"/>
            </Grid>

            <Grid item>
              <TextField required  label="Job Posting Link" name="urlLink" onChange={this.changeHandler} value={this.state.urlLink} variant="filled"/>
            </Grid>

            <Grid item>
              <TextField label="Job Description" required name="descr"  onChange={this.changeHandler} value={this.state.descr} variant="filled"/>
            </Grid>

          </Grid>

          <Grid container direction={"column"} spacing={2} style={{paddingTop:"10%"}} className="new-app-row-3">
            <Grid item>
              <TextField required  label="Date Submitted" name="submitDate" onChange={this.changeHandler} value={this.state.submitDate} variant="filled"/>
            </Grid>

            <Grid item>
              <TextField required  label="Application Deadline" name="deadline"  onChange={this.changeHandler} value={this.state.deadline} variant="filled"/>
            </Grid>

          </Grid>

          <Button variant="contained" color="secondary" onClick={this.submitHandler}> Submit </Button>





        </div>

      </Slide>



      </div>
    )
  }
}

//INSERT INTO applications(userId, category, color, companyName, descr, loc, positionTitle, salary, submitDate, deadline, urlLink) VALUES

export default Jobs;




/*

          <Grid container direction={"row"} spacing={2} style={{paddingTop:"30%",paddingLeft:"10%"}} className="new-app-row-3">
            <Grid item>
              <TextField required  label="Date Submitted" name="submitDate" onChange={this.changeHandler} value={this.state.submitDate} variant="filled"/>
            </Grid>

            <Grid item>
              <TextField required  label="Application Deadline" name="descr"  onChange={this.changeHandler} value={this.state.descr} variant="filled"/>
            </Grid>


          <Grid container direction={"row"} spacing={2} style={{paddingTop:"20%",paddingLeft:"10%"}} className="new-app-row-2">
            <Grid item>
              <TextField required  label="Job Salary" name="salary" onChange={this.changeHandler} value={this.state.salary} variant="filled"/>
            </Grid>

            <Grid item>
              <TextField required  label="Job Description" name="descr"  onChange={this.changeHandler} value={this.state.descr} variant="filled"/>
            </Grid>

            <Grid item>
              <TextField required  label="Job Posting Link" name="urlLink" onChange={this.changeHandler} value={this.state.urlLink} variant="filled"/>
            </Grid>
          </Grid>

          </Grid>



*/