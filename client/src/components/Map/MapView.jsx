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
      <div style={{ width: "50vw", height: "50vh" }}>
        <WrappedMap
          googleMapURL={
            "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          }
          loadingElement={<div style={{ height: "50%" }} />}
          containerElement={<div style={{ height: "50%" }} />}
          mapElement={<div style={{ height: "50%" }} />}
        />
      </div>
    );
  }
}

export default MapView;
