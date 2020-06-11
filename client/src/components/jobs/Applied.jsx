import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from './Box.jsx';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

let style = {}
style.applied = {
  textAlign:"center",
  fontWeight: "700",
  fontStyle: "normal",
  color: "rgb(84, 84, 84)",
  textDecoration: "none"
};

style.jobs = {
  textAlign:"center",
  fontWeight: "400",
  fontStyle: "normal",
  color: "rgb(84, 84, 84)",
  textDecoration: "none"
};
//top, right, bottom, and left
const Applied = (props) =>{
  const classes = useStyles();

  return (
    <div className = "applied" style={{width:"25%"}}>
       <Grid item xs={12} style={{backgroundColor:"rgb(232, 236, 239)"}}>
         <div className="applied-holder" style={{padding:"1em"}}>
          <p style={style.applied}>Applied</p>
          <p style={style.jobs}>{props.applied.length} Jobs</p>
         </div>
         <div className="plus-holder" style={{backgroundColor:"white",width:"65%", paddingLeft:"5%",margin: "0 auto"}}>
            <h3 style={{textAlign:"center",cursor:"pointer"}}>+</h3>
         </div>


        <div>
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