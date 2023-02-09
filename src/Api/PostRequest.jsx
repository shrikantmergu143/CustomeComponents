export const PostRequestAPI = async (apiurl, payload, access_token, contentType) => {
  const headers = {
    'Accept':"application/json",
  }
  if(access_token){
    headers.Authorization = `Bearer ${access_token}`
  }
  if(contentType){
    headers['Content-Type']='multipart/form-data'
  }
  const getResponse = window.axios.post(`${process.env.REACT_APP_BASE_URL}/${apiurl}`,payload,{
    headers:headers,
  }).then(function (result) {
    return result;
  }).catch((e)=>e.response);
  return getResponse;
};
