import { setMyProfile, userIdGet } from '../../redux/actions';

const GetProfile = (accessToken) => {
    return((dispatch)=>{
      // Let us open a web socket
      const ws = new WebSocket(`${process.env.REACT_APP_SERVICE_URL}/${accessToken}/`);
      ws.onopen = function() {
        const param = {
            "transmit":"single", 
            "url":"user"
        }
        // Web Socket is connected, send data using send()
        ws.send(JSON.stringify(param));
      };
      ws.onmessage = function (evt) {
        const received_msg = JSON.parse(evt.data);
         dispatch(userIdGet(received_msg.user_id));
         dispatch(setMyProfile({
          ...received_msg?.response,
          user_id:received_msg?.user_id
         }));
         ws.close();
      };
    })
};

export default GetProfile;
