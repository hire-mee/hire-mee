import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from './Box.jsx';

let style = {}
style.rejected = {
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

const Rejected = (props) =>{
  return(

       <Grid item xs={12} style={{backgroundColor:"rgb(232, 236, 239)",height:"100%"}}>
         <div className="rejected-holder" style={{padding:"1em"}}>
          <p style={style.rejected}>Rejected</p>
          <p style={style.jobs}>{props.rejected.length} Job(s)</p>
         </div>

        <div className="rejected-jobs">
          {props.rejected.map((jobInfo,i)=>{
            return(
              <Box jobInfo={jobInfo} desired={props.desired} key={i}/>
            )
          })}
        </div>


        </Grid>


  )
}

export default Rejected;