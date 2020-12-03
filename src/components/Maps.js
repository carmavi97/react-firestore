import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

 
const mapStyles = {
  width: '100%',
  height: '100%'
};
class Maps extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  componentDidMount(){
    console.log('cargado')
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 0,
            lng: 0
          }
        }
      />
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDlOnkJYal4PHonEXutGm6UmDZluz_Wj80'
})(Map);