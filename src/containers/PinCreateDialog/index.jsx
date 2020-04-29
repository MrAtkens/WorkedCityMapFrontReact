
import React, { Component } from 'react'
import { Marker } from 'react-leaflet'
import { observer } from "mobx-react";
import { Link } from 'react-router-dom'

import { userStore }  from '../../store'

@observer
class PinsView extends Component {

    handleDialogOnClose(id){
        userStore.switchIsDialogOpen()
    }

    handleAdd(){

    }

    render() {
        const { isDialogOpen } = userStore
        return (
            <Dialog
                maxWidth={"xl"}
                open={isDialogOpen}
                onClose={this.handleDialogOnClose}
                aria-labelledby="max-width-dialog-title">
                <DialogTitle>
                    <IconButton onClick={this.handleDialogOnClose}>
                        <CancelIcon />
                    </IconButton >
                    <TextField name="name" label="Название" variant="outlined"  margin="normal"
                               fullWidth
                               inputRef={(inputName) => this.inputName = inputName}/>
                </DialogTitle>
                <DialogContent>
                    <Grid>
                        <TextField name="price" label="Цена в тг" className="price-field" variant="outlined" margin="normal"
                                   inputRef={(inputPrice) => this.inputPrice = inputPrice}
                                   type="number"/>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleAdd} color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


export default PinsView;
