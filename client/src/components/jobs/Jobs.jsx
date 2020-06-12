import React from 'react';
import Rejected from './Rejected.jsx';
import Applied from './Applied.jsx';
import Offers from './Offers.jsx';
import Interviews from './Interviews.jsx'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';


//INSERT INTO applications(userId, category, color, companyName, descr, loc, positionTitle, salary, submitDate, deadline, urlLink) VALUES
class Jobs extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      jobInfo: [],
      show: false,
      id: 0,
      category: "Applied",
      companyName:"",
      descr:"",
      loc:"",
      positionTitle:"",
      salary:0,
      submitDate:"",
      deadline:"",
      urlLink:"",
      xClicked: false
    }
    this.openOrClosePopup = this.openOrClosePopup.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  openOrClosePopup(){

    this.blink();

    this.setState({
      show: !this.state.show
    })

  }

  blink(){
    console.log('Blink')
      this.setState({
        xClicked: !this.state.xClicked
      })

  }

  changeHandler(e){
    e.preventDefault()
    console.log([e.target.name])

    this.setState({
      [e.target.name]: e.target.value
    },()=>console.log(this.state))
  }


  render(){

    let style={}
    style.popup = {
      display: "flex",
      width:"70%",
      height:"70%",
      position: "fixed",
      zIndex:"9",
      backgroundColor: "rgb(232, 236, 239)",
      top: "10%",
      left: "18%"
    }
    style.x ={
      color: this.state.xClicked ? "black" : "grey",
      fontWeight: this.state.xClicked ? "800" : "600",
      cursor:"pointer",
      position:"absolute",
      right:"0",
      top:"0"
    }

    return (
      <div className="jobs" style={{paddingRight:"5%"}} >

        <Grid container spacing={2} >
          <Applied applied={this.props.applied} desired={this.props.desired} openPopup={this.openOrClosePopup}/>

          <div style={{paddingLeft:"1%",width:"25%"}} className="rejected-container">
            <Rejected rejected={this.props.rejected} desired={this.props.desired}/>
          </div >

          <div style={{paddingLeft:"1%",width:"25%"}} className="interviews-container">
            <Interviews interviews={this.props.interviews} desired={this.props.desired}/>
          </div>

          <div style={{paddingLeft:"1%",width:"25%"}} className="offers-container">
            <Offers offers={this.props.offered} desired={this.props.desired}/>
          </div>

        </Grid>

      <Slide direction="down" in={this.state.show} mountOnEnter unmountOnExit>
        <div className="new-application-popup" style={style.popup}>
          <h1 style={{color:"rgb(84, 84, 84)",width:"20%",height:"auto"}}>New Job Application?</h1> <br/>
          <p style={style.x} onClick={this.openOrClosePopup}>X</p>

          <div className="first-input-row" style={{flexDirection:"row",paddingTop:"10%"}}>
            <TextField required  name="companyName" onChange={this.changeHandler} value={this.state.companyName}variant="filled"/>
            <TextField required  name="loc"  onChange={this.changeHandler} value={this.state.loc} variant="filled"/>
            <TextField required  name="positionTitle" onChange={this.changeHandler} value={this.state.positionTitle} variant="filled"/>
          </div>



        </div>
      </Slide>


      </div>
    )
  }
}

//INSERT INTO applications(userId, category, color, companyName, descr, loc, positionTitle, salary, submitDate, deadline, urlLink) VALUES

export default Jobs;



/*
 <div className="second-input-row" style={{flexDirection:"row"}}>
            <TextField required  name="descr"  onChange={this.changeHandler} variant="filled"/>
            <TextField required  name="loc"    onChange={this.changeHandler}  variant="filled"/>
            <TextField required  name="salary" onChange={this.changeHandler} variant="filled"/>
          </div>
*/