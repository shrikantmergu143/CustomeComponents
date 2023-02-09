/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-bind */
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCallBackFileSelect, SetShowMediaLibrary, setStoreFileLibraryList, ShowToast } from '../../../redux/actions';
import ReactMediaLibrary from './ReactMediaLibrary';
import { PostRequestAPI } from "./../../../Api/PostRequest"
import { FILES_DELETE, FILE_UPLOAD } from "./../../../Api/constant"
import { CallGetFilesList } from '../../../redux/actions/utils';
// import BootstrapModal from '@/Components/BootstrapModal';
function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}
export const FileExtention = [
    'pdf' //, "png", "svg"
];

export function getExtension(path) {
    var basename = path?.split(/[\\/]/)?.pop(),
        pos = basename?.lastIndexOf(".");      
    if (basename === "" || pos < 1)            
        return "";                             
    return basename.slice(pos + 1);            
}
export function checkExtension(path){
    return (
        // getExtension(path) === "svg"  ||
        // getExtension(path) === "png"  ||
        getExtension(path) === "pdf"  
    )
}
const ReactMediaLibraryWrapper = ({select_limit}) => {
    const select_id="react-media-library-tabs-tabpane-library"
    // const [display, setDisplay] = useState(false);
    const MediaModal =  useSelector((state)=>state?.allReducers?.MediaModal);
    const record_limit =  useSelector((state)=>state?.allReducers?.record_limit);
    const access_token =  useSelector((state)=>state?.allReducers?.access_token);
    const FileLibraryList =  useSelector((state)=>state?.allReducers?.MediaFile?.data);
    const MediaFile =  useSelector((state)=>state?.allReducers?.MediaFile);
    const [TabSelect, setTabSelect] = useState('library');
    const dispatch = useDispatch()

    // if(!medias){
    //     medias = [];
    // }
    const [isBMLShow, setIsBMLShow] = useState(false);
    // const [fileLibraryList] = useState(medias);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        dispatch(SetShowMediaLibrary(false));
    },[]);

    useEffect(()=>{
        if(MediaModal){
            callMediaFiles(1);
        }
    },[MediaModal, TabSelect, record_limit]);
    const callMediaFiles =async (item) =>{
        dispatch(await CallGetFilesList("all", item))
    }
    async function uploadCallback(fileBase64, fileMeta) {
        // var upload_flag = false;
        // var store_url = APP_URL+"/media/store";
        
        // formData.append("file_name", fileMeta.file_name);
        // formData.append("size", fileMeta.size);
        // await axios.post(store_url, formData, {
        //     headers: {
        //     'Content-Type': 'multipart/form-data',
        //     'Accept': 'application/json'
        //     }
        // }).then(function (result1) {
        //     var result = result1.data;
        //     if (result.status) {
        //         setIsLoading(true)
        //         medias.push(result.data)
        //         // let sort_medias = medias.sort((a, b) => { return b.id - a.id;})
        //         // fileLibraryList.push(result.data)
        //         setFileLibraryList(medias)
        //         setIsLoading(false)
        //         upload_flag = true;
        //     } else {
        //         alert(result.message);
        //     }
        // })
        // .catch(function (result1) {
        //     var result = result1.data;
        //     if (result.status) {
        //         setIsLoading(true)
        //         medias.push(result.data)
        //         // let sort_medias = medias.sort((a, b) => { return b.id - a.id;})
        //         // fileLibraryList.push(result.data)
        //         setFileLibraryList(medias)
        //         setIsLoading(false)
        //         upload_flag = true;
        //     } else {
        //         alert(result.message);
        //     }
        // });
        // return upload_flag;
        // const files =URL.createObjectURL(fileBase64);
        // console.log("files", files)
        
        if(checkExtension(fileMeta.file_name)){
            var formData = new FormData();
            formData.append("file", fileBase64);
            formData.append("type", fileMeta.type);
            formData.append("file_name", fileMeta.file_name);
            formData.append("size", fileMeta.size);
            setIsLoading(true)
            const response = await PostRequestAPI(FILE_UPLOAD, formData, access_token, true);
            if(response?.status === 200){
                setIsLoading(false)
                return true;
            }else{
                setIsLoading(false)
                return false;
            }
            // const data = {
            //     id:fileMeta.file_name+getDateTime(),
            //     file_name:fileMeta.file_name,
            //     file_url:URL.createObjectURL(fileBase64),
            //     title:fileMeta.file_name,
            //     description:fileMeta.file_name,
            //     size:fileMeta.size,
            //     created_at:getDateTime()
            // }
            // dispatch(setFileLibraryList(data));
        }else{
            return false;
        }
    }

    function selectCallback(item) {
        dispatch(setCallBackFileSelect({data:item}))
        dispatch(SetShowMediaLibrary(false))
    }

    async function deleteCallback(item) {
        const Data = FileLibraryList?.filter((list)=>{
            const res = item?.filter((item)=>item.id === list?.id);
            if(res?.length === 0){
                return list;
            }
        });
       const res = await item?.map( async (item) =>{
            const payload = {
                file_id:item?.id
            }
            const response = await PostRequestAPI(FILES_DELETE, payload, access_token);
            if(response?.status === 200){
                return true;
            }else{
                dispatch(ShowToast({
                    show:true,
                    description:"File available in design.",
                    type:"error"
                }))
                return false;
            }
        })
        if(Data?.length === 0){
            if(MediaFile?.pagination?.current_page >1){
                callMediaFiles(MediaFile?.pagination?.current_page-1);
            }else{
                callMediaFiles(1);
            }
        }else{
            callMediaFiles(MediaFile?.pagination?.current_page);
        }
    }

    return (
        <div>
            <ReactMediaLibrary
                uploadTitle="Upload"
                libraryTitle="Media Library"
                loadingMessage="loading media..."
                emptyMessage="Media library is empty"
                isLoading={isLoading}
                deleteButtonLabel="Delete"
                selectButtonLabel="Select"
                show={MediaModal}
                onHide={() => dispatch(SetShowMediaLibrary(false))}
                fileUploadCallback={uploadCallback}
                callMediaFiles={callMediaFiles}
                fileLibraryList={FileLibraryList}
                MediaFile={MediaFile}
                fileSelectCallback={selectCallback}
                fileDeleteCallback={deleteCallback}
                TabSelect={TabSelect}
                setTabSelect={setTabSelect}
            />
        </div>
    );
};

export default ReactMediaLibraryWrapper;
