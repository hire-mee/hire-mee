import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Applied from './Applied.jsx';
import Grid from '@material-ui/core/Grid';



class Jobs extends React.Component{
  constructor(props){
    super(props);
  }

  render(){


    return (
      <div style={{height:"100%",paddingLeft:"10%",paddingTop:"10%"}}>
        <Grid container spacing={2}>
          <Applied applied={this.props.applied} desired={this.props.desired}/>
        </Grid>
      </div>
    )
  }
}

export default Jobs;