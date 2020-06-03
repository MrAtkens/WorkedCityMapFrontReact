import React, { useContext, useEffect } from 'react';
import { Fab, Tooltip } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { observer } from 'mobx-react' // 6.x or mobx-react-lite@1.4.0
import { Redirect } from 'react-router-dom'
import {Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { toastServerError } from '../../tools'

import { MapStoreContext, PinCreateContext, SystemStoreContext }  from '../../store'
import CreateDialogAccept from '../CreateDialogAccept'
import './style.scss'

const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
)

const MainMap = observer((props) => {
    const mapStore = useContext(MapStoreContext)
    const pinCreateStore = useContext(PinCreateContext)
    const systemStore = useContext(SystemStoreContext)

    useEffect(() => {
        mapStore.getMapsPin()
    }, [])

    const onMapClick = (mapProps, map, clickEvent) => {
        const geocoder = new mapProps.google.maps.Geocoder();
        const latLngStr = clickEvent.latLng.toString().split(',', 2)
        const latLng = {lat: parseFloat(latLngStr[0].replace('(','')), lng: parseFloat(latLngStr[1])};
        pinCreateStore.setLatLng(latLng)
        const buffer = {'location': latLng}
        geocoder.geocode(buffer, (results, status) => {
            if(status === 'OK') {
                pinCreateStore.setAddress(results[0].formatted_address)
                systemStore.setIsOpen(true)
            }
            else
                toastServerError()
        })
    }

     const handleMarkerOnClick = (id) => {
        mapStore.setPinId(id)
     }

     const renderRedirect = () => {
         if (mapStore.pinId !== null)
             return (<Redirect to={`/pin/${mapStore.pinId}`} push/>)
     }

        if (mapStore.isLoaded === false) {
            return (<div className="loader-wrapper">Loaded</div>)
        }
        else {
            return(
                    <div>
                        {renderRedirect()}
                        <Map google={props.google} zoom={mapStore.zoom}
                             className="map"
                             initialCenter={mapStore.centerPositions}
                             streetViewControl={false}
                             fullscreenControl={false}
                             onClick={onMapClick}>
                            {mapStore.mapPins.map(value => {
                                return (
                                    <Marker key={value.id} name={value.name} position={{ lat: value.lat, lng: value.lng }}
                                            onClick={(event) => handleMarkerOnClick(value.id)}/>
                                )
                            })}
                        </Map>
                        <Tooltip className="fab" placement={"left"} title="Напишите ваши отзывы" arrow>
                            <Fab className="fab" color="secondary" aria-label="send">
                                <SendIcon/>
                            </Fab>
                        </Tooltip>
                        <CreateDialogAccept/>
                    </div>
            )
        }
})


export default GoogleApiWrapper({
    apiKey: ("AIzaSyAzF9M_VxXxFOQSZOWcHpiShoni_g6yi4E"),
    language: 'kz',
    LoadingContainer: LoadingContainer
})(MainMap)