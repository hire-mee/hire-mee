import React from 'react';
import Rejected from './Rejected.jsx';
import Applied from './Applied.jsx';
import Offers from './Offers.jsx';
import Interviews from './Interviews.jsx'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Modal from 'react-bootstrap/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

class Jobs extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      sortedJobInfo: false,
      show: false,
      showNew: false,
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
    this.openOrCloseNewApp = this.openOrCloseNewApp.bind(this);
    this.sortJobInfo = this.sortJobInfo.bind(this);
    this.formChecker = this.formChecker.bind(this);
    this.getApplications = this.getApplications.bind(this);
  }

  sortJobInfo(apps){
    //promise ;)
    let jobs = apps;
    let sortedJobInfo = {};

    sortedJobInfo.applied = [];
    sortedJobInfo.rejected = [];
    sortedJobInfo.interview = [];
    sortedJobInfo.offers = [];

    console.log('Sorting...');
    return new Promise((resolve, reject)=>{

      jobs.map((job)=>{
        if(job.category === 'applied'){
          sortedJobInfo.applied.push(job)
        } else if(job.category === 'rejected'){
          sortedJobInfo.rejected.push(job)
        } else if (job.category === 'interview'){
          sortedJobInfo.interview.push(job)
        } else if(job.category === 'offers'){
          sortedJobInfo.offers.push(job)
        } else if(job.category === null || job.category === undefined || job.category === ''){
          reject(new Error('Error Sorting Job Info...'));
        }
      })

      console.log('Sorted  😎');
      resolve(sortedJobInfo);

    })

  }


  openOrClosePopup(){

    this.blink();

    this.setState({
      show: !this.state.show
    })

  }

  openOrCloseNewApp(){
    this.setState({
      showNew: !this.state.showNew
    })
  }

  blink(){
    console.log('Blink')
      this.setState({
        xClicked: !this.state.xClicked
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
      }
    })
  }

  submitHandler(){

    let newApp = {
      userId: parseInt(this.props.userid),
      category: "applied",
      userId: this.props.userid,
      companyName: this.state.companyName,
      descr: this.state.descr,
      loc: this.state.loc,
      positionTitle:this.state.positionTitle,
      salary: parseInt(this.state.salary),
      submitDate: this.state.submitDate,
      deadline: this.state.deadline,
      urlLink: this.state.urlLink,
    }

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

    this.formChecker(newApp)
    .then((res)=>{
      console.log(res)
      this.salaryChecker(newApp.salary)
      .then((res)=>console.log(res))
      .catch((err)=>{
        console.error(err);
        alert(err);
      })
    })
    .then(()=>{
      axios.post(`/api/applications/${newApp.id}`, newApp)
      .catch((err)=>{
        console.error("Error Posting:",err);
      })
    })
    .catch((err)=>{
      console.log('Error Posting')
      alert(err);
    })

    alert('Added New Job Application');
    this.forceUpdate();
  }

  getApplications(){
    return new Promise(()=>{
      console.log('Getting Application Job Info....')
      axios.get(`/api/applications/${this.props.userid}`)
      .then((data)=>{
        console.log('Got Application Info!',data.data)

        this.sortJobInfo(data.data)
        .then((sortedJobs)=>{
          this.setState({
            sortedJobInfo: sortedJobs
          },()=>console.log('Everything is Good',this.state.sortedJobInfo))
        })
        .catch((err)=>console.error(err))

      })
      .catch((err)=>console.error('Error Getting Applications data',err));

    })

  }

  componentDidMount(){

    this.getApplications()

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
      top:"0"
    }

    if(!this.state.sortedJobInfo){
      return (
        <div style={{textAlign:"center",paddingTop:"25%"}}>
          <CircularProgress /> Loading...
        </div>
      )
    } else {
      return (
        <div className="jobs" style={{paddingRight:"5%"}} >

          <Grid container spacing={2} >
            <div className="column" style={{width:"25%"}}>
              <Applied applied={this.state.sortedJobInfo.applied} desired={this.props.desired} openPopup={this.openOrCloseNewApp}/>
            </div>

            <div className="column" style={{paddingLeft:"1%",width:"25%",}}>
              <Rejected  rejected={this.state.sortedJobInfo.rejected} desired={this.props.desired}/>
            </div >

             <div style={{paddingLeft:"1%",width:"25%"}} className="interviews-container">
              <Interviews interviews={this.state.sortedJobInfo.interview} desired={this.props.desired}/>
            </div>

            <div className="column" style={{paddingLeft:"1%",width:"25%"}} >
              <Offers offers={this.state.sortedJobInfo.offers}desired={this.props.desired}/>
            </div>

          </Grid>


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
                <div>
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
                    <Button variant="contained" style={{textAlign:"center"}}color="secondary" onClick={this.submitHandler}> Submit </Button>
                  </div>

              </div>
            </Modal.Body>

          </Modal>

          </div>
      )
    }



  }
}

export default Jobs;
