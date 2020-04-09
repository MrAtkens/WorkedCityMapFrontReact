
import React, { Component } from 'react'
import { ReactLeafletZoomIndicator } from 'react-leaflet-zoom-indicator'
import { Map, TileLayer } from 'react-leaflet'
import { observer } from "mobx-react";

import appStore from '../../store'
import { PinsView } from '../index'

import 'leaflet/dist/leaflet.css'
import './style.css'

const outer = [
    [51.248860, 71.626290],
    [51.020672, 71.228844],
]


export @observer class MainMap extends Component {
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

    componentDidMount() {
        appStore.getMapsPin()
    }

    render() {
        const { isLoaded, getMapsPin, switchIsOpen } = appStore
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
                    </div>
            );
        }
    }
}


