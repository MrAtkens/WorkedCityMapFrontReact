import axios from 'axios'
axios.defaults.withCredentials = true

const URL='localhost:44318'

export const userSingInApi = async (userPhone, userPassword,isRemember) => {
  return await axios.post(`https://${URL}/singIn`, {
    phone: userPhone,
    password: userPassword,
    rememberOption: isRemember
  }).then(response => {
    return response.data;
  });
}

export const userSingUpApi = async (userPhone, userName, userCode, userPassword, userEmail) => {
  return await axios.post(`https://${URL}/singUp`, {
    name: userName,
    phone: userPhone,
    code: userCode,
    password: userPassword,
    email: userEmail
  }).then(response => {
    return response.data;
  });
}

export const userAcceptCodeApi = async (userPhone, userStatus) => {
  return await axios.post(`https://${URL}/acceptPhone`, {
    status: userStatus,
    phone: userPhone }).then(response => {
    console.log(response.data)
    return response.data
  })
}

export const userMailAcceptCodeGenerateApi = async (userStatus, userEmail) => {
  return await axios.post(`http://${URL}/acceptMailCodeSend`, {
    status: userStatus,
    email: userEmail
  }).then(response => {
    console.log(response.data)
    return response.data
  })
}

export const userMailAcceptApi = async (userId, userEmail, userCode) => {
  return await axios.post(`http://${URL}/acceptMail`, {
    id: userId,
    code: userCode,
    email: userEmail,
  }).then(response => {
    console.log(response.data)
    return response.data
  })
}

export const rememberPasswordByPhoneApi = async (userCode, userPhone) => {
  return await axios.post(`http://${URL}/rememberPasswordByPhone`, {
    code: userCode,
    phone: userPhone
  }).then(response => {
    console.log(response.data)
    return response.data
  })
}

export const rememberPasswordByEmailApi = async (userCode, userEmail) => {
  return await axios.post(`http://${URL}/rememberPasswordByEmail`, {
    code: userCode,
    email: userEmail
  }).then(response => {
    console.log(response.data)
    return response.data
  })
}

export const userAcceptApi = async () => {
  return await axios.get(`http://${URL}/userAccept`).then(response => {
      return response.data
    }) 
}  

export const userLogOutApi = async () => {
  return await axios.get(`http://${URL}/userLogOut`).then(response => {
    return response.data
  })
}

export const userUpdateApi = async (updatedUser) => {
  return await axios.patch(`http://${URL}/update/${updatedUser._id}`, updatedUser).then(response => {
    return response.data
  })
}

export const userUpdatePasswordApi = async (updatedUser) => {
  return await axios.patch(`http://${URL}/updatePassword/${updatedUser._id}`, updatedUser).then(response => {
    return response.data
  })
}