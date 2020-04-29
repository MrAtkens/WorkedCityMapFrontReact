import { observable, configure, action, decorate } from "mobx"
import { mapMarkersGetApi, mapMarkerGetByIdApi, mapMarkerAdd } from '../../API'

configure({ enforceActions: 'observed'})

class Store {

    @observable isLoaded = false
    @observable isPinLoaded = false
    @observable pinId = null
    @observable zoom = 13
    centerPositions = observable.object( {lat: 51.165145, lng: 71.419850});
    mapPins = observable.array([]);
    mapPin = observable.object({name: "", problemDescription: "", address: "", images: "", creationDate: ""});

    @action async getMapsPin(){
        const pins = await mapMarkersGetApi()
        console.log(pins.publicPins)
        this.setPins(pins.publicPins)
        this.setIsLoaded(pins.status)
    }

    @action async getMapPinById(id){
        const pin = await mapMarkerGetByIdApi(id)
        this.setPin(pin.problemPin)
        this.setIsPinLoaded(pin.status)
    }


    @action setPins(pins){
        this.mapPins = pins
    }

    @action setPin(pin){
        this.mapPin = pin
    }

    @action setPinId(pinId){
        this.pinId = pinId
    }

    @action setIsLoaded(status){
        this.isLoaded = status
    }

    @action setIsPinLoaded(status){
        this.isPinLoaded = status
    }

};

export default new Store();