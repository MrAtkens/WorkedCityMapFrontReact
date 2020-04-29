import React, { Component } from 'react'
import { Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import { observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { toastServerError } from '../../tools'

import { mapStore, pinCreateStore }  from '../../store'
import { PinsView } from '../index'

import './style.css'

const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
)

var points = [
    { lat: 51.175145, lng: 71.41985 },
    { lat: 51.175155, lng: 71.41995 },
    { lat: 51.175165, lng: 71.42000 },
    { lat: 51.175175, lng: 71.42010 }
]

@observer
class MainMap extends Component {

    dialogHandleClick(){
        mapStore.switchIsOpen()
    }

    onMapClick(mapProps, map, clickEvent){
        const geocoder = new mapProps.google.maps.Geocoder();
        const latLngStr = clickEvent.latLng.toString().split(',', 2)
        const latLng = {lat: parseFloat(latLngStr[0].replace('(','')), lng: parseFloat(latLngStr[1])};
        pinCreateStore.setLatLng(latLng)
        const buffer = {'location': latLng}
        geocoder.geocode(buffer, (results, status) => {
            if(status === 'OK')
                pinCreateStore.setAddress(results[0].formatted_address)
            else
                toastServerError()
        })
    }

    handleMarkerOnClick(id){
        mapStore.setPinId(id)
    }

    componentDidMount() {
        mapStore.getMapsPin()
    }

    renderRedirect(){
        if(mapStore.pinId !== null){
            return(<Redirect to={`/pin/${mapStore.pinId}`} push />)
        }
    }

    fetchPlaces(mapProps, map) {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        mapStore.setPlaces(service)
    }

    render() {
        const { isLoaded, getMapsPin, switchIsOpen, mapPins } = mapStore
        // if(isLoaded === false) {
        //     return LoadingContainer
        // }
        // else{

            return(
                <div>
                    {this.renderRedirect()}
                    <Map google={this.props.google} zoom={mapStore.zoom}
                         style={{width: '100%', height: '100%', position: 'relative'}}
                         initialCenter={mapStore.centerPositions}
                         onReady={this.fetchPlaces}
                         onClick={this.onMapClick}>
                        {mapPins.map(value => {
                            return (
                                <Marker key={value.id} name={value.name} position={{lat: value.lat, lng: value.lng}} onClick={(event) => this.handleMarkerOnClick(value.id)}/>
                            )
                        })}
                    </Map>
                    <Tooltip className="fab" placement={"left"} title="Напишите ваши отзывы" arrow>
                        <Fab className="fab" color="secondary" aria-label="send">
                            <SendIcon />
                        </Fab>
                    </Tooltip>
                </div>
            );
        //}
    }
}



export default GoogleApiWrapper({
    apiKey: ("AIzaSyAzF9M_VxXxFOQSZOWcHpiShoni_g6yi4E"),
    language: 'kz',
    LoadingContainer: LoadingContainer
})(MainMap)