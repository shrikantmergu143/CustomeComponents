import { setStoreUserLists, setCallLogout, setStoreEquipmentLists, setStoreFileLists,setDesignlist } from "./index";
import { getRequestcall } from "../../Api/GetRequest";
import { USERS_LIST, EQUIPMENT_LIST, FILES_LIST,DESIGN_LIST } from "./../../Api/constant";

export const CallGetUsersList = async (type, current_page) =>
(async (dispatch, getState)=>{
    const { access_token, record_limit } = getState()?.allReducers;
    const url =  USERS_LIST +`/${type}/${record_limit|| 10}/${current_page}`
    const response = await getRequestcall(url, access_token);
    if(response?.status === 200){
        dispatch(setStoreUserLists(response?.data))
    }else{
        dispatch(setStoreUserLists({
            data:[],
            pagination:{
                current_page:1,
                record_limit:record_limit,
                total_records:0
            }
        }));
        if(response?.status === 403){
            dispatch(setCallLogout())
        }
    }
})

export const CallGetDesignList = async (type, current_page) =>
(async (dispatch, getState) => {
    const { access_token,record_limit} = getState()?.allReducers;
    const url =  DESIGN_LIST +`/${type}/${record_limit|| 10}/${current_page}`
    const response = await getRequestcall(url, access_token);
    if(response?.status === 200){
        dispatch(setDesignlist(response?.data))
    }
    else{
        dispatch(setDesignlist({
            data:[],
            pagination:{
                current_page:1,
                record_limit:record_limit,
                total_records:0
            }
        }));
        if(response?.status === 403){
            dispatch(setCallLogout())
        }
    }
})

// Get Equipment List
export const CallGetEquipmentList = async (type, current_page) =>
(async (dispatch, getState)=>{
    const { access_token, equipment, record_limit } = getState()?.allReducers;
    const url =  EQUIPMENT_LIST +`/${type}/${record_limit|| 10}/${current_page}`;
    const response = await getRequestcall(url, access_token);
    if(response?.status === 200){
        dispatch(setStoreEquipmentLists(response?.data))
    }else{
        dispatch(setStoreEquipmentLists({
            data:[],
            pagination:{
                current_page:1,
                record_limit:record_limit,
                total_records:0
            }
        }));
        if(response?.status === 403){
            dispatch(setCallLogout())
        }
    }
})

// Get Equipment List
export const CallGetFilesList = async (type, current_page) =>
(async (dispatch, getState)=>{
    const { access_token, MediaFile, record_limit } = getState()?.allReducers;
    const url =  FILES_LIST +`/${type}/${record_limit|| 10}/${current_page}`;
    const response = await getRequestcall(url, access_token);
    if(response?.status === 200){
        dispatch(setStoreFileLists(response?.data))
    }else{
        dispatch(setStoreFileLists({
            data:[],
            pagination:{
                current_page:1,
                record_limit:record_limit,
                total_records:0
            }
        }));
        if(response?.status === 403){
            dispatch(setCallLogout())
        }
    }
})
