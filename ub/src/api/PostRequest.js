// Add Users
export const PostAddUserAPI = async (payload, access_token) => {
    const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/user/admin/add-user`,payload,{
          headers:{
              'Authorization':`Bearer ${access_token}`,
              'Accept':"application/json",
          },
    }).then(function (result) {
      return result;
    }).catch((e)=>e)
    return getResponse;
}
// UpDate Users
export const PostUpdateUserAPI = async (payload, access_token) => {
    const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/user/admin/update-user`,payload,{
          headers:{
              'Authorization':`Bearer ${access_token}`,
              'Accept':"application/json",
          },
    }).then(function (result) {
      return result;
    }).catch((e)=>e)
    return getResponse;
}
// Add Mode
export const PostAddModeAPI = async (payload, access_token) => {
  const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/mode/add-mode`,payload,{
        headers:{
            'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
}
// Update Mode
export const PostUpdateModeAPI = async (payload, access_token) => {
  const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/mode/update-mode`,payload,{
        headers:{
            'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
}
// Add Questions
export const PostAddQuestionAPI = async (payload, access_token) => {
  const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/mode/question/add`,payload,{
        headers:{
            'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
}

// Update Questions
export const PostUpdateQuestionAPI = async (payload, access_token) => {
  const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/mode/question/update`,payload,{
        headers:{
            'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
}

// Update Users Profile
export const PostUpdateProfileAPI = async (payload, access_token) => {
  const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/user/profile-update`,payload,{
        headers:{
            'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
}

// PostSendotpAPI
export const PostSendotpAPI = async (payload) => {
  const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/user/otp`,payload,{
        headers:{
            // 'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
}


// PostResetForgotPasswordAPI
export const PostResetForgotPasswordAPI = async (payload) => {
  const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/user/forgot-password`,payload,{
        headers:{
            // 'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
}

// PostResetForgotPasswordAPI
export const PostChangePasswordAPI = async (payload, access_token) => {
  const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/user/change-password`,payload,{
        headers:{
            'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
}