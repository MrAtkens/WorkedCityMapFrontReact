import {
    GET_MARKERS_MAP_SUCCES, GET_MARKERS_MAP_FAILURE
} from '../../actionType'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const reloadPage = () => {
    window.location.reload();
}

const toastSucces = (text) => {
    toast.success(text, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}

const toastError = (text) => {
    toast.error(text , {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}

const initialState = {
    mapMarkers: [],
    marker: {},
    isLoaded: Boolean,
    isCreated: Boolean,
    isAccepted: Boolean
}

function mapReducer(state = initialState, action) {
    switch (action.type) {
        // SINGIN USER
        case GET_MARKERS_MAP_SUCCES:
            //console.log(action.payload.buffer.redirectStatus)
            return { ...state, mapMarkers: action.payload,  isLoaded: true }

        case GET_MARKERS_MAP_FAILURE:
            toastError("Произошла ошибка пожалуйста попробуйте позже")
            return { ...state, error: action.payload.message }
        default:
            return state
    }
}


export default mapReducer