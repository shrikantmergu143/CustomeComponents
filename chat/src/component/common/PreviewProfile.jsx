/* eslint-disable */
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import Tooltip from './tooltip';

const PreviewPopup = (props) => {
    const { CurrentVideoImage, setPreviewImageVideo } = props;
    const [ currentSelectedFile, setCurrentSelectedFile ] = useState({
        id: CurrentVideoImage.id,
        base64: CurrentVideoImage.url,
        name: CurrentVideoImage.name
    });

    return (
        <div className="ImageViewPreviewModal Files_preview Profile_view" onClick={(e) =>{
            e.stopPropagation();
            e.preventDefault()
        }} >
            <div className='modal_body'>
                {/* preview files control bar here */}
                <div className='controlbars'>
                    <div></div>
                    <Tooltip content="Close" direction="bottom">
                        <button onClick={(e) =>{
                            e.stopPropagation();
                            e.preventDefault()
                            setPreviewImageVideo(false)
                        }} className='btn cancel'></button>
                        
                    </Tooltip>
                </div>

                {/* preview files tab conent start here */}
                <div className="imageViewMain">
                    <Image src={currentSelectedFile?.base64} alt={currentSelectedFile?.name} />
                </div>
            </div>
        </div>
    )
}

export default PreviewPopup;