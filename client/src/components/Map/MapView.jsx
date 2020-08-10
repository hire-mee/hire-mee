import React, { Component, useState } from "react";
import axios from "axios";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import MAP_API_KEY from "../../../../maps-api-key";
import WrappedMap from "./WrappedMap.jsx";

export class MapView extends Component {
  constructor() {
    super();
    this.state = {
      jobData: null,
      geoCodes: [],
    };
  }
  componentDidMount() {
    axios
      .get(`/api/applications/${this.props.userData.id}`)
      .then((data) => {
        this.setState({
          jobData: data.data,
        });
        this.geocode();
      })
      .catch((err) => console.error("Error Getting Applications data", err));
  }

  geocode() {
    // var location = "10770 lawler st los angeles CA";
    this.state.jobData.map((job) => {
      var location = job.app_location;
      var companyName = job.company_name;
      var category = job.category;
      var link = job.url_link;
      var salary = job.salary;
      var description = job.app_description;
      console.log(job, "gimme the info");

      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: location,
            key: MAP_API_KEY,
          },
        })
        .then((res) => {
          var lat = res.data.results[0].geometry.location.lat;
          var lng = res.data.results[0].geometry.location.lng;
          var coord = { lat, lng, companyName, category, link, salary, description };
          this.setState({
            geoCodes: [...this.state.geoCodes, coord],
          });
        })
        .catch((err) => console.log(err));
    });
  }

  render() {
    return (
      <div style={{}}>
        {/* {console.log(this.state.jobData, "bertttt")} */}
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_API_KEY}`}
          loadingElement={<div style={{ height: "75vh" }} />}
          containerElement={
            <div style={{ height: "75vh", width: "75vw", margin: "auto" }} />
          }
          mapElement={<div style={{ height: "75vh" }} />}
          jobData={this.state.jobData}
          geoCodes={this.state.geoCodes}
        />
      </div>
    );
  }
}

export default MapView;

// function Map() {
//   const [selectedJob, setSelectedJob] = useState(null);

//   return (
// <GoogleMap
//   defaultZoom={10}
//   defaultCenter={{ lat: 33.97575, lng: -118.39114 }}
// >
//   {/* {console.log(props, "berttttplswork")} */}

//   <Marker
//     key="testing"
//     position={{ lat: 33.97575, lng: -118.39114 }}
//     onClick={() => {
//       setSelectedJob(true);
//     }}
//     icon={{
//       url: "career.svg",
//       scaledSize: new window.google.maps.Size(40, 40),
//     }}
//   />

//   {selectedJob && (
//     <InfoWindow
//       position={{ lat: 33.97575, lng: -118.39114 }}
//       onCloseClick={() => {
//         setSelectedJob(null);
//       }}
//     >
//       <div>park details</div>
//     </InfoWindow>
//   )}
// </GoogleMap>
//   );
// }

// const WrappedMap = withScriptjs(withGoogleMap(Map));
