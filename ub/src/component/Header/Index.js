/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import { GetLogoutAPI } from '../../api/GetLogout';
import { SetChangeMenu, SetCurrentUserLogin } from '../../redux/actions';
import Icon from '../common/component/Icon';
import logo from "./../../assets/img/logo.svg"

export default function Index() {
    const { access_token, currentUser, ShowMenu } = useSelector((state)=>state?.allReducers);
    const dispatch = useDispatch();
    async function callLogout(){
        const response = await GetLogoutAPI(access_token);
        console.log("response", response)
        if(response?.status === 200){
            dispatch(SetCurrentUserLogin({access_token:""}))
        }else{
            if(response?.response?.status === 403){
                dispatch(SetCurrentUserLogin({access_token:""}))
            }
        }
    }
  return (
    <div className='page-header'>
        <div className='header-wrapper row m-0'>
            <div className="header-logo-wrapper col-auto p-0">
                <div className="logo-wrapper">
                    <h5>UrbanBird</h5>
                    <Link to={"/dashboard"}>
                        <img src={logo} alt={""} />
                    </Link>
                </div>
                <div className="toggle-sidebar" checked="checked">
                    <Icon onClick={()=>dispatch(SetChangeMenu(!ShowMenu))} className="menu pr-color" rounded={true} button={true}/>
                </div>
            </div>
            <div className='nav-right col-xxl-7 col-xl-6 col-md-7 col-4 pull-right right-header p-0 ms-auto'>
                <div className='nav-menus'>
                    <Dropdown className='user-menu'>
                        <Dropdown.Toggle id="dropdown-button-dark-example1">
                            {currentUser?.name ? currentUser?.name[0] : 'B'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='menu_icon'>
                            <Dropdown.Item as={NavLink} to={"profile"}>
                                <Icon className="usermenu" />
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item onClick={callLogout}>
                                <Icon className="logout" />
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            {/* <Icon className="menu pr-color" rounded={true} button={true}/> */}
        </div>
    </div>
  )
}
