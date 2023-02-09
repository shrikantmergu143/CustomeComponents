/* eslint-disable */
import React, { useEffect } from 'react';
import Tooltip from '../common/tooltip';
import { useDispatch, useSelector } from "react-redux";
import { mainTabChange } from "../../redux/actions";
import GetProfile from '../../Api/ws/GetProfile';
import DummyImage from '../../assets/img/profile/dummyimage.png';
import {Image} from "react-bootstrap"
import ProfileAuthPreview from '../ChatPanels/ProfileAuthPreview';

const ProfilePersonal = () => {
  const dispatch = useDispatch();
  const { MyProfile, access_token } = useSelector((state) => state.allReducers);

  useEffect(() => {
    FetchAllData();
  }, []);

  // fetch all profile data 
  const FetchAllData = () => {
    dispatch(GetProfile(access_token));
  }
  return (
    <div className="profileUser_wrap" id='profileUser_Id'>
        <div className="profileUser_Set">
          <Tooltip content="You" direction="bottom">
            <button onClick={(e) => dispatch(mainTabChange("ProfileEdit"))}>
               <div className="AvatarCustomSet">
                    {(MyProfile?.view_thumbnail_url !== undefined || MyProfile?.view_thumbnail_url !== null) ? 
                        <ProfileAuthPreview 
                            url={MyProfile?.view_thumbnail_url}
                            className={"avatarImage"}
                            defultIcon={DummyImage}
                            click={false}
                        />
                        :
                        <Image src={DummyImage} className="avatarImage" alt="profile"/>
                    }
                </div>
            </button>
          </Tooltip>
        </div>
    </div>
  );
}

export default ProfilePersonal;