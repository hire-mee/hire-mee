import React, { useState } from "react";
import DetailedView from "./DetailedView.jsx";

class Box extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      render: false,
    };
    this.openOrClosePopup = this.openOrClosePopup.bind(this);
  }

  openOrClosePopup() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div
        className="applied-box-holder"
       onClick={() => this.openOrClosePopup()}
      >
    <p className="company_name_text">{this.props.jobInfo.company_name}</p>
   <p className="position_title_text">{this.props.jobInfo.position_title}</p>
        <DetailedView
          jobInfo={this.props.jobInfo}
          desired={this.props.desired}
          show={this.state.show}
          getApplications={this.props.getApplications}
        />
      </div>
    );
  }
}

export default Box;
