import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from './Box.jsx';


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
//top, right, bottom, and left
const Applied = (props) =>{


  return (
    <div className = "applied" style={{width:"24%"}}>
       <Grid item xs={12} style={{backgroundColor:"rgb(232, 236, 239)"}}>
         <div className="applied-holder" style={{padding:"1em"}}>
          <p style={style.applied}>Applied</p>
          <p style={style.jobs}>{props.applied.length} Jobs</p>
         </div>
         <div className="plus-holder" style={{backgroundColor:"white",width:"65%", paddingLeft:"5%",margin: "0 auto"}}>
            <h3 style={{textAlign:"center",cursor:"pointer"}}>+</h3>
         </div>


        <div className="applied-jobs">
          {props.applied.map((jobInfo,i)=>{
            return(
              <Box jobInfo={jobInfo} desired={props.desired} key={i}/>
            )
          })}
        </div>


        </Grid>
    </div>
  )
}

export default Applied;