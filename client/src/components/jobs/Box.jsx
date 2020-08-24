import React, { useState } from "react";
import DetailedView from "./DetailedView.jsx";

class Box extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      render: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }

  render() {
    return (
      <div
        className="applied-box-holder"
       onClick={() => this.toggleModal()}
      >
    <p className="company_name_text">{this.props.jobInfo.company_name}</p>
   <p className="position_title_text">{this.props.jobInfo.position_title}</p>
        <DetailedView
          jobInfo={this.props.jobInfo}
          desired={this.props.desired}
          modalOpen={this.state.modalOpen}
          getApplications={this.props.getApplications}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}

export default Box;
