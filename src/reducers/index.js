import { combineReducers } from 'redux'

import userReducer from './userReducer'
import mapReducer from './mapReducer'

export const rootReducer = combineReducers({
    userReducer: userReducer
    mapReducer: mapReducer
})
