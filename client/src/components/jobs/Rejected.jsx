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

class Rejected extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (

      <Grid item xs={12} style={{ backgroundColor: "rgb(232, 236, 239)", height: "100%" }}>
        <div className="rejected-holder" style={{ padding: "1em" }}>
          <p className="applications_columns">Rejected</p>
          <p className="applications_count_number">{this.props.rejected.length} Rejected</p>
        </div>

        <div className="rejected-jobs">
          {this.props.rejected.map((jobInfo, i) => {
            return (
              <Box jobInfo={jobInfo} desired={this.props.desired} key={i} />
            )
          })}
        </div>


      </Grid>


    )
  }
}

export default Rejected;