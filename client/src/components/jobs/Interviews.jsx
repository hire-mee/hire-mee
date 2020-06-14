import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from './Box.jsx';
let style = {}
style.offers = {
  textAlign:"center",
  fontWeight: "700",
  fontStyle: "normal",
  color: "rgb(84, 84, 84)",
  textDecoration: "none",
  fontSize:"2vw"
}

style.jobs = {
  textAlign:"center",
  fontWeight: "400",
  fontStyle: "normal",
  color: "rgb(84, 84, 84)",
  textDecoration: "none",
  fontSize:"1vw"
}

const Interviews = (props) =>{

   return(
        <Grid item xs={12} style={{backgroundColor:"rgb(232, 236, 239)",height:"100%"}}>
          <div className="interviews-holder" style={{padding:"1em"}}>
           <p style={style.offers}>Interviews</p>
           <p style={style.jobs}>{props.interviews.length}</p>
          </div>

         <div className="job-interviews">
           {props.interviews.map((jobInfo,i)=>{
             return(
               <Box jobInfo={jobInfo} desired={props.desired} key={i}/>
             )
           })}
         </div>
         </Grid>

   )
 };
export default Interviews;