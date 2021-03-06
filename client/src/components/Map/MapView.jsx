import React, { Component, useState, Fragment } from "react";
import axios from "axios";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import WrappedMap from "./WrappedMap.jsx";
import Button from "@material-ui/core/Button";

export class MapView extends Component {
  constructor() {
    super();
    this.state = {
      jobData: null,
      geoCodes: [],
      homeAddress: "",
      homeCoords: {},
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount() {
    axios
      .get(`/api/applications/${localStorage.id}`)
      .then((data) => {
        this.setState({
          jobData: data.data,
        });
        this.geocode();
      })
      .catch((err) => console.error("Error Getting Applications data", err));
    axios
      .get(`/api/user/${localStorage.id}`)
      .then((data) => {
        return data.data;
      })
      .then((data) => {
        axios
          .get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
              address: data[0].home_address,
              key: process.env.REACT_APP_GOOGLE_KEY,
            },
          })
          .then((res) => {
            let lat = res.data.results[0].geometry.location.lat;
            let lng = res.data.results[0].geometry.location.lng;
            let coord = {
              lat,
              lng,
            };
            this.setState({
              homeCoords: coord,
            });
          })
          .catch((err) => console.error(err));
      });
  }

  geocode() {
    this.state.jobData.map((job) => {
      var location = job.app_location;
      var companyName = job.company_name;
      var category = job.category;
      var link = job.url_link;
      var salary = job.salary;
      var description = job.app_description;

      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: location,
            key: process.env.REACT_APP_GOOGLE_KEY,
          },
        })
        .then((res) => {
          var lat = res.data.results[0].geometry.location.lat;
          var lng = res.data.results[0].geometry.location.lng;
          var coord = {
            lat,
            lng,
            companyName,
            category,
            link,
            salary,
            description,
          };
          this.setState({
            geoCodes: [...this.state.geoCodes, coord],
          });
        })
        .catch((err) => console.error(err));
    });
  }

  inputChangeHandler(e) {
    this.setState(
      {
        homeAddress: e.target.value,
      });
  }

  submitHandler(e) {
    e.preventDefault();
    axios
      .post(`/api/user/${localStorage.id}`, {
        homeAddress: this.state.homeAddress,
      })
      .then((res) => {
        this.setState({
          homeAddress: res.data.homeAddress,
        });
        axios
          .get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
              address: res.data.homeAddress,
              key: process.env.REACT_APP_GOOGLE_KEY,
            },
          })
          .then((res) => {
            let lat = res.data.results[0].geometry.location.lat;
            let lng = res.data.results[0].geometry.location.lng;
            let coord = {
              lat,
              lng,
            };
            this.setState({
              homeCoords: coord,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <Fragment>
        <div className="address-div">
          <img
            src="house.svg"
            alt="house svg"
            width="40"
            height="40"
            style={{ marginRight: "10px" }}
          />{" "}
          Mark your home address:
          <input
            className="address-input"
            onChange={this.inputChangeHandler}
          ></input>
          <Button
            style={{ marginLeft: "10px", width: "20px", height: "30px" }}
            variant="contained"
            onClick={this.submitHandler}
          >
            Set
          </Button>
        </div>
        <div>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: "75vh" }} />}
            containerElement={
              <div style={{ height: "75vh", width: "75vw", margin: "auto" }} />
            }
            mapElement={<div style={{ height: "75vh" }} />}
            jobData={this.state.jobData}
            geoCodes={this.state.geoCodes}
            userData={this.props.userData}
            homeCoords={this.state.homeCoords}
          />
        </div>
        <div className="field-div">
          <fieldset>
            <legend>Legend:</legend>
            <span className="legend-items">
              <img src="house.svg" alt="house svg" width="40" height="40" />:
              Home
            </span>
            <span className="legend-items">
              <img src="applied.svg" alt="applied svg" width="40" height="40" />
              : Applied
            </span>
            <span className="legend-items">
              <img
                src="interview.svg"
                alt="interview svg"
                width="40"
                height="40"
              />
              : Interview
            </span>
            <span className="legend-items">
              <img
                src="rejected.svg"
                alt="rejected svg"
                width="40"
                height="40"
              />
              : Rejected
            </span>
            <span className="legend-items">
              <img src="offers.svg" alt="offers svg" width="40" height="40" />:
              Offers
            </span>
          </fieldset>
        </div>
      </Fragment>
    );
  }
}

export default MapView;