import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const toastServerError = () => {
    toast.error(`Ошибка сервера пожалуйста попробуйте позже, Код: 500`, {
        position:"bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}

export const toastMarkerNotFound = () => {
    toast.error(`Ошибка запроса, данный маркер не был найден, Код: 404`, {
        position:"bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}

export const toastThanksForAdd = () => {
    toast.success(`Предоставленная вами проблема отправленна успешна и на данный момент проходит модерацию, спасибо за вашу помощь городу`, {
        position:"bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}