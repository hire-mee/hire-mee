import React, { Component } from 'react';
import axios from 'axios';
import Geocode from 'react-geocode';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import '../../../dist/mapStyles.css';
import MAP_API_KEY from '../../../../maps-api-key';

const mapStyles = {
  width: '50%',
  height: '70%',
  border: '5px solid rgb(166, 166, 166)',
  borderRadius: '3%',
  top: '3%',
  left: '5%'
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
      coordinates: []
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    axios.get('/api/users').then((data) => {
      this.setState({
        userData: data.data
      });
    });
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    console.log('data', this.state);
    return (
      <div className="mainMapContainer">
        <div className="mapTopContainer">
          <div className="mapPageTitle">
            <h1>Map</h1>
          </div>
          <div className="mapSearchBarContainer">
            <input className="mapSearchBar" placeholder="Search"></input>
          </div>
        </div>
        <hr className="pageBodyLine"></hr>

        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 33.97575,
            lng: -118.39114
          }}
        >
          <Marker
            onClick={this.onMarkerClick}
            position={{ lat: 33.97575, lng: -118.39114 }}
            name={'Hack Reactor'}
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
  apiKey: MAP_API_KEY
})(MapContainer);
