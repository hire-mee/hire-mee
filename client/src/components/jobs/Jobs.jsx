import React from 'react';
import Rejected from './Rejected.jsx';
import Applied from './Applied.jsx';
import Offers from './Offers.jsx';
import Grid from '@material-ui/core/Grid';

class Jobs extends React.Component{
  constructor(props){
    super(props);
  }

  render(){


    return (
      <div style={{paddingLeft:"12%",paddingTop:"7%"}}>
        <Grid container spacing={2}>
          <Applied applied={this.props.applied} desired={this.props.desired}/>

          <div style={{paddingLeft:"1%",width:"25%"}}>
            <Rejected rejected={this.props.rejected} desired={this.props.desired}/>
          </div >

          <div style={{paddingLeft:"1%",width:"25%"}}>
            <Offers offers={this.props.offered} desired={this.props.desired}/>
          </div>

        </Grid>
      </div>
    )
  }
}

export default Jobs;