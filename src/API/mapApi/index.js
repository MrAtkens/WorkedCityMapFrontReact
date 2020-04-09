import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:54968'

export const mapMarkersGetApi = async () => {
    return await axios.get(`http://${URL}/api/public/GetPublicMapPins`).then(response => {
        console.log(response.data)
        return response.data
    })
}

export const mapMarkerGetByIdApi = async (id) => {
    return await axios.get(`http://${URL}/api/public/GetPublicMapPinById/${id}`).then(response => {
        console.log(response.data)
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
