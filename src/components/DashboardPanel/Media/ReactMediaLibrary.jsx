import * as React from "react";
import Modal from "react-bootstrap/Modal";
import ReactMediaLibraryTabs from "./ReactMediaLibraryTabs";
const ReactMediaLibrary = (props) => {
   return (
        <Modal size="xl" show={props.show} onHide={props?.onHide} id={"react-media-library-modal"} aria-labelledby="react-media-library-modal">
            <Modal.Header closeButton>
                <Modal.Title className="title">{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReactMediaLibraryTabs
                    deleteButtonLabel={props.deleteButtonLabel}
                    selectButtonLabel={props.selectButtonLabel}
                    isLoading={props.isLoading}
                    uploadTitle={props.uploadTitle}
                    libraryTitle={props.libraryTitle}
                    loadingMessage={props.loadingMessage}
                    emptyMessage={props.emptyMessage}
                    fileLibraryList={props.fileLibraryList}
                    MediaFile={props?.MediaFile}
                    fileUploadCallback={props.fileUploadCallback}
                    callMediaFiles={props?.callMediaFiles}
                    fileSelectCallback={props.fileSelectCallback}
                    fileDeleteCallback={props.fileDeleteCallback}
                    libraryCardComponent={props.libraryCardComponent}
                    TabSelect={props?.TabSelect}
                    setTabSelect={props?.setTabSelect}
                />
            </Modal.Body>
        </Modal>
    )
};
ReactMediaLibrary.defaultProps = {
    modalTitle: "Media Library",
    libraryTitle: "Library",
    uploadTitle: "Upload",
    emptyMessage: "The library is empty",
    loadingMessage: "Loading media...",
    deleteButtonLabel: 'Delete',
    selectButtonLabel: 'Select File',
    isLoading: true,
};
export default ReactMediaLibrary;
