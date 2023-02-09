/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import SideBar from "./Sidebar/Index"
import Header from "./Header/Index"
import { Outlet } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { SetChangeMenu } from '../redux/actions';

export default function Index(props) {
  const { ShowMenu } = useSelector((state)=>state?.allReducers);
  const [WidthScreen, SetWidthScreen] = useState(window.innerWidth <= 1024 ?  true : false);
  const dispatch = useDispatch();

  useEffect(()=>{
    function updateSize() {
      SetWidthScreen(window.innerWidth <= 1024 ?  true : false);
    }
    window.addEventListener('resize', updateSize);
    if(WidthScreen){
      dispatch(SetChangeMenu(false))
    }else{
      dispatch(SetChangeMenu(true))
    }
  },[])
  return (
    <div className='page-wrapper compact-wrapper modern-type'>
      <Header  />
      <div className={`page-body-wrapper`}>
          <SideBar className={ShowMenu === true?` ${WidthScreen && 'fadeInLeft'}`:"close_icon fadeOutLeft"} WidthScreen={WidthScreen} />
          <div className='page-body'>
            <Outlet/>
          </div>
      </div>
    </div>
  )
}
