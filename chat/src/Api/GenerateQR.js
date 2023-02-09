const GenerateQRcodeAPI = async () => {
  const responce = window.axios.get(`${process.env.REACT_APP_BASE_URL}/user/generate-qr-token`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }}).then(function (result) {
        return result;
    }).catch(function (result) {
    });
    return responce;
};

export default GenerateQRcodeAPI;