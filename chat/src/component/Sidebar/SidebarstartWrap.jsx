import React from "react";
import ChatSidebar from "./ChatSidebar";
import BlockedUsers from "./blockedUsers/Index.jsx";
import CreateGroup from "./createGroup/Index.jsx";
import SavedMessages from "./SavedMesages/Index.jsx";
import ProfileEdit from "./Profile/Index.jsx";
import { useSelector } from "react-redux";
import ToasterAlert from "../common/ToasterAlert";

const SidebarstartWrap = () => {
    const sidebarLinks = useSelector((state) => state.allReducers.MainTabsSelected);
    const BlockedUserList = useSelector((state) => state.allReducers.BlockedUserList);
    const memberslist = useSelector((state) => state.allReducers.Rooms);
    const getSavedMessages = useSelector((state) => state.allReducers.SavedMessages);
    const ToasterMsg = useSelector((state) => state.allReducers.Toaster_message);

    return(
        <div className="mainoptionsidebar">
            {/* chat sidebar */}
            {sidebarLinks === "Chat" && (<ChatSidebar />)}

            {/* profile edit sidebar */}
            {sidebarLinks === "ProfileEdit" && (
                <ProfileEdit />
            )}
            
            {/* Create group users */}
            {sidebarLinks === "Creategroup" && (<CreateGroup  sidebarTitle={"New Group"} />)}

            {/* Create broadcast users */}
            {sidebarLinks === "brodcast" && (<CreateGroup memberslist={memberslist} sidebarTitle={"New Broadcast"} />)}

            {/* blocked users */}
            {sidebarLinks === "blockusers" && (<BlockedUsers BlockedUserList={BlockedUserList} />)}

            {/* saved messages */}
            {sidebarLinks === "savedmessage" && (<SavedMessages getSavedMessages={getSavedMessages} />)}

            {/* Toaster alert  */}
            <ToasterAlert ToasterMsg={ToasterMsg} />
        </div>
    )
}

export default SidebarstartWrap;