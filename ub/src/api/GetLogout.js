export const GetLogoutAPI = async ( access_token ) => {
    const getResponse = window.axios.get(`${process.env.REACT_APP_BASE_URL}/user/logout`,{
          headers:{
              'Authorization':`Bearer ${access_token}`,
              'Accept':"application/json",
          },
    }).then(function (result) {
        return result;
    }).catch((e)=>e)
        return getResponse;
}