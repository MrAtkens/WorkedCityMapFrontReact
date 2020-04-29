import React, { Component } from 'react'
import { Button, Grid, Card, CardActions, CardContent, CardHeader, Typography} from "@material-ui/core";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom"

import { mapStore }  from '../../store'
import './style.css'

@observer
class PinView extends Component {
    componentDidMount() {
        mapStore.getMapPinById(this.props.match.params.id)
        mapStore.setPinId(null)
    }
    render() {
        const { mapPin, isPinLoaded } = mapStore
        if(isPinLoaded === false){
            return(<div>Loaded</div>)
        }
        else {
            console.log(mapPin)
            return (

                <Grid className="mainGrid" container>
                    <Grid item xs={12}>
                            {mapPin.images.map(image => {
                                return (<img key={image.id} src={`${image.webImagePath}`} alt={`${image.alt}`}/>)
                            })}
                        <Typography className="typ-headers" variant={"h2"}>
                            {mapPin.name}
                        </Typography>
                        <Typography className="typ-headers" variant={"h4"}>
                            {mapPin.address}
                        </Typography>
                        <Typography className="typ-headers" variant={"h4"}>
                            {mapPin.creationDate}
                        </Typography>
                    </Grid>
                    <Grid className="grid-desc" item xs={12} sm={6}>
                                <Typography className="typ-headers" variant={"h4"}>Описание проблемы</Typography>
                                <Typography className="description" variant="subtitle2" gutterBottom>
                                    {mapPin.problemDescription}
                                </Typography>
                    </Grid
                </Grid>
            );
        }
    }
}

export default PinView