/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setCallLogout, SetShowMenu, setUpdateGetProfile } from '../../redux/actions';
import Icon from '../common/Icon'
import InputGroup from '../common/InputGroup';
import { Link, useNavigate } from 'react-router-dom'
import { getRequestcall } from '../../Api/GetRequest';
import { LOGOUT, USER_GET } from '../../Api/constant';
import LogoImages from "../../assets/img/323logo.png";

export default function Header(props) {
    const { ShowMenu, access_token, currentUser,selectDesign,designlist  } = useSelector((state)=>state?.allReducers)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        callUserProfile();
    },[])
    const callUserProfile =async () =>{
        const response = await getRequestcall(USER_GET, access_token);
        if(response?.status === 200){
            dispatch(setUpdateGetProfile(response?.data?.data))
        }else if(response?.status === 403){
            dispatch(setCallLogout());
        }
    }
    const callLogout = async () =>{
        const response =await getRequestcall(LOGOUT, access_token);
        if(response?.status === 200){
            navigate("/");
            dispatch(setCallLogout());
        }else if(response?.status === 403){
            navigate("/");
            dispatch(setCallLogout());
        }
    }

    const showViewer = () => {
    if(selectDesign !== undefined){
        navigate(`/${selectDesign?.id}`)
    }else{
        navigate(`/${designlist?.data[0]?.id}`)
    }
    }

    return (
    <header className="header-top">
        <nav className={`navbar navbar-light `}>
            <div className='navbar-left'>
                <div className="logo-area">
                   <img alt='' src={LogoImages} onClick={()=>showViewer()} />
                    <span onClick={()=>dispatch(SetShowMenu(!ShowMenu))} className='sidebar-toggle'>
                       <Icon  className="menu_icon" />
                    </span>
                </div>
            </div>
             <div className='navbar-right'>
                <div className='navbar-right__menu'>
                    <div className='nav-author'>
                        <Dropdown className='user-menu'>
                            <Dropdown.Toggle id="dropdown-button-dark-example1">
                                <Icon className={"users"} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='menu_icon'>
                                <Dropdown.ItemText >
                                    <Icon className={"users"} />
                                    <div>
                                        <h6 className='mb-0'>{currentUser?.name}</h6>
                                        <span>Admin</span>
                                    </div>
                                </Dropdown.ItemText>
                                <Dropdown.Divider/>
                                <Dropdown.Item as={Link} to={"/profile"}>
                                    <Icon className="usermenu" />
                                    Profile
                                </Dropdown.Item>
                                <Dropdown.Item onClick={()=>callLogout()}>
                                    <Icon className="logout" />
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    </header>
  )
}
