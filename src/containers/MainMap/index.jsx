
import React, { Component } from 'react'
import { ReactLeafletZoomIndicator } from 'react-leaflet-zoom-indicator'
import { Map, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet'
import { Dialog, Paper, Button, Typography } from '@material-ui/core'
import { observer } from "mobx-react";

import appStore from '../../store'
import { PinsView } from '../index'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './style.css'

const outer = [
    [51.248860, 71.626290],
    [51.020672, 71.228844],
]

const myIcon = new L.Icon({
    iconUrl: require('./problemPin.svg'),
    iconRetinaUrl: require('./problemPin.svg'),
    iconSize: new L.Point(15, 30),
});


class MainMap extends Component {
    state = {
        bounds: outer,
        centerPosition: [51.165145, 71.419850],
        maxZoom: 19,
        minZoom: 13,
        zoom: 15
    }

    dialogHandleClick(){
        appStore.switchIsOpen()
    }

    render() {
        const { isOpen, isLoaded, getMapsPin, switchIsOpen } = appStore
        console.log(isOpen)
        if(isLoaded === false) {
            return (
                <div></div>
            )
        }
        else{
            return(
                    <div>
                        <Map maxBounds={this.state.bounds} className='map' center={this.state.centerPosition} zoom={this.state.zoom}
                             minZoom={this.state.minZoom} maxZoom={this.state.maxZoom} zoomControll={true}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            <PinsView />
                        </Map>
                        <Dialog open={isOpen} onClose={this.dialogHandleClick} id="dialog1">
                            <div>
                                You fagot
                                <button className={'root'}> Kalo</button>
                            </div>
                        </Dialog>
                    </div>
            );
        }
    }
}


export default observer(MainMap)