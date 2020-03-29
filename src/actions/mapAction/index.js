import { mapMarkersGetApi } from '../../API'

import {
    GET_MARKERS_MAP_START,
    GET_MARKERS_MAP_SUCCES,
    GET_MARKERS_MAP_FAILURE
} from '../../actionType'

export const mapMarkersGet = () => async dispatch => {
    dispatch({type: GET_MARKERS_MAP_START})

    try {
        const markers = await mapMarkersGetApi()
        console.log(markers)

        dispatch({
            type: GET_MARKERS_MAP_SUCCES,
            payload: markers
        })
    } catch (err) {
        dispatch({
            type: GET_MARKERS_MAP_FAILURE,
            payload: err,
            error: true
        })
    }
}