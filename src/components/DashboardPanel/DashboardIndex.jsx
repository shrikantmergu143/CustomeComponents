/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { SetShowMenu } from '../../redux/actions';
import Header from './Header';
import ReactMediaLibraryWrapper from './Media/ReactMediaLibraryWrapper';
import SideBar from './SideBar';

export default function DashboardIndex() {
    const dispatch = useDispatch();
    const ShowMenu = useSelector((state)=>state?.allReducers?.ShowMenu);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth <=1024?true:false);
    useEffect(()=>{
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
    },[]);
    const resizeWindow = () =>{
        setWindowWidth(window.innerWidth <=1024?true:false)
        if(window.innerWidth <=1024){
            if(ShowMenu === true){
                dispatch(SetShowMenu(false));
            }
        }else{
                dispatch(SetShowMenu(true));
        }
    }
  return (
    <div className='page-wrapper' onScroll={console.log}>
        <Header />
        <main className='main-content'>
            <SideBar windowWidth={windowWidth}/>
            {windowWidth && <div className={ShowMenu ? 'bg-overlay active':'bg-overlay'} onClick={()=>dispatch(SetShowMenu(false))} />}
            <div className={`dashboard-contents  ${windowWidth ?"expanded":ShowMenu ?" ":"expanded "} `}>
                <div className='dashboard-wrapper'>
                    <div className='container-fluid'>
                        <div className='row justify-content-center'>
                            <div className='dashboard-body col-lg-12'>
                               <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <ReactMediaLibraryWrapper/>
    </div>
  )
}
