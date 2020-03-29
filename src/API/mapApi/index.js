import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:3444'

export const mapMarkersGetApi = async () => {
    return await axios.get(`http://${URL}/markers`).then(response => {
        return response.data
    })
}
//
// export const mapMarkerAddApi = async () => {
//     return await axios.post(`http://${URL}/singIn`, {
//         phone: userPhone,
//         password: userPassword,
//         rememberOption: isRemember
//     }).then(response => {
//         return response.data;
//     });
// }
