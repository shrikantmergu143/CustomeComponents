export const ActionTypes = {
    SET_CURRENT_USER_LOGIN: "SET_CURRENT_USER_LOGIN",
    SET_SHOW_TOAST:"SET_SHOW_TOAST",
    SET_STORE_USERS_LIST:"SET_STORE_USERS_LIST",
    SET_STORE_MODE_LIST:"SET_STORE_MODE_LIST",
    SET_STORE_MODE_ALL_LIST:"SET_STORE_MODE_ALL_LIST",
    SET_STORE_QUESTION_LIST:"SET_STORE_QUESTION_LIST",
    SET_HIDE_TOAST:"SET_HIDE_TOAST",
    SET_SHOW_CONFIRM_MODAL:"SET_SHOW_CONFIRM_MODAL",
    SET_SHOW_MENU:"SET_SHOW_MENU",
}

export const SetCurrentUserLogin = (payload) => {
    return {
        type: ActionTypes.SET_CURRENT_USER_LOGIN,
        payload: payload,
    }
}
export const SetStoreUserLists = (payload) => {
    return {
        type: ActionTypes.SET_STORE_USERS_LIST,
        payload: payload,
    }
}
export const SetStoreModeLists = (payload) => {
    return {
        type: ActionTypes.SET_STORE_MODE_LIST,
        payload: payload,
    }
}
export const SetStoreQuestionLists = (payload) => {
    return {
        type: ActionTypes.SET_STORE_QUESTION_LIST,
        payload: payload,
    }
}
export const ShowToast = (payload) => {
    return {
        type: ActionTypes.SET_SHOW_TOAST,
        payload: payload,
    }
}
export const HideToast = () => {
    return {
        type: ActionTypes.SET_HIDE_TOAST,
    }
}
export const ShowModalConfirm = (payload) => {
    return {
        type: ActionTypes.SET_SHOW_CONFIRM_MODAL,
        payload:payload,
    }
}
export const SetStoreModeListAll = (payload) =>{
    return{
        type: ActionTypes.SET_STORE_MODE_ALL_LIST,
        payload:payload
    }
}
export const SetChangeMenu = (payload) =>{
    return{
        type: ActionTypes.SET_SHOW_MENU,
        payload:payload
    }
}