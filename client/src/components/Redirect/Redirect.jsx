import React from "react";
import { NavLink} from "react-router-dom";

export default function Redirect() {
    return (
        <div style={{textAlign: "center"}}>
          <div className="signup_redirect_text">Account successfully created!</div>
          <NavLink id="signup_redirect_login" to="/login">Login Here</NavLink>
        </div>
    )
}