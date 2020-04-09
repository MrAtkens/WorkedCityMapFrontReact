import { observable, configure, action, decorate } from "mobx"
import { mapMarkersGetApi, mapMarkerGetByIdApi } from '../API'

configure({ enforceActions: 'observed'})

class Store {

    @observable isLoaded = false
    @observable isOpen = false
    mapPins = observable.array([]);
    mapPin = observable.object({});

    @action async getMapsPin(){
        const pins = await mapMarkersGetApi()
        console.log(pins.publicPins)
        this.setPins(pins.publicPins)
        this.setIsLoaded(true)
    }

    @action async getMapPinById(id){
        const pin = await mapMarkerGetByIdApi(id)
        console.log(pin)
        this.setPin(pin)
    }

    @action switchIsOpen(){
        console.log(this.isOpen)
        if(this.isOpen === true)
            this.setIsOpen(false)
        else
            this.setIsOpen(true)
    }

    @action setPins(pins){
        this.mapPins = pins
    }

    @action setPin(pin){
        this.mapPin = pin
    }

    @action setIsLoaded(status){
        this.isLoaded = status
    }

    @action setIsOpen(status){
        this.isOpen = status
    }

};

export default new Store();