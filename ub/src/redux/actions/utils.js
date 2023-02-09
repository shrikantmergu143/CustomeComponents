import { SetCurrentUserLogin, SetStoreQuestionLists, SetStoreUserLists } from ".";
import { GetQuesionListAPI, GetUsersListAPI } from "../../api/GetRequest";

export const CallGetUsersList = async (listType, current_page) =>
    (async (dispatch, getState)=>{
        const { access_token, userslist } = getState()?.allReducers;
        const response = await GetUsersListAPI(listType, access_token, userslist?.pagination?.record_limit, current_page);
        if(response?.status === 200){
            dispatch(SetStoreUserLists(response?.data))
        }else{
            dispatch(SetStoreUserLists({
                data:[],
                pagination:{
                    current_page:1,
                    record_limit:10,
                    total_records:0
                }
            }));
            if(response?.response?.status === 403){
                dispatch(SetCurrentUserLogin({access_token:""}))
            }
        }
    })

// Common Question list
export const CallQuestionList = async (listType, filter, current_page) => 
    (async (dispatch, getState)=>{
        const { access_token, questionlist } = getState()?.allReducers;

    const response = await GetQuesionListAPI({
        type:listType,
        filter:filter,
        access_token:access_token,
        page_limit:10,
        page_number:current_page
    });
    if(response?.status === 200){
        dispatch(SetStoreQuestionLists(response?.data))
    }
    else{
        dispatch(SetStoreQuestionLists({
            data:[],
            pagination:{
                current_page:1,
                record_limit:10,
                total_records:0
            }
        }))
        if(response?.response?.status === 403){
            dispatch(SetCurrentUserLogin({access_token:""}))
        }
    }
})