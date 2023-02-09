import React from "react";
import { useState } from "react";
import Recorder from 'react-mp3-recorder';

const RecordingButton = () => {
    const [ RecordingHere, setRecordingHere ] = useState(null);

    const start = () => {
        var elements = document.querySelector('.styles_button__3Vugn');
        
    }
    const _onRecordingComplete = (blob) => {
        console.log('recording', blob)
        const Bloburl = URL.createObjectURL(blob);
        setRecordingHere(Bloburl);
      }
     
    const _onRecordingError = (err) => {
        console.log('recording error', err)
    }

    return(<React.Fragment>
            <Recorder
        onRecordingComplete={_onRecordingComplete}
        onRecordingError={_onRecordingError}
      />        
      <button onClick={() => start()}>Click me</button>
      <audio src={RecordingHere} controls />
    </React.Fragment>)
}

export default RecordingButton;