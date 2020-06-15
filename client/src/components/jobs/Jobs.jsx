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
      xClicked: false,
      sorted: false,
      render:false
    }
    this.sortJobInfo = this.sortJobInfo.bind(this);
    this.getApplications = this.getApplications.bind(this);
    this.reRender = this.reRender.bind(this);
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

    this.setState({
      show: !this.state.show
    })

  }

  changeHandler(e){
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  reRender(){
    console.log('Updating');
    this.forceUpdate();
  }


  getApplications(){
    return new Promise(()=>{
      console.log('Getting Application Job Info....')
      axios.get(`/api/applications/${this.props.userid.id}`)
      .then((data)=>{
        console.log('Got Application Info!', data.data)

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
    // .then(()=>console.log('((((((((((((((((((((((((((', this.props.userid))
    // .catch((err)=>console.error(err))
  }


  render(){

    if(!this.state.sortedJobInfo){
      return (
        <div style={{textAlign:"center",paddingTop:"25%"}}>
          <CircularProgress /> Loading...
        </div>
      )
    } else {
      return (
        <div className="jobs-compnent" style={{paddingRight:"5%"}} >

          <Grid container spacing={2} >
            <div className="column" style={{width:"25%"}}>
              <Applied applied={this.state.sortedJobInfo.applied} render={this.reRender} desired={this.props.desired.salary} userid={this.props.userid.id}/>
            </div>

            <div className="column" style={{paddingLeft:"1%",width:"25%",}}>
              <Rejected  rejected={this.state.sortedJobInfo.rejected} desired={this.props.desired.salary}/>
            </div >

             <div style={{paddingLeft:"1%",width:"25%"}} className="interviews-container">
              <Interviews interviews={this.state.sortedJobInfo.interview} desired={this.props.desired.salary}/>
            </div>

            <div className="column" style={{paddingLeft:"1%",width:"25%"}} >
              <Offers offers={this.state.sortedJobInfo.offers}desired={this.props.desired.salary}/>
            </div>

          </Grid>

        </div>
      )
    }
  }
}

export default Jobs;
