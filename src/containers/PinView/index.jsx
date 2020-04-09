import React, { Component } from 'react'
import { Button, Grid, Card, CardActions, CardContent, CardHeader, Typography} from "@material-ui/core";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom"

import appStore from '../../store'
import './style.css'

export @observer class PinView extends Component {
    componentDidMount() {
        let { id } = useParams();
        appStore.getMapPinById(id)
    }
    render() {
        const { mapPin } = appStore
        return (
            <Grid className="mainGrid" container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Card className="card">
                        <CardHeader title={mapPin.name} subheader={`${mapPin.region}, ${mapPin.street}, ${mapPin.buildingNumber}`}/>
                        <CardContent>
                            <Typography variant={"h2"}>Описание местонахождения</Typography>
                            <Typography className="card-description" variant="subtitle1" gutterBottom>
                                {mapPin.description}
                            </Typography>
                            <Typography variant={"h2"}>Описание проблемы</Typography>
                            <Typography className="card-description" variant="subtitle2" gutterBottom>
                                {mapPin.problemDescription}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className="card"></Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className="card">xs=12</Card>
                </Grid>
            </Grid>
        );
    }
}

