
import React, { Component } from 'react'
import { Marker } from 'react-leaflet'
import { observer } from "mobx-react";
import { Link } from 'react-router-dom'

import appStore from '../../store'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const myIcon = new L.Icon({
    iconUrl: require('http://localhost:54968/images/problemPin.svg'),
    iconRetinaUrl: require('http://localhost:54968/images/problemPin.svg'),
    iconSize: new L.Point(15, 30),
});


export @observer class PinsView extends Component {

    dialogHandleClick() {
        appStore.switchIsOpen()
    }

    render() {
        const { mapPins, getMapsPin, switchIsOpen } = appStore
        return (
            <div>
                {mapPins.map(value => {
                    const position = [value.lat, value.lng]
                    return (
                        <Link to={`/pin/${value.id}`}>
                            <Marker key={value.id} icon={myIcon} position={position} onClick={this.dialogHandleClick}/>
                        </Link>
                    )
                })}
            </div>
        );
    }
}


