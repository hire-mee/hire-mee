import React, { Component } from "react";

export class Leaderboard extends Component {
  render() {
    return (
      <div className="module_component_container">
        <div className="leader-header">
          Top users by average <span className="orange-text">applications</span>{" "}
          per <span className="orange-text">week</span>:
        </div>
        <div className="leader-columns">
          <img
            className="crown"
            src="crown.svg"
            alt="crown svg"
            width="35"
            height="35"
          />
          <div className="left-div">
            <div className="leader-rows">
              <p className="participant-name">1. Jteve Sobs</p>
              <p className="participant-name">2. Parcus Mhilips</p>
              <p className="participant-name">3. Yulian Juen</p>
              <p className="participant-name">4. Sanny Dan</p>
              <p className="participant-name">5. Sichael Miu</p>
              <p className="participant-name">6. Lrankie Fui</p>
              <p className="participant-name">7. Blex Aenko</p>
              <p className="participant-name">8. Kathony Aim</p>
              <p className="participant-name">9. Zark Muckerberg</p>
              <p className="participant-name">10. Zred Furdnug</p>
            </div>
          </div>

          <div className="divider"></div>
          <div className="right-div">
            <div className="leader-rows">
              <div className="leader-bar-first">
                <span className="weekly-num">34</span>
              </div>
              <div className="leader-bar">
                <span className="weekly-num">34</span>
              </div>
              <div className="leader-bar">
                <span className="weekly-num">34</span>
              </div>
              <div className="leader-bar">
                <span className="weekly-num">34</span>
              </div>
              <div className="leader-bar">
                <span className="weekly-num">34</span>
              </div>
              <div className="leader-bar">
                <span className="weekly-num">34</span>
              </div>
              <div className="leader-bar">
                <span className="weekly-num">34</span>
              </div>
              <div className="leader-bar">
                <span className="weekly-num">34</span>
              </div>
              <div className="leader-bar">
                <span className="weekly-num">34</span>
              </div>
              <div className="leader-bar">
                <span className="weekly-num">34</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
