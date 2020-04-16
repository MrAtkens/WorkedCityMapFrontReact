import axios from 'axios'
axios.defaults.withCredentials = true

import { toastServerError, toastMarkerNotFound, toastThanksForAdd } from '../../tools'

const URL='localhost:54968'

export const mapMarkersGetApi = async () => {
    return await axios.get(`http://${URL}/api/public/GetPublicMapPins`).then(response => {
        console.log(response.status)
        if(response.status === 500) {
            toastServerError()
        }
        return response.data
    })
}

export const mapMarkerGetByIdApi = async (id) => {
    return await axios.get(`http://${URL}/api/public/GetPublicMapPinById/${id}`).then(response => {
        console.log(response.status)
        if(response.status === 500){
            toastServerError()
        }
        else if (response.status === 404){
            toastMarkerNotFound()
        }
        return response.data
    })
}


export const mapMarkerAdd = async (problemPin) => {
    return await axios.post(`http://${URL}/api/public/CreateProblemPin`, {problemPin}).then(response => {
        console.log(response.status)
        if(response.status === 500){
            toastServerError()
        }
        else if(response.status === 200){
            toastThanksForAdd()
        }
        return response.data
    })
}


// export const mapMarkerAddApi = async () => {
//     return await axios.post(`http://${URL}/singIn`, {
//         phone: userPhone,
//         password: userPassword,
//         rememberOption: isRemember
//     }).then(response => {
//         return response.data;
//     });
// }
