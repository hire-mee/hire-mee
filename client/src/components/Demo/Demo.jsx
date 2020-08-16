import React from "react";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";


  export default function Demo() {
    return (
      <div>
        <h2>Demo coming soon</h2>
        <nav>
            <ul>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/main">Main</Link>
              </li>
            </ul>
          </nav>
      </div>
    )
  }