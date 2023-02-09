const GetUserProfile = (accessToken) => {
    // Let us open a web socket
    let ws = new WebSocket(process.env.REACT_APP_SERVICE_URL);
				
    ws.onopen = function() {
        const param = {
            "transmit":"single", 
            "url": accessToken
        }

       // Web Socket is connected, send data using send()
       ws.send(param);
       alert("Message is sent...");
    };
     
    ws.onmessage = function (evt) { 
        let received_msg = evt.data;
       alert("Message is received...");
    };
};

export default GetUserProfile;
