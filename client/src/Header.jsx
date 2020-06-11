import React from 'react';
import Applied from "./Applied.jsx";
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

class Header extends React.Component{
  constructor(props){
    super(props);
  }


  render(){

    let style = {};

    style.col = {
      backgroundColor: "rgb(232, 236, 239)"
    }

    style.head = {
      display: "flex",
      flexDirection: "row",
      borderBottom: "1px solid grey",
      paddingBottom:"1%"
    };
    return(
      <div style={{paddingLeft:"20%"}} className="jobs-holder">
        <div className="header" style={style.head}>
          <h1 style={{paddingRight:"5%"}}>Jobs</h1>
          <div className="search-holder" style={{display: "flex",flexDirection: "row",paddingTop:".4%"}}>
          <TextField
            fullWidth
            value="Search.."
            id="filled-start-adornment"
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
            }}
            variant="filled"
          />
          </div>

          <div className="avatar=holder" style={{ paddingLeft:"60%",paddingTop: "1%", display: "flex",flexDirection: "row"}}>
            <Avatar style={{width:"3em", height:"3em"}}>JD</Avatar>
            <h2 style={{paddingTop:"3%"}}>John Doe</h2>
          </div>

        </div>
      </div>
    )
  }
}

export default Header;

