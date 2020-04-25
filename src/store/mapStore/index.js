import { observable, configure, action, decorate } from "mobx"
import { mapMarkersGetApi, mapMarkerGetByIdApi, mapMarkerAdd } from '../API'

configure({ enforceActions: 'observed'})

class Store {

    @observable isLoaded = false
    @observable isPinLoaded = false
    @observable isCreated = false
    @observable pinId = null
    @observable isGeolocationOn = false
    userCoordinates = observable.object({lat: 0.0, lng: 0.0});
    mapPins = observable.array([]);
    mapPin = observable.object({name: new String(), lat: new Number(), lng: new Number(), locationDescription: new String(), street: new String(), buildingNumber: new Number(), region: new String()});

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

    @action async addProblemPin(name, locationDescription, problemDescription, lat, lng, street, buildingNumber, region, images){
        const problemPin = {
            name: name,
            locationDescription : locationDescription,
            problemDescription: problemDescription,
            lat: lat,
            lng: lng,
            street: street,
            buildingNumber: buildingNumber,
            region: region,
        }
        const answer = await mapMarkerAdd(problemPin)
        this.setIsCreated(answer)
    }


    @action setUserCoordinates(coordinates){
        this.userCoordinates.lat = coordinates.latitude
        this.userCoordinates.lng = coordinates.longitude
    }

    @action setIsGeolocationOn(isGeolocationOn){
        this.isGeolocationOn = isGeolocationOn
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

    @action setIsCreated(status){
        this.isCreated = status
    }
};

export default new Store();