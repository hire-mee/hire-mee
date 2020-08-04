import React, { Component } from "react";
import axios from "axios";
import Async from "react-promise";
import Geocode from "react-geocode";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import "../../../dist/mapStyles.css";
import MAP_API_KEY from "../../../../maps-api-key";
Geocode.setApiKey(MAP_API_KEY);

const mapStyles = {
  width: "50%",
  height: "70%",
  border: "5px solid rgb(166, 166, 166)",
  borderRadius: "3%",
  top: "3%",
  left: "5%",
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      applications: [],
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      coordinates: [],
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.geocodeGen = this.geocodeGen.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/user/2")
      .then((data) => {
        this.setState({
          userData: data.data[0],
        });
      })
      .then(() => {
        axios
          .get(`/api/applications/${this.state.userData.id}`)
          .then((data) => {
            this.setState({
              applications: data.data,
            });
          });
      });
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onClose(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  geocodeGen() {
    let { applications } = this.state;
    let applicationCities = applications.map((cities) => {
      return cities.loc;
    });
    return applicationCities;
  }

  render() {
    console.log("STATE", this.state);
    console.log("filter", this.geocodeGen());
    let applicationCities = this.geocodeGen();

    const lngLatConversion = applicationCities.map((data, i) => {
      var geoLocs = Geocode.fromAddress(data);
      return (
        <Async
          promise={geoLocs}
          key={i}
          then={(val) => <Marker position={val.results[0].geometry.location} />}
        />
      );
    });

    console.log("conversion", lngLatConversion);
    return (
      <div className="mainMapContainer">
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{
            lat: 33.97575,
            lng: -118.39114,
          }}
        >
          <Marker
            onClick={this.onMarkerClick}
            position={{ lat: 33.97575, lng: -118.39114 }}
            name={"App 1"}
          />
          {/* {lngLatConversion} */}
          <Marker
            onClick={this.onMarkerClick}
            position={{ lat: 33.7700504, lng: -118.1937395 }}
            name={"App 2"}
          />
          <Marker
            onClick={this.onMarkerClick}
            position={{ lat: 33.6845673, lng: -117.8265049 }}
            name={"App 3"}
          />
          <Marker
            onClick={this.onMarkerClick}
            position={{ lat: 34.0194543, lng: -118.4911912 }}
            name={"App 4"}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_API_KEY,
})(MapContainer);
