export const GetUsersListAPI = async (type, access_token, page_limit, page_number) => {
    const getResponse = window.axios.get(`${process.env.REACT_APP_BASE_URL}/user/admin/users-list/${type}/${page_limit}/${page_number}`,{
          headers:{
              'Authorization':`Bearer ${access_token}`,
              'Accept':"application/json",
          },
    }).then(function (result) {
      return result;
    }).catch((e)=>e)
    return getResponse;
};
// Modelist
export const GetModeListAPI = async (access_token, page_number) => {
    const getResponse = window.axios.get(`${process.env.REACT_APP_BASE_URL}/mode/get-list`,{
          headers:{
              'Authorization':`Bearer ${access_token}`,
              'Accept':"application/json",
          },
    }).then(function (result) {
      return result;
    }).catch((e)=>e)
    return getResponse;
};

// Delete Mode
export const GetDeleteModeAPI = async (access_token, id) => {
  const getResponse = window.axios.get(`${process.env.REACT_APP_BASE_URL}/mode/delete-mode/${id}`,{
        headers:{
            'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
};

// Question List
export const GetQuesionListAPI = async ({type, filter, access_token, page_limit, page_number}) => {
  const getResponse = window.axios.get(`${process.env.REACT_APP_BASE_URL}/mode/question/questions-list/${filter}/${type}/${page_limit}/${page_number}`,{
        headers:{
            'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
};
// Delete Question
export const GetDeleteQuestionAPI = async (access_token, type, id) => {
  const getResponse = window.axios.get(`${process.env.REACT_APP_BASE_URL}/mode/question/delete/${type}/${id}`,{
        headers:{
            'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
};

// Get User
export const GetUserProfileAPI = async (access_token) => {
  const getResponse = window.axios.get(`${process.env.REACT_APP_BASE_URL}/user/get`,{
        headers:{
            'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
};

// Get Dashboard counts
export const GetDashboardCountAPI = async (access_token) => {
  const getResponse = window.axios.get(`${process.env.REACT_APP_BASE_URL}/user/admin/counts`,{
        headers:{
            'Authorization':`Bearer ${access_token}`,
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
};