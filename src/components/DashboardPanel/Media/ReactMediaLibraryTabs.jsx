/* eslint-disable react/jsx-no-bind */
import * as React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import FileUpload from "./FileUpload";
import FileLibrary from "./FileLibrary";
import FileLibraryEmpty from "./FileLibraryEmpty";
import FileLibraryLoading from "./FileLibraryIsLoading";
const ReactMediaLibraryTabs = (props) => {
    return (
        <Tabs defaultActiveKey={"library"} activeKey={props?.TabSelect} onSelect={(e)=>props?.setTabSelect(e)}  id={"react-media-library-tabs"}>
        {!props.isLoading &&
            <Tab eventKey="library" title={props.libraryTitle}>
                {props.fileLibraryList && props.fileLibraryList.length > 0 &&
                    <FileLibrary 
                        fileLibraryList={props.fileLibraryList}
                        fileSelectCallback={props.fileSelectCallback}
                        fileDeleteCallback={props.fileDeleteCallback}
                        libraryCardComponent={props.libraryCardComponent}
                        MediaFile={props?.MediaFile}
                        callMediaFiles={props?.callMediaFiles}
                        deleteButtonLabel={props.deleteButtonLabel}
                        selectButtonLabel={props.selectButtonLabel} 
                    />}
                    {(props.fileLibraryList && props.fileLibraryList.length === 0) &&
                       <FileLibraryEmpty emptyMessage={props.emptyMessage}/>
                    }
            </Tab>}
            {props.isLoading &&
                <Tab eventKey={"library"} title={props.loadingMessage} >
                    <FileLibraryLoading loadingMessage={props.loadingMessage}/>
                </Tab>
            }
                <Tab eventKey={"upload"} title={props.uploadTitle} >
                    <div>
                        <FileUpload fileUploadCallback={ props.fileUploadCallback } callMediaFiles={props?.callMediaFiles}/>
                    </div>
                </Tab>
        </Tabs>
    );
};
export default ReactMediaLibraryTabs;
