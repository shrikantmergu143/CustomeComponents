/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../common/component/Icon';
import AddModes from '../dashboard/mode/AddModes';
import ModeList from '../dashboard/mode/ModeList';
import AddUsers from '../dashboard/users/AddUsers';
import UsersList from '../dashboard/users/UsersList';
import DashboardIndex from "./../dashboard/Index";
import QuestionList from "./../dashboard/question/QuestionList";
import AddQuestion from "./../dashboard/question/AddQuestion"
import ProfilePage from '../dashboard/profile/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { SetChangeMenu } from '../../redux/actions';
export const SidebarList = [
    {
        title:"Dashboard",
        icon:"dashboard",
        to:"dashboard",
        Element:<DashboardIndex/>,
        children:[]
    },
    {
        title:"Users",
        icon:"userlist",
        to:"users",
        Element:<UsersList/>,
        children:[
            {
                title:"Users",
                icon:"userlist",
                to:"add",
                Element:<AddUsers title={"Add User"} breadcrumb={"Add"}/>
            },
            {
                title:"Users",
                icon:"userlist",
                to:"edit",
                Element:<AddUsers title={"Update User"} breadcrumb={"Update"}/>
            }
        ]
    },
    {
        title:"Mode",
        icon:"mode",
        to:"mode",
        Element:<ModeList/>,
        children:[
            {
                title:"Users",
                icon:"userlist",
                to:"add",
                Element:<AddModes title={"Add Mode"} breadcrumb="Add" />
            },
            {
                title:"Users",
                icon:"userlist",
                to:"edit",
                Element:<AddModes title={"Update Mode"} breadcrumb="Update" />
            }
        ]
    },
    {
        title:"Questions",
        icon:"questions",
        to:"questions",
        Element:<QuestionList/>,
        children:[
            {
                title:"Question",
                icon:"userlist",
                to:"add",
                Element:<AddQuestion title={"Add Question"} breadcrumb="Add" />
            },
            {
                title:"Question",
                icon:"userlist",
                to:"edit",
                Element:<AddQuestion title={"Update Question"} breadcrumb="Update" />
            }
        ]
    },
    {
        title:"Profile",
        icon:"profile",
        to:"profile",
        Element:<ProfilePage/>,
        children:[]
    },
]
export default function Index(props) {
    const { WidthScreen } = props;
    const { ShowMenu } = useSelector((state)=>state?.allReducers);
    const dispatch = useDispatch()
  return (
    <React.Fragment>
        <div className={`sidebar-wrapper ${props?.className} ${WidthScreen? "mobile_menu":"desktop_menu"}`}>
            <div>
                <div className="logo-wrapper">
                    <h5 className='mb-0'>UrbanBird</h5>
                    <div className="back-btn" >
                        <Icon className={"chevron-left"} />
                    </div>
                </div>
                <div className='sidebar-main'>
                    <div id='sidebar-menu'>
                        <ul className='sidebar-links scrolloverlay' id='simple-bar'>
                            <li className='sidebar-list'>
                                {SidebarList?.map((item, index)=>(
                                    <NavLink onClickCapture={()=>WidthScreen && dispatch(SetChangeMenu(false))} to={item?.to} key={index?.toString()} className={"sidebar-link sidebar-title "}>
                                        <Icon className={`${item?.icon} icon`} />
                                        <span className="lan-3">{item?.title}</span>
                                    </NavLink>
                                ))}
                                {/* <a className="sidebar-link sidebar-title " href >
                                </a> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
       {WidthScreen && ShowMenu && <div onClick={()=>dispatch(SetChangeMenu(false))} className={"bg-overlay active"} />}
    </React.Fragment>
  )
}
