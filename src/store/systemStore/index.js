import { observable, configure, action } from "mobx"
import {createContext} from 'react'

configure({ enforceActions: 'observed'})

class SystemStore {

    @observable isOpen = false

    @action setIsOpen(status){
        this.isOpen = status
    }

};

export const SystemStoreContext = createContext(new SystemStore())