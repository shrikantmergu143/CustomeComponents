/* eslint-disable array-callback-return */
/* eslint-disable */
import React from "react";
import { Dropdown, ButtonGroup, Image } from "react-bootstrap";
import ChatHeadDownMenu from "../common/ChatHeadDownMenu";
import MenuIcon from "../../assets/img/menu.svg";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import dummygroup from "./../../assets/img/profile/dummygroup.png"
import dummyimage from "../../assets/img/profile/dummyimage.png";
import systemgroup from "../../assets/img/profile/system.svg";
import dummybroadcastimage  from "../../assets/img/Broadcast_light.png";
import Broadcast_dark from "./../../assets/img/Broadcast_dark.png";
import { UpdateMediaFiles } from "../../redux/actions";
import ProfileAuthPreview from "./ProfileAuthPreview";
import CommanTyping from "./CommanTyping";

const Header = (props) => {
    const {
      setGroupInfoSidebar,
      groupInfoSidebar,
      setMessagesInfoSidebar,
      MessageInfoSidebar
    } = props;
    const UserID = useSelector((state) => state.allReducers.userLogin.user_id);
    const Contacts = useSelector((state) => state.allReducers.Contacts);
    const SelectedRoom = useSelector((state) => state.allReducers.SelectedRoom);
    const ThemeCheck = useSelector((state)=>state?.allReducers?.themeDarkLight);
    const dispatch = useDispatch();

    var timeSince = function(date, userDate) {
        let seconds = Math.floor((Date.now() - date) / 1000);
        let value = seconds;
        if (seconds >= 31536000) {
          value = moment.utc(userDate).local().format('DD/MM/YYYY');
        } else if (seconds >= 86400) {
          value = moment.utc(userDate).local().format('DD/MM/YYYY');
        } else if (seconds >= 3600) {
          value = moment.utc(userDate).local().format('hh:mm a');
        } else if (seconds >= 60) {
          value = moment.utc(userDate).local().format('hh:mm a');
        }else{
        value = moment.utc(userDate).local().format('hh:mm a');
        }
        return value;
      };
    const { roomId } = useParams();
    useEffect(()=>{

    },[roomId])

    const showInfoGroup = () => {
      setMessagesInfoSidebar({
        show:false,
        Messages:[]
      });
      dispatch(UpdateMediaFiles(SelectedRoom))
      setGroupInfoSidebar(true);
    }

    // user contact list name show
    const UserContactWiseUpdate = (msg) => {
      return msg?.name || msg?.phone;
    }

    return(
        <div className="channelHeader" >
            <div className="channelHeaderBox" onClick={() => showInfoGroup()}>
              {SelectedRoom?.isBroadCast !== undefined && <Image src={ThemeCheck === "dark" ? Broadcast_dark : dummybroadcastimage} className="profileinfoImage" alt="details" />}
              {SelectedRoom?.admin_ids !== undefined &&(
                  <ProfileAuthPreview
                    url={SelectedRoom?.group_type ? SelectedRoom?.group_avatar : SelectedRoom?.avatar?.view_thumbnail_url}
                    className={"profileinfoImage"}
                    avatar={SelectedRoom?.avatar}
                    defultIcon={dummygroup}
                  />
              )}
              {
                ((SelectedRoom?.admin_ids === undefined ||SelectedRoom?.admin_ids === null) && (SelectedRoom?.admin_id === undefined ||SelectedRoom?.admin_id === null)) &&
                <ProfileAuthPreview
                    url={SelectedRoom?.view_thumbnail_url}
                    className={"profileinfoImage"}
                    avatar={SelectedRoom}
                    defultIcon={dummyimage}
                  />
              }

              <div className="channelCurentDta_" 
                style={{
                  display: SelectedRoom?.isBroadCast === true && "grid"
                }}
              >
                  {SelectedRoom?.name !== undefined ? <h4 dangerouslySetInnerHTML={{__html: roomId === UserID ? "You" : UserContactWiseUpdate(SelectedRoom)}}></h4> :
                  <React.Fragment>
                  {SelectedRoom?.admin_ids && <h4 dangerouslySetInnerHTML={{__html: SelectedRoom?.group_name}}></h4>}
                  {SelectedRoom?.admin_id && <h4 dangerouslySetInnerHTML={{__html: SelectedRoom?.broadcast_name}}></h4>}
                  </React.Fragment>
                  }
                  {(SelectedRoom?.userTyping !== undefined && SelectedRoom?.userTyping?.status === 1?
                        <CommanTyping SelectedRoom={SelectedRoom} user_id={SelectedRoom?.userTyping?.user_id} />
                  :(SelectedRoom?.isBroadCast === true || SelectedRoom?.isGroups === true)?
                  <React.Fragment><span  className="broacast">
                  {SelectedRoom?.users?.map((item, index)=>{
                      return(
                        <React.Fragment key={index}>
                          {item?.id === UserID ?"You" :item?.name}
                          {index === SelectedRoom?.users?.length-1 ?"":", "}
                        </React.Fragment>
                      )
                  })}
                  </span>
                  </React.Fragment> : (
                    SelectedRoom?.online>=0 ?
                    <span> {SelectedRoom?.online>0?"Online":"Offline"}</span>
                    :
                    (SelectedRoom?.last_message_at === "None" && SelectedRoom?.last_message_at === "") ? 
                  (<React.Fragment>{<span>{SelectedRoom?.updated_at && timeSince(new Date(SelectedRoom?.updated_at), SelectedRoom?.updated_at)}</span>}</React.Fragment>) : 
                  (<React.Fragment>{<span>{ SelectedRoom?.last_message_at && timeSince(new Date(SelectedRoom?.last_message_at), SelectedRoom?.last_message_at)}</span>}</React.Fragment>)
                  ))}
              </div>
            </div>
            <Dropdown className="ChatHeaderMenu" as={ButtonGroup}>
                <Dropdown.Toggle variant="default" id="dropdown-basic">
                    <i className={"Icon_menu"}/>
                </Dropdown.Toggle>                
                <ChatHeadDownMenu 
                    setGroupInfoSidebar={setGroupInfoSidebar}
                    SelectedRoom={SelectedRoom}
                    groupInfoSidebar={groupInfoSidebar}
                />
            </Dropdown>
        </div>
    )
}

export default Header;