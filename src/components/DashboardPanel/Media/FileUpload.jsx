import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileUploadList from "./FileUploadList";
import { checkExtension } from './ReactMediaLibraryWrapper';

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// function readFile(file: File): Promise<File> {
// 	const fileReader = new FileReader();
// 	// return new Promise((resolve, reject) => {
// 	fileReader.onerror = () => {
// 		fileReader.abort();
// 		reject(new DOMException("Problem parsing input file."));
// 	};
// 	fileReader.readAsArrayBuffer(file);
// 	fileReader.onload = () => {
// const arrayBuffer = fileReader.result as ArrayBuffer
// let bytes = new Uint8Array(arrayBuffer);
//           	resolve(file);
// 		// };
// 	});
// }
const FileUpload = (props) => {
    const [fileUploadList, setFileUploadList] = useState([]);
    // old onDrop
    function onDrop(acceptedFiles) {
        const list = acceptedFiles?.filter((item)=>checkExtension(item.name));
        if(list?.length>0){
            let newFileUploadList = list?.filter((item)=>checkExtension(item.name)).map((element) => {
                return { file_name: element.name, status: 0 };
            }).concat(fileUploadList);
            setFileUploadList(newFileUploadList);
            // Loop through dropped files
            list.forEach((file, index) => {
                (() => __awaiter(this, void 0, void 0, function* () {
                    // const fileBuffer = await readFile(file);
                        const fileMeta = { file_name: file.name, type: file.type, size: file.size };
                        const result = yield props.fileUploadCallback(file, fileMeta);
                        newFileUploadList = [...newFileUploadList];
                        newFileUploadList[index].status = (result) ? 1 : -1;
                        setFileUploadList(newFileUploadList);
                }))();
            });
            props?.callMediaFiles(1)
        }
    }
    // function onDrop(acceptedFiles) {
    //     const list = acceptedFiles?.filter((item)=>checkExtension(item.name));
    //     if(list?.length>0){
    //         let newFileUploadList = list?.filter((item)=>checkExtension(item.name)).map((element) => {
    //             return { file_name: element.name, status: 0 };
    //         }).concat(fileUploadList);
    //         setFileUploadList(newFileUploadList);
    //         // Loop through dropped files
    //         list.forEach(async (file, index) => {
    //                 // const fileBuffer = await readFile(file);
    //             const fileMeta = { file_name: file.name, type: file.type, size: file.size };
    //             const result = await props.fileUploadCallback(file, fileMeta);
    //             newFileUploadList = [...newFileUploadList];
    //             newFileUploadList[index].status = (result) ? 1 : -1;
    //             setFileUploadList(newFileUploadList);
    //         });
    //     }
    // }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <React.Fragment>
            {<div className={`p-5 text-center alert alert-${isDragActive ? "success" : "secondary"}`} {...getRootProps()}>
                <input {... getInputProps()}/>
                {isDragActive ?
                    <p className={"m-0"}>Drop the files here ...</p>:
                    <p className={"m-0"}>Drag 'n' drop some files here, or click to select files</p>}
                
            </div>}
            <FileUploadList fileUploadList={fileUploadList}/>
        </React.Fragment>
    );
};
export default FileUpload;
