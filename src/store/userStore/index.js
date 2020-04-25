import { observable, configure, action, decorate } from "mobx"
import { mapMarkersGetApi, mapMarkerGetByIdApi, mapMarkerAdd } from '../API'

configure({ enforceActions: 'observed'})

class Store {

    @observable isDialogOpen = false

    @action switchIsDialogOpen(){
        if(this.isDialogOpen === true)
            this.setIsDialogOpen(false)
        else
            this.setIsDialogOpen(true)
    }

    @action setIsDialogOpen(isDialogOpen){
        this.isDialogOpen = isDialogOpen
    }


};

export default new Store();