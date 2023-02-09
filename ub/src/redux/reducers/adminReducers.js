/* eslint-disable */
import { ActionTypes } from "../../redux/actions";

const initailData = {
    user_id: "",
    ShowMenu:true,
    currentUser:{},
    access_token:"",
    ToastMessage:{
        title:"",
        description:"",
        show:false,
        type:"success"
    },
    userslist:{
        data:[],
        pagination:{
            current_page:1,
            record_limit:10,
            total_records:0
        }
    },
    modelist:{
        data:[],
        pagination:{
            current_page:1,
            record_limit:10,
            total_records:0
        }
    },
    questionlist:{
        data:[],
        pagination:{
            current_page:1,
            record_limit:10,
            total_records:0
        }
    },
    ModalPopup:{
        Title:"",
        show:false,
        Description:"",
        id:"",
        callBackModal:()=>null,
        ButtonSuccess:""
    },
    AllModeList:[]
}

export const adminReducers = (state = initailData, action) => {
    switch(action.type) {
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
        case ActionTypes.SET_CURRENT_USER_LOGIN:
            return{
                ...state,
                currentUser:action?.payload,
                access_token:action?.payload?.access_token
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
        case ActionTypes.SET_STORE_QUESTION_LIST:
            return{
                ...state,
                questionlist:{
                    data:action?.payload?.data,
                    pagination:{
                        current_page:parseInt(action?.payload?.pagination?.current_page),
                        record_limit:parseInt(action?.payload?.pagination?.record_limit),
                        total_records:parseInt(action?.payload?.pagination?.total_records),
                    },
                }
            }
        case ActionTypes.SET_STORE_MODE_LIST:
            return{
                ...state,
                modelist:{
                    data:action?.payload?.data,
                    pagination:{
                        current_page:parseInt(action?.payload?.pagination?.current_page),
                        record_limit:parseInt(action?.payload?.pagination?.record_limit),
                        total_records:parseInt(action?.payload?.pagination?.total_records),
                    },
                }
            }
        case ActionTypes.SET_STORE_MODE_ALL_LIST:
            return{
                ...state,
                AllModeList:action?.payload
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
        case  ActionTypes.SET_SHOW_MENU:
            return{
                ...state,
                ShowMenu:action?.payload,
            }
        default:
            return state;
    }
}