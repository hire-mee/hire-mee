import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from './Box.jsx';

let style = {}
style.offers = {
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

const Offers = (props) =>{
  return(
    <div className="offers" >
       <Grid item xs={12} style={{backgroundColor:"rgb(232, 236, 239)"}}>
         <div className="offer-holder" style={{padding:"1em"}}>
          <p style={style.offers}>Offers</p>
          <p style={style.jobs}>{props.offers.length} Jobs</p>
         </div>
         <div className="plus-holder" style={{backgroundColor:"white",width:"65%", paddingLeft:"5%",margin: "0 auto"}}>
            <h3 style={{textAlign:"center",cursor:"pointer"}}>+</h3>
         </div>


        <div className="job-offers">
          {props.offers.map((jobInfo,i)=>{
            return(
              <Box jobInfo={jobInfo} desired={props.desired} key={i}/>
            )
          })}
        </div>
        </Grid>
    </div>

  )
};

export default Offers;