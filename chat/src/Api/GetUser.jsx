const GetUser = (accessToken) => {
    const axios = require('axios').default;

    axios.get(`${process.env.REACT_APP_BASE_URL}/user/get`, {
        headers: {
            "Vary": "Accept",
            "Authorization": `Bearer ${accessToken}`,
        }
    })
    .then(function (response) {
    })
    .catch(function (error) {
    })
    .then(function () {
        // always executed
    });
};

export default GetUser;
 