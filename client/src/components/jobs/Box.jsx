import React, { useState } from 'react';
import DetailedView from './DetailedView.jsx';

class Box extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      show: false,
      render:false
    }
    this.openOrClosePopup = this.openOrClosePopup.bind(this);
  }

  openOrClosePopup(){
    this.setState({
      show: !this.state.show
    })
  }

  render(){
    let style = {};

    style.companyTitle = {
      fontWeight: "400",
      fontStyle: "normal",
      color: "rgb(56, 182, 255)",
      textDecoration: "none",
      lineHeight: "1.4",
      fontFamily: "YACkoA9eHeY 0, _fb_, auto",
      textTransform: "none",
      fontSize:"1.5vw"
    };

  style.jobTitle = {
    fontWeight: "400",
    fontStyle: "normal",
    color: "rgb(84, 84, 84)",
    textDecoration: "none",
    lineHeight: "1.4",
    fontFamily: "YACkoA9eHeY 0, _fb_, auto",
    textTransform: "none",
    fontSize:"1vw"
  }

  return (

    <div className="applied-box-holder" onClick={() => this.openOrClosePopup()}>
      <p style={style.companyTitle}>{this.props.jobInfo.company_name}</p>
      <p style={style.jobTitle}>{this.props.jobInfo.position_title}</p>
      <DetailedView jobInfo={this.props.jobInfo} desired={this.props.desired} show={this.state.show} getApplications={this.props.getApplications}/>
    </div>
    );
  }
}


export default Box;