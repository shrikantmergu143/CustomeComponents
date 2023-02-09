export const GetLoginAPI = async (payload) => {
  const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/user/admin/login`,payload,{
        headers:{
            'Accept':"application/json",
        },
  }).then(function (result) {
    return result;
  }).catch((e)=>e)
  return getResponse;
};