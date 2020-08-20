import React from "react";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";


  export default function Demo() {
    return (
      <div className="demo_body_container">


        <div className="demo_top_container">
          <nav className="demo_nav_container">
              <ul className="demo_nav_links_ul">
                <li className="demo_nav_links">
                  <Link to="/">ABOUT</Link>
                </li>
                <li className="demo_nav_links">
                  <Link to="/signup">SIGNUP</Link>
                </li>
                <li className="demo_nav_links">
                  <Link to="/login">LOGIN</Link>
                </li>
              </ul>
            </nav>
          </div>


          <div className="demo_header_background_wrapper">
            <div className="demo_header_container_wrapper">
              <div className="demo_header_container">

                <img className="demo_header_photo" src="https://hire-mee-assets.s3-us-west-1.amazonaws.com/header-icon-image.png"></img>

                <div className="demo_header_text_container">
                    <div id="demo_header_hiremee_text">Hire-Mee</div>
                    <div id="demo_header_about_text">Say goodbye to the old way</div>
                    <div id="demo_header_about_text">of organizing job apps.</div>
                    <div className="demo_pink_button_container">
                      <button className="demo_pink_button">Start here</button>
                    </div>
                </div>

                </div>
              </div>
            </div>


            <div className="demo_rightside_feature_container">
              <div className="demo_rightside_feature_desc_container">

                  <div className="demo_rightside_flower_container">
                    <img src="https://hire-mee-assets.s3-us-west-1.amazonaws.com/flower1.png" className="demo_rightside_fower"></img>
                  </div>

                  <div className="demo_rightside_feature_subcontainer">
                    <div className="demo_rightside_feature_heading_text">Minimal, modern UI.</div>
                    <div className="demo_rightside_feature_heading_subtext">Clean and easy-to-use</div>
                    <div className="demo_rightside_feature_heading_subtext">dashboard view for all of</div>
                    <div className="demo_rightside_feature_heading_subtext">your tracked applications.</div>
                  </div>

              </div>

              <div className="demo_rightside_feature_static_image_container">
                <img className="demo_rightside_feature_image" src="https://hire-mee-assets.s3-us-west-1.amazonaws.com/job-view.png"></img>
              </div>

            </div>



            <div className="demo_leftside_feature_container">
              <div className="demo_leftside_feature_desc_container">

                  <div className="demo_leftside_feature_static_image_container">
                    <img className="demo_leftside_feature_image" src="https://hire-mee-assets.s3-us-west-1.amazonaws.com/map-view.png"></img>
                  </div>

              <div className="demo_leftside_flower_text_container">
                  <div className="demo_leftside_flower_container">
                    <img src="https://hire-mee-assets.s3-us-west-1.amazonaws.com/flower2.png" className="demo_rightside_fower"></img>
                  </div>

                  <div className="demo_leftside_feature_subcontainer">
                    <div className="demo_leftside_feature_heading_text">Made by visual developers,</div>
                    <div className="demo_leftside_feature_heading_text">for visual users.</div>
                    <div className="demo_leftside_feature_heading_subtext">Interactive map to display</div>
                    <div className="demo_leftside_feature_heading_subtext">recorded applications' </div>
                    <div className="demo_leftside_feature_heading_subtext">locations relative to set </div>
                    <div className="demo_leftside_feature_heading_subtext">points and other data points. </div>
                  </div>
                  </div>
             
              </div>

            </div>


            <div className="demo_rightside_feature_container">
              <div className="demo_rightside_feature_desc_container">

                  <div className="demo_rightside_flower_container">
                    <img src="https://hire-mee-assets.s3-us-west-1.amazonaws.com/flower3.png" className="demo_rightside_fower"></img>
                  </div>

                  <div className="demo_rightside_feature_subcontainer" style={{marginTop:'120px'}}>
                    <div className="demo_rightside_feature_heading_text" >Data-driven experience.</div>
                    <div className="demo_rightside_feature_heading_subtext">Numbers mean more than</div>
                    <div className="demo_rightside_feature_heading_subtext">just that, let the statistics</div>
                    <div className="demo_rightside_feature_heading_subtext">speak for itself. </div>
                  </div>

              </div>

              <div className="demo_rightside_feature_static_image_container">
                <img className="demo_rightside_feature_image" src="https://hire-mee-assets.s3-us-west-1.amazonaws.com/stats-view.png"></img>
              </div>

            </div>
            

            <h2 className="more_features_text">More Features coming soon!</h2>


            <div className="demo_footer_container">
              <div className="demo_footer_subcontainer">


                  <div className="demo_footer_left_container">
                      <div className="demo_footer_left_text_container">
                        <div className="demo_footer_main_text">Ready to streamline</div>
                        <div className="demo_footer_main_text">your job search process?</div>
                        </div>
                      <div className="demo_footer_button_container">
                      <button className="demo_pink_button">Sign-up</button>
                      <button className="demo_pink_button" style={{marginLeft:'20px'}}>Log-in</button>
                      </div>
                  </div>

                  <div className="demo_footer_right_container">
                    <div className="demo_footer_hiremee_text">Hire-Mee</div>
                    <div className="demo_footer_copyright_text">Copyright © 2020. All rights Reserved</div>
                  </div>

              </div>
            </div>
      </div>
    )
  }