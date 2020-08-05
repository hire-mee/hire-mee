import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from './Box.jsx';

const Offers = (props) =>{
  return(

       <Grid item xs={12} style={{backgroundColor:"rgb(232, 236, 239)",height:"100%"}}>
         <div className="offer-holder" style={{padding:"1em"}}>
          <p className="applications_columns">Offers</p>
          <p className="applications_count_number">{props.offers.length} Job(s)</p>
         </div>

        <div className="job-offers">
          {props.offers.map((jobInfo,i)=>{
            return(
              <Box jobInfo={jobInfo} desired={props.desired} key={i}/>
            )
          })}
        </div>
        </Grid>


  )
};

export default Offers;