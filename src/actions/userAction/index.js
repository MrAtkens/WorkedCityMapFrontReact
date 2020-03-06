import { userSingInApi, userSingUpApi, sendMailApi, orderApi, userAcceptApi, userMailAcceptApi, 
  userMailAcceptCodeGenerateApi, userLogOutApi, userUpdateApi, userUpdatePasswordApi, userAcceptCodeApi, rememberPasswordByPhoneApi, rememberPasswordByEmailApi } from '../../API'

import {
SINGIN_USER_START, SINGIN_USER_SUCCES, SINGIN_USER_FAILURE,
SINGUP_USER_START, SINGUP_USER_SUCCES, SINGUP_USER_FAILURE,

PASSWORD_REMEMBER_BY_PHONE_START, PASSWORD_REMEMBER_BY_PHONE_SUCCES, PASSWORD_REMEMBER_BY_PHONE_FAILURE,
PASSWORD_REMEMBER_BY_EMAIL_START, PASSWORD_REMEMBER_BY_EMAIL_SUCCES, PASSWORD_REMEMBER_BY_EMAIL_FAILURE,

GET_SINGUP_CODE_START, GET_SINGUP_CODE_SUCCES, GET_SINGUP_CODE_FAILURE,
GET_ACCEPT_MAIL_CODE_START, GET_ACCEPT_MAIL_CODE_SUCCES, GET_ACCEPT_MAIL_CODE_FAILURE,

USER_ACCEPT_START, USER_ACCEPT_SUCCES, USER_ACCEPT_FAILURE,
ACCEPT_MAIL_START, ACCEPT_MAIL_SUCCES, ACCEPT_MAIL_FAILURE,

SINGOUT_USER_START, SINGOUT_USER_SUCCES, SINGOUT_USER_FAILURE,

USER_UPDATE_START, USER_UPDATE_SUCCES, USER_UPDATE_FAILURE,
USER_UPDATE_PASSWORD_START, USER_UPDATE_PASSWORD_SUCCES, USER_UPDATE_PASSWORD_FAILURE,
USER_UPDATE_STATUS_REFRESH,

SEND_MESSAGE_START, SEND_MESSAGE_SUCCES, SEND_MESSAGE_FAILURE,

ORDER_START, ORDER_SUCCES, ORDER_FAILURE,
} from '../../actionType'

export const userSingIn = (phone, password, isRemember) => async dispatch => {
  dispatch({type: SINGIN_USER_START})

try {
  const packageUser = await userSingInApi(phone, password, isRemember)
  console.log("ACTION: packageUser "+ packageUser.buffer.redirectStatus)
  
  dispatch({
    type: SINGIN_USER_SUCCES,
    payload: packageUser
  })
} catch (err) {
  dispatch({
    type: SINGIN_USER_FAILURE,
    payload: err,
    error: true
  })
}
}

export const userSingUp = (phone, name, code, password, email) => async dispatch => {
  dispatch({type: SINGUP_USER_START})

try {
  const redirectStatus = await userSingUpApi(phone,name, code, password, email)

  dispatch({
    type: SINGUP_USER_SUCCES,
    payload: redirectStatus.status
  })
} catch (err) {
  dispatch({
    type: SINGUP_USER_FAILURE,
    payload: err,
    error: true
  })
}
}

export const userAcceptCode = (phone, userStatus) => async dispatch => {
  dispatch({type: GET_SINGUP_CODE_START})

  try{
    const data = await userAcceptCodeApi(phone, userStatus)
    data.phone = phone
    console.log(data)
    dispatch({
      type: GET_SINGUP_CODE_SUCCES,
      payload: data
    })
  } catch(err){
    dispatch({
      type: GET_SINGUP_CODE_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const userMailAcceptCodeGenerate = (status ,email) => async dispatch => {
  dispatch({type: GET_ACCEPT_MAIL_CODE_START})

  try{
    const data = await userMailAcceptCodeGenerateApi(status, email)
    console.log(data)
    dispatch({
      type: GET_ACCEPT_MAIL_CODE_SUCCES,
      payload: data
    })
  } catch(err){
    dispatch({
      type: GET_ACCEPT_MAIL_CODE_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const userMailAccept = (id, email, code) => async dispatch => {
  dispatch({type: ACCEPT_MAIL_START})

  try{
    const data = await userMailAcceptApi(id, email, code)
    console.log(data)
    dispatch({
      type: ACCEPT_MAIL_SUCCES,
      payload: data
    })
  } catch(err){
    dispatch({
      type: ACCEPT_MAIL_FAILURE,
      payload: err,
      error: true
    })
  }
}


export const rememberPasswordByPhone = (code, phone) => async dispatch => {
  dispatch({type: PASSWORD_REMEMBER_BY_PHONE_START})

  try{
    const data = await rememberPasswordByPhoneApi(code, phone)
    dispatch({
      type: PASSWORD_REMEMBER_BY_PHONE_SUCCES,
      payload: data
    })
  } catch(err){
    dispatch({
      type: PASSWORD_REMEMBER_BY_PHONE_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const rememberPasswordByEmail = (code, email) => async dispatch => {
  dispatch({type: PASSWORD_REMEMBER_BY_EMAIL_START})

  try{
    const data = await rememberPasswordByEmailApi(code, email)
    console.log(data)
    console.log(data.status)
    dispatch({
      type: PASSWORD_REMEMBER_BY_EMAIL_SUCCES,
      payload: data.status
    })
  } catch(err){
    dispatch({
      type: PASSWORD_REMEMBER_BY_EMAIL_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const userAccept = () => async dispatch => {
  dispatch({type: USER_ACCEPT_START})

try {
  const packageUser = await userAcceptApi()
  console.log(packageUser)
  dispatch({
    type: USER_ACCEPT_SUCCES,
    payload: packageUser
  })
} catch (err) {
  dispatch({
    type: USER_ACCEPT_FAILURE,
    payload: err,
    error: true
  })
}
}

export const userSingOut = () => async dispatch => {
  dispatch({type: SINGOUT_USER_START})

  try {
    await userLogOutApi()

    dispatch({
      type: SINGOUT_USER_SUCCES,
      payload: ""
    })
  } catch (err) {
    dispatch({
      type: SINGOUT_USER_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const userUpdate = (updatedUser) => async dispatch => {
  dispatch({type: USER_UPDATE_START})

  try{
    const status = await userUpdateApi(updatedUser)
    dispatch({
      type: USER_UPDATE_SUCCES,
      payload: status.status
    })
  }
  catch(err){
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload: err,
      error: true
    })
  }
}

export const userUpdatePassword = (updatedUser) => async dispatch => {
  dispatch({type: USER_UPDATE_PASSWORD_START})
    try{
      const status = await userUpdatePasswordApi(updatedUser)
      dispatch({
        type: USER_UPDATE_PASSWORD_SUCCES,
        payload: status.status
      })
    }
    catch(err){
      dispatch({
        type: USER_UPDATE_PASSWORD_FAILURE,
        payload: err,
        error: true
      })
    }    
  }

export const sendOrder = (name, email, phone, price, products) => async dispatch => {
  dispatch({type: ORDER_START})

try {
  const sendStatus = await orderApi(name, email, phone, price, products)
  
  console.log(sendStatus.status)

  dispatch({
    type: ORDER_SUCCES,
    payload: sendStatus.status
  })
} catch (err) {
  dispatch({
    type: ORDER_FAILURE,
    payload: err,
    error: true
  })
}
}

export const sendMail = (email, name, phone, message) => async dispatch => {
  dispatch({type: SEND_MESSAGE_START})

try {
  const sendStatus = await sendMailApi(email, name, phone, message)
  console.log(sendStatus.status)

  dispatch({
    type: SEND_MESSAGE_SUCCES,
    payload: sendStatus.status
  })
} catch (err) {
  dispatch({
    type: SEND_MESSAGE_FAILURE,
    payload: err,
    error: true
  })
}
}

export const userUpdateStatusRefresh = () => dispatch => {
  dispatch({type: USER_UPDATE_STATUS_REFRESH})
}