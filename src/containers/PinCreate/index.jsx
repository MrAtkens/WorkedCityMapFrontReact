import React, { Component } from 'react'
import { Button, Grid, Card, CardActions, CardContent, CardHeader, Typography} from "@material-ui/core";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom"

import appStore from '../../store'
import './style.css'

@observer
class PinView extends Component {
    componentDidMount() {
        appStore.getMapPinById(this.props.match.params.id)
        appStore.setPinId(null)
    }
    render() {
        const { mapPin, isPinLoaded } = appStore
        if(isPinLoaded === false){
            return(<div>Loaded</div>)
        }
        else {
            console.log(mapPin)
            return (
                <Grid className="mainGrid" container>
                    <Grid item xs={12} sm={6}>
                        <Card className="card">
                            <CardHeader title={mapPin.name} subheader={mapPin.creationDate}/>
                            <CardContent>
                                <Typography variant={"h4"}>Описание местонахождения</Typography>
                                <Typography className="card-description" variant="subtitle1" gutterBottom>
                                    {mapPin.description}
                                </Typography>
                                <Typography variant={"h4"}>Описание проблемы</Typography>
                                <Typography className="card-description" variant="subtitle2" gutterBottom>
                                    {mapPin.problemDescription}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className="card">
                            <Typography variant={"h4"}>Регион</Typography>
                            <Typography className="card-description" variant="subtitle2" gutterBottom>
                                {mapPin.region}
                            </Typography>
                            <Typography variant={"h4"}>Регион</Typography>
                            <Typography className="card-description" variant="subtitle2" gutterBottom>
                                {mapPin.region}
                            </Typography>
                            <Typography variant={"h4"}>Улица</Typography>
                            <Typography className="card-description" variant="subtitle2" gutterBottom>
                                {mapPin.street}
                            </Typography>
                            {mapPin.buildingNumber === 0 ? (
                                <Typography variant={"h4"}>Проблема была не в зданий и не внутри двора
                                    здания</Typography>
                            ) : (
                                <div>
                                    <Typography variant={"h4"}>Номер здания</Typography>
                                    <Typography className="card-description" variant="subtitle2" gutterBottom>
                                        {mapPin.buildingNumber}
                                    </Typography>
                                </div>
                            )}
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className="card-gallery"><img src={mapPin.pinSvgUrl}/></Card>
                    </Grid>
                </Grid>
            );
        }
    }
}

export default PinView