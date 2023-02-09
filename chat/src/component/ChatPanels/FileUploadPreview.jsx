/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import PlayButton from "../../assets/img/videoplaybtn.svg";
import { AudioPlayerControlSprite, Audio } from 'react-audio-player-pro';
import moment from "moment";
import { baseURL } from "../../constant/url";
import DocFilesPreview from "../common/DocFilesPreview";
import { checkExtension, getFileName } from "./SearchChat/MessagesPanel";

const FileUploadPreview = (props) => {
    const { files, isMessageEmpty, accessToken, filesDate } = props;
    const [ FilesArray, setFilesArray ] = useState({});
    const [ DocFilePopupOpen, setDocFilePopupOpen ] = useState(false);
    const [ selectDocsFile, setSelectDocsFile ] = useState({
        name: "",
        id: "",
        url: "",
    })
   
    // download file function
    const DownloadFile = (files) => {
        const Url = files?.url;

        fetch(Url)
            .then((response) => response.blob())
            .then((blob) => {
                const blobUrl = URL.createObjectURL(blob);
                const tempAnchor = document.createElement("a");
                tempAnchor.download = files?.name;
                tempAnchor.href = blobUrl;
                document.body.appendChild(tempAnchor);
                tempAnchor.click();
                tempAnchor.remove();
        });
    }

    // get files function
    const GetFileConvertFnt = () => {
        window.axios.get(`${process.env.REACT_APP_BASE_URL}/upload/url/${files}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization':`Bearer ${accessToken}`
        }}).then(function (result) {
            setFilesArray(result.data);
        });
    }

    useEffect(() => {
        GetFileConvertFnt();
    }, []);

    // get file size function
    const formatFileSize = (bytes,decimalPoint) => {
        if(bytes == 0) return '0 Bytes';
        var k = 1000,
            dm = decimalPoint || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // docs file preview function
    const DocsFilePreviewFnt = (files) => {
        setDocFilePopupOpen(true);
        setSelectDocsFile({...selectDocsFile, file:files, name: files.name, id: files.id, url: files.url,});
    }

    return(
        <div className={isMessageEmpty !== "" ? "imageUplodedGroupsWrap styleadded" : "imageUplodedGroupsWrap"}>
            {/* image group gallery */}
            {(FilesArray?.name?.split('.').pop() === "jpg" || FilesArray?.name?.split('.').pop() === "jpeg" || FilesArray?.name?.split('.').pop() === "png" || FilesArray?.name?.split('.').pop() === "webp") && (
                <div className="imageMainGroup">
                    <div className="imageUplodedGroups" >
                        <Image src={FilesArray?.url} alt={FilesArray?.name} />
                    </div>
                </div>
            )}

            {/* video group gallery */}
            {(FilesArray?.name?.split('.').pop() === "mp4" || FilesArray?.name?.split('.').pop() === "mov" || FilesArray?.name?.split('.').pop() === "3gp") && (
                <div className="VideoUploadGroups">
                    <Image src={PlayButton} className="videoPLybtn" alt="play button" />
                    <Image src={FilesArray?.thumbnail} className="videoposterimage" alt="video poster image" />
                </div>
            )}

            {/* all files groups */}
            {( checkExtension(FilesArray?.name) ) && (<div 
                className="filesUplodedUIwrappser"
              >
                <div 
                    className="filedetailswrapps"
                    onClick={() => { 
                        (FilesArray?.name?.split('.').pop() === "pdf") && DocsFilePreviewFnt(FilesArray);                    
                    }}
                >
                    <div className={ getFileName(FilesArray?.name, "fileUplodedImageMode")}></div>
                    <div className="filedetails">
                        <h4>{FilesArray?.name}</h4>
                        <span>
                            {formatFileSize(FilesArray?.size)} &nbsp;
                            <small>
                            {filesDate!=="None" &&moment.utc(new Date(filesDate)).format('hh:mm a')}
                            </small>
                        </span>
                    </div>
                </div>
                <button onClick={() => DownloadFile(FilesArray, accessToken)}>Download</button>
            </div>)}

            {(FilesArray?.name?.split('.').pop() === "mp3" || FilesArray?.name?.split('.').pop() === "m4a" || FilesArray?.name?.split('.').pop() === "aac" || FilesArray?.name?.split('.').pop() === "ogg" || FilesArray?.name?.split('.').pop() === "wav" || FilesArray?.name?.split('.').pop() === "mpeg") && (<div className="audioUploadGroups" >
                <AudioPlayerControlSprite/>
                <Audio
                    src={FilesArray?.url}
                    preload="auto"
                    duration={100}
                    className="audioUpload"
                    downloadFileName={FilesArray?.name}
                    useRepeatButton={false}
                />
                <div className="file_sizeset">{formatFileSize(FilesArray?.size)}</div>
            </div>)}

            {DocFilePopupOpen === true && (<DocFilesPreview selectDocsFile={selectDocsFile} setSelectDocsFile={setSelectDocsFile} setDocFilePopupOpen={setDocFilePopupOpen} />)}
        </div>
    )
}

export default FileUploadPreview;