export const ActionTypes = {
    SET_CURRENT_USER_LOGIN: "SET_CURRENT_USER_LOGIN",
    SET_REMEMBER_ME_CHANGE:"SET_REMEMBER_ME_CHANGE",
    SET_SHOW_MENU:"SET_SHOW_MENU",
    SET_SHOW_CONFIRM_MODAL:'SET_SHOW_CONFIRM_MODAL',
    SET_UPDATE_EQUIPMENTS_STATE:'SET_UPDATE_EQUIPMENTS_STATE',
    SET_ADD_NEW_EQUIPMENTS_STATE:"SET_ADD_NEW_EQUIPMENTS_STATE",
    SET_SHOW_TOAST:"SET_SHOW_TOAST",
    SET_HIDE_TOAST:"SET_HIDE_TOAST",
    SET_DELETE_EQUIPMENTS_STATE:"SET_DELETE_EQUIPMENTS_STATE",
    SET_SHOW_MEDIA_LIBRARY:"SET_SHOW_MEDIA_LIBRARY",
    SET_POINTS:"SET_POINTS",
    SET_STORE_MEDIA_FILE_LIST:"SET_STORE_MEDIA_FILE_LIST",
    SET_STORE_MEDIA_FILE:"SET_STORE_MEDIA_FILE",
    SET_DELETE_STORE_MEDIA_FILE_LIST:"SET_DELETE_STORE_MEDIA_FILE_LIST",
    SET_CALLBACK_SELECT_FILE:"SET_CALLBACK_SELECT_FILE",
    SET_DESIGN_LIST:"SET_DESIGN_LIST",
    SET_CALL_USER_LOGOUT:"SET_CALL_USER_LOGOUT",
    SET_STORE_USERS_LIST:"SET_STORE_USERS_LIST",
    SET_ADD_DESIGN:"SET_ADD_DESIGN",
    SET_STORE_EQUIPMENT_LIST:"SET_STORE_EQUIPMENT_LIST",
    SET_STORE_FILE_LIST:"SET_STORE_FILE_LIST",
    SET_UPDATE_GET_PROFILE_DATA:"SET_UPDATE_GET_PROFILE_DATA",
    SET_STORE_RECORD_LIMIT:"SET_STORE_RECORD_LIMIT",
    SET_STORE_VIEWER_DESIGN:"SET_STORE_VIEWER_DESIGN",
    SET_STORE_SELECT_VIEWER_DESIGN:"SET_STORE_SELECT_VIEWER_DESIGN",
    SET_STORE_SELECT_POINTER:"SET_STORE_SELECT_POINTER",
    SET_DELETE_SELECT_POINTER:"SET_DELETE_SELECT_POINTER",
    SET_UPDATE_EQUIPMENT_POINTER_LIST:"SET_UPDATE_EQUIPMENT_POINTER_LIST",
    SET_UPDATE_MEDIA_POINTER_LIST:"SET_UPDATE_MEDIA_POINTER_LIST",
    SET_FILE_PREVIEW_MODAL:"SET_FILE_PREVIEW_MODAL",
}
export const SetShowMenu = (payload) => {
    return {
        type:ActionTypes?.SET_SHOW_MENU,
        payload:payload
    }
}
export const SetStoreCurrentUserLogin = (payload) =>{
    return {
        type:ActionTypes?.SET_CURRENT_USER_LOGIN,
        payload:payload
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
export const ShowPoints = (payload) => {
   
      return {
          type: ActionTypes.SET_POINTS,
          payload:payload
      }
}
export const SetUpdateEquipments = (payload) => {
    return {
        type: ActionTypes.SET_UPDATE_EQUIPMENTS_STATE,
        payload:payload,
    }
}
export const SetAddNewEquipments = (payload) => {
    return {
        type: ActionTypes.SET_ADD_NEW_EQUIPMENTS_STATE,
        payload:payload,
    }
}
export const SetDeleteEquipments = (payload) => {
    return {
        type: ActionTypes.SET_DELETE_EQUIPMENTS_STATE,
        payload:payload,
    }
}
export const SetShowMediaLibrary = (payload) => {
    return {
        type: ActionTypes.SET_SHOW_MEDIA_LIBRARY,
        payload:payload,
    }
}
export const setStoreFileLibraryList = (payload) =>{
    return {
        type: ActionTypes.SET_STORE_MEDIA_FILE,
        payload:payload,
    }
}
export const setDeleteFileLibraryList = (payload) => {
    return {
        type: ActionTypes.SET_DELETE_STORE_MEDIA_FILE_LIST,
        payload:payload,
    }
}
export const setCallBackFileSelect = (payload) => {
    return {
        type: ActionTypes.SET_CALLBACK_SELECT_FILE,
        payload:payload,
    }
}
export const setDesignlist = (payload) => {
    return {
        type: ActionTypes.SET_DESIGN_LIST,
        payload:payload,
    }
}
export const setCallLogout = () => {
    return {
        type: ActionTypes.SET_CALL_USER_LOGOUT,
    }
}
export const setStoreUserLists = (payload) => {
    return {
        type: ActionTypes.SET_STORE_USERS_LIST,
        payload: payload,
    }
}
export const setStoreEquipmentLists = (payload) => {
    return {
        type: ActionTypes.SET_STORE_EQUIPMENT_LIST,
        payload: payload,
    }
}
export const setStoreFileLists = (payload) => {
    return {
        type: ActionTypes.SET_STORE_FILE_LIST,
        payload: payload,
    }
}
export const setUpdateGetProfile = (payload) => {
    return {
        type: ActionTypes.SET_UPDATE_GET_PROFILE_DATA,
        payload: payload,
    }
}
export const setAddDesign = (payload) => {
    return {
        type: ActionTypes.SET_ADD_DESIGN,
        payload: payload,
    }
}
export const setStoreRecoredLimit = (payload) => {
    return {
        type: ActionTypes.SET_STORE_RECORD_LIMIT,
        payload: payload,
    }
}
export const setStoreViewerDesign = (payload) => {
    return {
        type: ActionTypes.SET_STORE_VIEWER_DESIGN,
        payload: payload,
    }
}
export const setStoreSelectViewerDesign = (payload) => {
    return {
        type: ActionTypes.SET_STORE_SELECT_VIEWER_DESIGN,
        payload: payload,
    }
}
export const setStoreSelectPointer = (payload) => {
    return {
        type: ActionTypes.SET_STORE_SELECT_POINTER,
        payload: payload,
    }
}
export const setDeleteSelectPointer = (payload) => {
    return {
        type: ActionTypes.SET_DELETE_SELECT_POINTER,
        payload: payload,
    }
}
export const setUpdateEquipmentSelect = (payload) => {
    return {
        type: ActionTypes.SET_UPDATE_EQUIPMENT_POINTER_LIST,
        payload: payload,
    }
}
export const setUpdateMediaSelect = (payload) => {
    return {
        type: ActionTypes.SET_UPDATE_MEDIA_POINTER_LIST,
        payload: payload,
    }
}
export const setFilePreview = (payload) => {
    return {
        type: ActionTypes.SET_FILE_PREVIEW_MODAL,
        payload: payload,
    }
}