import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { SidebarList } from '../../App'
import { SetShowMenu } from '../../redux/actions'
import Icon from '../common/Icon'

export default function SideBar(props) {
    const dispatch = useDispatch();
    const ShowMenu = useSelector((state)=>state?.allReducers?.ShowMenu);
  return (
    <div className='sidebar-wrapper'>
        <div className={`sidebar sidebar-collapse ${ShowMenu ?"":"collapsed"} `}>
            <div className='sidebar__menu-group'>
                {props?.windowWidth&&(
                        <div className="logo-wrapper">
                            <h4 className='navbar-brand'>323Design</h4>
                            <span className="back-btn" onClick={()=>dispatch(SetShowMenu(false))} >
                                <Icon className={"arrowback"} />
                            </span>
                        </div>
                )}
                <ul className="sidebar_nav">
                    {SidebarList?.map((item, index)=>item?.sidebar === true && (
                        <li key={index?.toString()}>
                            <NavLink to={item.to} className={"navlink"} >
                                <span className="nav-icon uil uil-arrow-growth">
                                    <Icon className={item?.icon} />
                                </span>
                                <span className="menu-text">{item?.title}</span>
                                {/* <span className="badge badge-info-10 menuItem rounded-pill">1.1.4</span> */}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}
