import { contactList } from '../../redux/actions';

const GetContactListWSS = (accessToken) => {
    return((dispatch)=>{
      // Let us open a web socket
      const ws = new WebSocket(`${process.env.REACT_APP_SERVICE_URL}/${accessToken}/`);
      ws.onopen = function() {
         const param = {"transmit":"single", "url":"get_contacts"}
         // Web Socket is connected, send data using send()
         ws.send(JSON.stringify(param));
      };
      ws.onmessage = function (evt) {
         const received_msg = JSON.parse(evt.data);
         dispatch(contactList(received_msg?.response));
         ws.close();
      };
    })
};

export default GetContactListWSS;
