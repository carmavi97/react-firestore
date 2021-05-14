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
          lat:null,
          lng:null
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
                  ///
                  this.setState({lat:location.latlng.lat,lng:location.latlng.lng});
                }
          })
        const latlng=this.state
          if(latlng.lat!=null){
            console.log('entra:'+ latlng.lat)
            return (
              <Marker position={latlng.lat,latlng.lng}>
                    <Popup>
                      Click
                    </Popup>
                </Marker>
            )
          }else{
            return(<Marker position={{lat:'37.8937611',lng:'-4.7844279'}}>
            <Popup>
              Local del grupo scout mafeking 500
            </Popup>
          </Marker>)
          }
      
        
        
      }

      render() {
        this.LocationMarker=this.LocationMarker.bind(this)
        return (
          <div>
            <MapContainer center={{lat:'37.8937611',lng:'-4.7844279'}} zoom='20' >
              <TileLayer
                  url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
              <this.LocationMarker />
              
            </MapContainer>
          </div>
        )
      }
    }
    



export default Maps;