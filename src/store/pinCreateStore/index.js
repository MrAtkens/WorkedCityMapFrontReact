import { observable, configure, action, decorate } from "mobx"
import { mapMarkersGetApi, mapMarkerGetByIdApi, mapMarkerAdd } from '../../API'

configure({ enforceActions: 'observed'})

class Store {

    @observable isGeolocationOn = false
    @observable isCreated = false
    @observable address = ""
    latLng = observable.object({lat: new Number(), lng: new Number()});


    @action async addProblemPin(name, problemDescription, images){
        const problemPin = {
            name: name,
            problemDescription: problemDescription,
            lat: this.latLng.lat,
            lng: this.latLng.lng,
            address: this.address,
            files: images
        }
        const answer = await mapMarkerAdd(problemPin)
        this.setIsCreated(answer)
    }

    @action setIsCreated(status){
        this.isCreated = status
    }

    @action setLatLng(latLng){
        this.latLng = latLng
    }

    @action setAddress(address){
        this.address = address
    }

    @action setIsGeolocationOn(isGeolocationOn){
        this.isGeolocationOn = isGeolocationOn
    }

};

export default new Store();