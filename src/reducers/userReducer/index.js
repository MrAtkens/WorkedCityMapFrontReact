import {
    SINGIN_USER_SUCCES, SINGIN_USER_FAILURE,
    SINGUP_USER_SUCCES, SINGUP_USER_FAILURE,
    PASSWORD_REMEMBER_BY_PHONE_SUCCES, PASSWORD_REMEMBER_BY_PHONE_FAILURE, 

    GET_SINGUP_CODE_SUCCES, GET_SINGUP_CODE_FAILURE,
    GET_ACCEPT_MAIL_CODE_SUCCES, GET_ACCEPT_MAIL_CODE_FAILURE,

    ACCEPT_MAIL_SUCCES, ACCEPT_MAIL_FAILURE,
    USER_ACCEPT_SUCCES, USER_ACCEPT_FAILURE,

    SINGOUT_USER_SUCCES, SINGOUT_USER_FAILURE,

    USER_UPDATE_SUCCES, USER_UPDATE_FAILURE,
    USER_UPDATE_PASSWORD_SUCCES, USER_UPDATE_PASSWORD_FAILURE,

    SEND_MESSAGE_SUCCES, SEND_MESSAGE_FAILURE,

    ORDER_SUCCES, ORDER_FAILURE, PASSWORD_REMEMBER_BY_EMAIL_SUCCES, PASSWORD_REMEMBER_BY_EMAIL_FAILURE, USER_UPDATE_STATUS_REFRESH
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
   user:{},
   userPhone: "",
   singUpCodeStatus: false,
   rememberPasswordStatus: Boolean,
   codeGenerateStatus: false,
   mailCodeGenerateStatus: Boolean,

   redirectStatus: Boolean,
   singUpRedirect: Boolean,
   updateStatus: Boolean,
   orderStatus: Boolean,
   sendStatus: Boolean,
   isAccept: false
  }
  
  function userReducer(state = initialState, action) {
      switch (action.type) {
    // SINGIN USER 
      case SINGIN_USER_SUCCES:
          //console.log(action.payload.buffer.redirectStatus)
          return { ...state, user: action.payload.buffer.packUser, redirectStatus: action.payload.buffer.redirectStatus, isAccept: true }
        
      case SINGIN_USER_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
          return { ...state, error: action.payload.message }
    // SINGUP USER
      case SINGUP_USER_SUCCES:
        if(action.payload){
          toastSucces("Вы успешно зарегистрировались")
          return { ...state, singUpRedirect: action.payload, singUpCodeStatus: Boolean } 
        }
        else{
          toastError("Не верный код или данная почта уже используется")
          return { ...state, singUpRedirect: action.payload }
        }
          
      case SINGUP_USER_FAILURE:
        toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message }

    // PASSWORD REMEMBER
      case PASSWORD_REMEMBER_BY_PHONE_SUCCES:
        console.log(action.payload)
        if(action.payload){
          toastSucces("Ваш пароль успешно изменён на новый сгенерированный системой, просим вас поменять пароль в окне пользователя")
          reloadPage()
        }
        else{
          toastError("Не верный код")
        }
        return { ...state, rememberPasswordStatus: action.payload }

      case PASSWORD_REMEMBER_BY_PHONE_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
          return { ...state, error: action.payload.message}
      
      case PASSWORD_REMEMBER_BY_EMAIL_SUCCES:
        if(action.payload){
          toastSucces("Ваш пароль успешно изменён на новый сгенерированный системой, просим вас поменять пароль в окне пользователя")
        }
        else{
          toastError("Не верный код")
        }
        return { ...state, rememberPasswordStatus: action.payload }
      
      case PASSWORD_REMEMBER_BY_EMAIL_FAILURE:
        toastError("Произошла ошибка пожалуйста попробуйте позже")
        return { ...state, error: action.payload.message}

    //ACCEPT PHONE 
      case GET_SINGUP_CODE_SUCCES:
        if(action.payload.status){
          toastSucces("Код сгенерирован и отправлен на телефон")
        }
        else{
          toastError("Данный телефон не зарегистрирован")
        }
        return { ...state, userPhone: action.payload.phone, singUpCodeStatus: action.payload.status }

      case GET_SINGUP_CODE_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
          return { ...state, error: action.payload.message, singUpCodeStatus: false }

    //GENERATE MAIL ACCEPT CODE
    case GET_ACCEPT_MAIL_CODE_SUCCES:
      if(action.payload.mailAcceptStatus === false){
        toastError("Эта почта не прошла подтверждение")
      }
      else{
        if(action.payload.status){
          toastSucces("Код сгенерирован и отправлен на почту")
        }
        else{
          toastError("Эта почта не зарегистрирована")
        }
      }
      return { ...state, codeGenerateStatus: action.payload.status}

    case GET_ACCEPT_MAIL_CODE_FAILURE:
      toastError("Произошла ошибка пожалуйста попробуйте позже")
      return { ...state, error: action.payload.message, codeGenerateStatus: false }

    //ACCEPT MAIL
    case ACCEPT_MAIL_SUCCES:
      if(action.payload){
        toastSucces("Вы успешно подтвердиле почту")
        reloadPage()
      }
      else{
        toastError("Не верный код подтверждения")
      }
      return { ...state, codeGenerateStatus: Boolean }

    case ACCEPT_MAIL_FAILURE:
      toastError("Произошла ошибка пожалуйста попробуйте позже")
      return { ...state, error: action.payload.message }
    // USER ACCEPT
      case USER_ACCEPT_SUCCES:
        return { ...state, user: action.payload.buffer.packUser, redirectStatus: action.payload.buffer.redirectStatus, isAccept: true, rememberPasswordStatus: Boolean }

      case USER_ACCEPT_FAILURE:
        return { ...state, error: action.payload.message }
          
    // SINGOUT USER
      case SINGOUT_USER_SUCCES:
        return { ...state, user: action.payload, redirectStatus: Boolean }
  
      case SINGOUT_USER_FAILURE:
          return { ...state, error: action.payload.message }
    // USER UPDATE
      case USER_UPDATE_SUCCES:
          if(action.payload){
            toastSucces("Вы успешно изменили данные")
          }
          else{
            toastError("Произошла ошибка во время внесение изменений, пожалуйста попробуйте позже")
          }
          return { ...state, updateStatus: action.payload}
      
      case USER_UPDATE_FAILURE:
          return { ...state, error: action.payload.message }
    // USER UPDATE PASSWORD    
      case USER_UPDATE_PASSWORD_SUCCES:
            if(action.payload){
              toastSucces("Вы успешно изменили пароль")
            }
            else{
              toastError("Произошла ошибка во время смены пароля, пожалуйста попробуйте позже")
            }
            return { ...state, updateStatus: action.payload}
        
        case USER_UPDATE_PASSWORD_FAILURE:
            return { ...state, error: action.payload.message }
    // USER_UPDATE_REFRESH

      case USER_UPDATE_STATUS_REFRESH:
        return { ...state, updateStatus: Boolean}
  
    // ORDER STATUS
      case ORDER_SUCCES:
          if(action.payload){
            toastSucces("Заказ прошёл успешно, скоро мы вам позвоним")
          }
          else{
            toastError("Заказ прошёл с ошибкой, пожулуйста попробуйте позже")
          }
          return { ...state, orderStatus: action.payload }
  
      case ORDER_FAILURE:
            toastError("Произошла ошибка пожалуйста попробуйте позже")
          return { ...state, error: action.payload.message }   
    // SEND MESSAGE
      case SEND_MESSAGE_SUCCES:
          if(action.payload){
            toastSucces("Спасибо за отправленное письмо")
          }
          else{
            toastError("Простите произошла ошибка при отправке письма, пожалуйста попробуйте позже")
          }
          return { ...state, sendStatus: action.payload }
          
      case SEND_MESSAGE_FAILURE:
          toastError("Произошла ошибка пожалуйста попробуйте позже")
          return { ...state, error: action.payload.message }
  
        default:
          return state
      }
    }
    
  
  export default userReducer