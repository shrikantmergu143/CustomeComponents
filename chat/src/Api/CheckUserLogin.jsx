import GetUser from "./GetUser";

const GetCheckUserLoginAPI = async ( access_token) => {
    let value;
    const Responce = await GetUser(access_token);
    console.log("Responce?.response", Responce)
    if(Responce?.data){
      value = true;
    }else{
      value = false
    }
    return value;
};

export default GetCheckUserLoginAPI;
