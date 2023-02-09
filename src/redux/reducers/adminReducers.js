/* eslint-disable */
import { ActionTypes } from "../../redux/actions";

const initailData = {
    user_id: "",
    usertype:undefined,
    isadmin:undefined,
    ShowMenu:true,
    currentUser:{},
    access_token:"",
    equipment:{
        data:[],
        pagination:{
            current_page:1,
            record_limit:10,
            total_records:0
        }
    },
    MediaModal:false,
    callBackMediaFile:{},
    FileLibraryList:[],
    loginData:{
        email:"",
        password:""
    },
    ToastMessage:{
        title:"",
        description:"",
        show:false,
        type:"success"
    },
    ModalPopup:{
        Title:"",
        show:false,
        Description:"",
        id:"",
        callBackModal:()=>null,
        ButtonSuccess:""
    },
    points:[],
    userslist:{
        data:[],
        pagination:{
            current_page:1,
            record_limit:10,
            total_records:0
        }
    },
    designlist:{
        data:[],
        pagination:{
            current_page:1,
            record_limit:10,
            total_records:0
        }
    },
    record_limit:10,
    design:{},
    viewerDesign:{
        data:[],
        pagination:{
            current_page:1,
            record_limit:10,
            total_records:0
        }
    },
    selectDesign:undefined,
    selectPointer:undefined,
    FilePreview:{
        show:false,
        isFile:true,
        file_path:"",    
    }
}

export const adminReducers = (state = initailData, action) => {
    switch(action.type) {
        case ActionTypes.SET_REMEMBER_ME_CHANGE:
            return{
                ...state,
                loginData:action?.payload,
            }
        case ActionTypes?.SET_CURRENT_USER_LOGIN:
            return{
                ...state,
                access_token:action?.payload?.access_token,
                loginData:action?.payload?.loginData,
                currentUser:action?.payload?.currentUser,
                usertype:action?.payload?.usertype,
                isadmin:action?.payload?.isadmin,
            }
        case ActionTypes.SET_SHOW_MENU:
            return{
                ...state,
                ShowMenu:action?.payload,
            }
        case ActionTypes.SET_SHOW_TOAST:
            return{
                ...state,
                ToastMessage:{
                    ...action?.payload,
                    title:action?.payload?.title,
                    description:action?.payload?.description,
                    show:true,
                    type:action?.payload?.type,
                }
            }
        case ActionTypes?.SET_HIDE_TOAST:
            return{
                ...state,
                ToastMessage:{
                    ...initailData?.ToastMessage
                }
            }
        case  ActionTypes.SET_SHOW_CONFIRM_MODAL:
            return{
                ...state,
                ModalPopup:action?.payload,
            }
        case ActionTypes.SET_POINTS:
            return {
                    ...state,
                points:action?.payload
            }
        case  ActionTypes.SET_ADD_NEW_EQUIPMENTS_STATE:
            const oldList = state?.equipment;
            oldList?.data.push(action?.payload)
            return{
                ...state,
                equipment:oldList,
            }
        case  ActionTypes.SET_UPDATE_EQUIPMENTS_STATE:
            const old = state?.equipment?.data?.map((item)=>{
                if(item.id === action?.payload?.id){
                    return action?.payload
                }else{
                    return item;
                }
            });
            return{
                ...state,
                equipment:{
                    ...state?.equipment,
                    data:old
                },
            }
        case ActionTypes.SET_DELETE_EQUIPMENTS_STATE:
            return{
                ...state,
                equipment:{
                    ...state?.equipment,
                    data:state?.equipment?.data?.filter((item)=>action?.payload !== item.id)
                }
            }
        case ActionTypes.SET_CALLBACK_SELECT_FILE:
            return{
                ...state,
                callBackMediaFile:action?.payload
            }
        case ActionTypes.SET_DESIGN_LIST:
         return{
                ...state,
                designlist:{
                    data:action?.payload?.data,
                    pagination:{
                        current_page:parseInt(action?.payload?.pagination?.current_page),
                        record_limit:parseInt(action?.payload?.pagination?.record_limit),
                        total_records:parseInt(action?.payload?.pagination?.total_records),
                    },
                }
         }
        case ActionTypes.SET_CALL_USER_LOGOUT:
            return{
                ...initailData
            }
        case ActionTypes.SET_STORE_USERS_LIST:
            return{
                ...state,
                userslist:{
                    data:action?.payload?.data,
                    pagination:{
                        current_page:parseInt(action?.payload?.pagination?.current_page),
                        record_limit:parseInt(action?.payload?.pagination?.record_limit),
                        total_records:parseInt(action?.payload?.pagination?.total_records),
                    },
                }
            }
        case ActionTypes.SET_STORE_EQUIPMENT_LIST:
            const Data = action?.payload?.data?.map((item)=>({...item, equipment_meta:JSON.parse(item?.equipment_meta)}));
            return{
                ...state,
                equipment:{
                    data:Data,
                    pagination:{
                        current_page:parseInt(action?.payload?.pagination?.current_page),
                        record_limit:parseInt(action?.payload?.pagination?.record_limit),
                        total_records:parseInt(action?.payload?.pagination?.total_records),
                    },
                }
            }
        case ActionTypes.SET_STORE_FILE_LIST:
            return{
                ...state,
                MediaFile:{
                    data:action?.payload?.data,
                    pagination:{
                        current_page:parseInt(action?.payload?.pagination?.current_page),
                        record_limit:parseInt(action?.payload?.pagination?.record_limit),
                        total_records:parseInt(action?.payload?.pagination?.total_records),
                    },
                }
            }
        case ActionTypes.SET_STORE_MEDIA_FILE:
            return{
                ...state,
                MediaFile:{
                    ...state?.MediaFile,
                    data:action?.payload
                }
            }
        case ActionTypes.SET_SHOW_MEDIA_LIBRARY:
            return{
                ...state,
                MediaModal:action?.payload,
                FileLibraryList:[],
            }
        case ActionTypes.SET_DELETE_STORE_MEDIA_FILE_LIST:
            return{
                ...state,
                MediaFile:{
                    ...state?.MediaFile,
                    data:state?.MediaFile?.data?.filter((item)=>item.id!==action?.payload?.id),
                },
            }
        case ActionTypes.SET_UPDATE_GET_PROFILE_DATA:
            return{
                ...state,
                currentUser:{
                    ...action?.payload,
                    access_token:state?.access_token,
                }
            }
        case ActionTypes.SET_ADD_DESIGN:
            return{
                    ...state,
                    design:action?.payload
            }
        case ActionTypes.SET_STORE_RECORD_LIMIT:
            return{
                ...state,
                record_limit:action?.payload
            }
        case ActionTypes.SET_STORE_VIEWER_DESIGN:
            return{
                ...state,
                viewerDesign:{
                    data:action?.payload?.data,
                    pagination:{
                        current_page:parseInt(action?.payload?.pagination?.current_page),
                        record_limit:parseInt(action?.payload?.pagination?.record_limit),
                        total_records:parseInt(action?.payload?.pagination?.total_records),
                    },
                }
            }
        case ActionTypes.SET_STORE_SELECT_VIEWER_DESIGN:
            return{
                ...state,
                selectDesign:{
                    ...action?.payload,
                    design_description:JSON.parse(action?.payload?.design_description)
                }
            }
        case ActionTypes.SET_STORE_SELECT_POINTER:
            return{
                ...state,
                selectPointer:{
                    ...action?.payload,
                    selected_equipment:[],
                    selected_media:[]
                }
            }
        case ActionTypes.SET_DELETE_SELECT_POINTER:
            return{
                ...state,
                selectPointer:action?.payload
            }
        case ActionTypes.SET_UPDATE_EQUIPMENT_POINTER_LIST:
            const result = state?.selectPointer?.selected_equipment?.filter(item=>action?.payload?.id !== item);
            result?.push(action?.payload)
            return{
                ...state,
                selectPointer:{
                    ...state?.selectPointer,
                    selected_equipment:result,
                }
            }
        case ActionTypes.SET_UPDATE_MEDIA_POINTER_LIST:
            const results = state?.selectPointer?.selected_media?.filter(item=>action?.payload?.id !== item);
            results?.push(action?.payload)
            return{
                ...state,
                selectPointer:{
                    ...state?.selectPointer,
                    selected_media:results,
                }
            }
        case ActionTypes.SET_FILE_PREVIEW_MODAL:
            return{
                ...state,
                FilePreview:action?.payload,
            }
        default:
            return state;
    }
}