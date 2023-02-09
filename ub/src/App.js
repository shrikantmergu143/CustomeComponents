import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
import {   Route, BrowserRouter, Routes, Navigate, } from "react-router-dom";
import CustomeToaster from "./component/common/component/CustomeToaster"
import axios from "axios";
import { useSelector } from 'react-redux';
import LoginPage from './component/login/LoginPage';
import ComponentIndex from './component/Index';
import React from 'react';
import { SidebarList } from './component/Sidebar/Index';
import { Outlet } from 'react-router'
import ConfirmModal from './component/common/component/ConfirmModal';
import ForgotPage from './component/forgot/ForgotPage';
import ResetpasswordPage from './component/resetpassword/ResetpasswordPage';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

function App() {
  const {access_token} = useSelector((state)=>state?.allReducers);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!access_token ?
            <React.Fragment>
              <Route path="*"  exact element={<Navigate to={"/"} replace={true} />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="forgot" element={ <ForgotPage /> } />
              <Route path='reset-password' exact element={<ResetpasswordPage/>} />
            </React.Fragment>
            :
            <React.Fragment>
              <Route exact path="/" element={<ComponentIndex />}>
                <Route index exact element={<Navigate to={"dashboard"} replace={true} />} />
                {SidebarList?.map(({Element, to, children}, index)=> Element && (
                  <Route path={to} key={index?.toString()}  exact element={<Outlet/>} >
                    <Route index exact element={Element} />
                    {children?.map((item, index1)=>(
                      <Route path={item?.to} key={index1?.toString()} exact element={item?.Element} />
                    ))}
                  </Route>
                ))}
                <Route path="*"  exact element={<Navigate to={"dashboard"} replace={true} />} />
              </Route>
            </React.Fragment>
          }
        </Routes>
        <CustomeToaster/>
        <ConfirmModal/>
      </BrowserRouter>
    </div>
  );
}

export default App;
