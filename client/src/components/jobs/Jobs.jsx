import React from 'react';
import Rejected from './Rejected.jsx';
import Applied from './Applied.jsx';
import Offers from './Offers.jsx';
import Interviews from './Interviews.jsx'
import Grid from '@material-ui/core/Grid';

class Jobs extends React.Component{
  constructor(props){
    super(props);
  }

  addJobApplication(){

  }

  render(){


    return (
      <div className="jobs" style={{paddingRight:"5%"}}>

        <Grid container spacing={2} style={{height:"100%"}}>
          <Applied applied={this.props.applied} desired={this.props.desired}/>

          <div style={{paddingLeft:"1%",width:"24%"}} className="rejected-container">
            <Rejected rejected={this.props.rejected} desired={this.props.desired}/>
          </div >

          <div style={{paddingLeft:"1%",width:"24%"}} className="interviews-container">
            <Interviews interviews={this.props.interviews} desired={this.props.desired}/>
          </div>

          <div style={{paddingLeft:"1%",width:"24%"}} className="offers-container">
            <Offers offers={this.props.offered} desired={this.props.desired}/>
          </div>

        </Grid>

      </div>
    )
  }
}

export default Jobs;