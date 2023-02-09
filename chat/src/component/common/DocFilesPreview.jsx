/* eslint-disable */
import React from "react";
import Tooltip from "./tooltip";
import Cancel from "../../assets/img/previewmodal/cancel_black_icon.png";
import { Image } from "react-bootstrap";
import FileAuthPreview from "../ChatPanels/FileAuthPreview";

const DocFilesPreview = (props) => {
    const { selectDocsFile, setSelectDocsFile, setDocFilePopupOpen } = props;

    const ClosePreviewDocfile = () => {
        setDocFilePopupOpen(false);
        setSelectDocsFile({...selectDocsFile, filename: "",name: "", id: "", url: "",});
    }

    return(
        <div className="docfilesPreviewWrapper">
            <Tooltip content="Close" direction="bottom">
                <Image src={Cancel} onClick={() => ClosePreviewDocfile()} alt="Cancel" />
            </Tooltip>
            <FileAuthPreview
                message={selectDocsFile}
                url={selectDocsFile?.file?.view_file_url} //https://view.officeapps.live.com/op/embed.aspx?src=
                alt={selectDocsFile?.name}
                Type="Docs"
            />
        </div>
    )
}

export default DocFilesPreview;
