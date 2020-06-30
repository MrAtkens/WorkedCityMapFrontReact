import { toastServerError, toastMarkerNotFoundError, toastThanksForAdd } from '../../tools'
import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:44318'

export const mapMarkersGetApi = async () => {
    return await axios.get(`https://${URL}/api/public/GetPublicMapPins`).then(response => {
        if(response.status === 500)
            toastServerError()
        return response.data
    })
}

export const mapMarkerGetByIdApi = async (id) => {
    return await axios.get(`https://${URL}/api/public/GetPublicMapPinById/${id}`).then(response => {
        if(response.status === 500)
            toastServerError()
        else if (response.status === 404)
            toastMarkerNotFoundError()
        return response.data
    })
}


export const mapMarkerAdd = async (problemPinDTO) => {
    console.log(problemPinDTO)
    return await axios.post(`https://${URL}/api/Public/CreateProblemPin`, problemPinDTO, {
        headers: {'Content-Type': 'multipart/form-data' }
    }).then(response => {
            console.log(response)
        if(response.status === 500)
            toastServerError()
        else if(response.status === 200) {
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
