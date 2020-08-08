import React, { Component } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 33.97575, lng: -118.39114 }}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export class MapView extends Component {
  render() {
    return (
      <div style={{}}>
        <WrappedMap
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          }
          loadingElement={<div style={{ height: "75vh" }} />}
          containerElement={
            <div style={{ height: "75vh", width: "75vw", margin: "auto" }} />
          }
          mapElement={<div style={{ height: "75vh" }} />}
        />
      </div>
    );
  }
}

export default MapView;
