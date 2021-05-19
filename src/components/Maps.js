import React, { Component } from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent} from 'react-leaflet';

const MyMarker = props => {

    const initMarker = ref => {
      if (ref) {
        ref.leafletElement.openPopup()
      }
    }
  
    return <Marker ref={initMarker} {...props}/>
  }  
  class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
          latlng:{
            lat:null,
            lng:null
          },
          selected:false
        };
      }

    
      LocationMarker() {
        //useMapEvents = useMapEvents.bind(this);
          const map = useMapEvents({
              click: () => {
                  map.locate()
                  
                },
                locationfound: (location) => {
                  console.log('location found:', location.latlng);
                  this.setState({latlng:{lat:location.latlng.lat,lng:location.latlng.lng},selected:true});
                  map.flyTo(location.latlng, map.getZoom())
                }
          })
          return(null)
      
        
        
      }

      render() {
        this.LocationMarker=this.LocationMarker.bind(this)
        let position=<Marker position={{lat:'1',lng:'1'}}></Marker>;
        if(this.state.selected){
          let lat=this.state.latlng.lat;
          let lng=this.state.latlng.lng
          position=<Marker position={{lat,lng}}>
          <Popup>
            Usted esta aqui
          </Popup>
        </Marker>;
        }

        return (
          <div>
            Pulse en el mapa para ver su localización
            <MapContainer center={{lat:'37.8937611',lng:'-4.7844279'}} zoom='20' >
              <TileLayer
                  url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
              <this.LocationMarker />
              {position}
            </MapContainer>
          </div>
        )
      }
    }
    



export default Maps;