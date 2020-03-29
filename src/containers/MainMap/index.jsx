
import React, { PureComponent } from 'react'
import { ReactLeafletZoomIndicator } from 'react-leaflet-zoom-indicator'
import { Map, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet'
import { Dialog, Paper, Button, Typography } from '@material-ui/core'

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


class MainMap extends PureComponent  {
    state = {
        bounds: outer,
        lat: 51.165145,
        lng: 71.419850,
        maxZoom: 19,
        minZoom: 13,
        zoom: 15,
        isOpen: false
    }

    toggleAnimate = () => {
        this.setState({
            animate: !this.state.animate,
        })
    }

    markerOnClick = () => {
        if(this.state.isOpen)
            this.setState({isOpen: false})
        else
            this.setState({isOpen: true})
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <div>
                <Map maxBounds={this.state.bounds} className='map' center={position} zoom={this.state.zoom} minZoom={this.state.minZoom} maxZoom={this.state.maxZoom} zoomControll={true}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker icon={myIcon} position={position} onClick={this.markerOnClick}/>
                </Map>
                <Dialog open={this.state.isOpen} onClose={this.markerOnClick} id="dialog1">
                    <div>
                        You fagot
                        <button className={'root'}> Kalo</button>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default MainMap