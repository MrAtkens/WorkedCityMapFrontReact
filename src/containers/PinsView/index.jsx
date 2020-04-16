
import React, { Component } from 'react'
import { Marker } from 'react-leaflet'
import { observer } from "mobx-react";
import { Link } from 'react-router-dom'

import appStore from '../../store'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const myIcon = new L.Icon({
    iconUrl: require('./problemPin.svg'),
    iconRetinaUrl: require('./problemPin.svg'),
    iconSize: new L.Point(15, 30),
});

@observer
class PinsView extends Component {

    handleMarkerOnClick(id){
        appStore.setPinId(id)
    }

    render() {
        const { mapPins, getMapsPin } = appStore
        return (
            <div>
                {mapPins.map(value => {
                    const position = [value.lat, value.lng]
                    return (
                            <Marker key={value.id}  icon={myIcon} position={position} onClick={(event) => this.handleMarkerOnClick(value.id)} />
                    )
                })}
            </div>
        );
    }
}


export default PinsView;
