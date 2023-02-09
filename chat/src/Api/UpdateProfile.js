const getUserProfileAPI = (accessToken) => {
   return((dispatch)=>{
      // Let us open a web socket
      const ws = new WebSocket(`${process.env.REACT_APP_SERVICE_URL}/${accessToken}/`);
      ws.onopen = function() {
         const param = {"transmit":"single", "url":"user"}
         // Web Socket is connected, send data using send()
         ws.send(JSON.stringify(param));
      };
      ws.onmessage = function (evt) {
         ws.close();
      };
   })
};

export default getUserProfileAPI;
