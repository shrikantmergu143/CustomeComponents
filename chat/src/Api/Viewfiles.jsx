/* eslint-disable eqeqeq */
const GetViewFilesAPI = async (url, qr_token) => {
    const options = {
      headers: {
        'Authorization': `Bearer ${qr_token}`
      }
    };
    const responce = await fetch(url, options)
    .then( res => res.blob() )
    .then( blob => {
      let file = window.URL.createObjectURL(blob);
      return file;
    }).catch((error)=>{return error;});
    return responce;
};
export const BlobGetViewFilesAPI = async (url, qr_token) => {
  const options = {
    headers: {
      'Authorization': `Bearer ${qr_token}`
    }
  };
  const responce = await fetch(url, options)
  .then( res => res.blob() )
  .then( blob => {
    let file = blob
    return file;
  }).catch((error)=>{return error;});
  return responce;
};

export default GetViewFilesAPI;

const saveOrOpenBlob =(blob, name)=>{
		let fileName = name
		let tempEl = document.createElement("a");
    document.body.appendChild(tempEl);
    tempEl.style = "display: none";
    const url = window.URL.createObjectURL(blob);
    window.open(url)
    tempEl.href = url;
    tempEl.download = fileName;
    tempEl.click();
		window.URL.revokeObjectURL(url);
}