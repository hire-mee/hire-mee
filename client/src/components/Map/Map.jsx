import React, { Component } from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import '../../../dist/mapStyles.css'
import MAP_API_KEY from '../../../../maps-api-key'

const mapStyles = {
  width: '60%',
  height: '80%',
  border: '5px solid rgb(166, 166, 166)',
  borderRadius: '3%'
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div >
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 33.97575,
            lng: -118.39114
          }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_API_KEY
})(MapContainer);
