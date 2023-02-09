
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  Outlet  } from "react-router"
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import ConfirmModal from './components/common/ConfirmModal';
import CustomeToaster from './components/common/CustomeToaster';
import Icon from './components/common/Icon';
import SvgviewerPage from './components/SvgViewer/SvgviewerPage';
import DashboardIndex from './components/DashboardPanel/DashboardIndex';
import AddEquipmentPage from './components/DashboardPanel/Equipment/AddEquipmentPage';
import EquipmentPage from './components/DashboardPanel/Equipment/EquipmentPage';
import HomePage from './components/DashboardPanel/Home/HomePage';
import ReactMediaLibraryWrapper from './components/DashboardPanel/Media/ReactMediaLibraryWrapper';
import ProfilePage from './components/DashboardPanel/Profile/ProfilePage';
import AddsvgPage from './components/DashboardPanel/Svg/AddsvgPage';
import SvglistPage from './components/DashboardPanel/Svg/SvglistPage';
import ForgotPage from './components/ForgotScreen/ForgotPage';
import LoginPage from './components/LoginScreen/LoginPage';
import axios from 'axios';
import ResetpasswordPage from './components/resetpassword/ResetpasswordPage';
import Userslistpage from './components/DashboardPanel/Users/UsersListPage';
import AddUsers from './components/DashboardPanel/Users/AddUsers';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const SidebarList = [
  {
    title:"Dashboard",
    icon:"dashboard",
    to:"/dashboard",
    Element:<HomePage/>,
    sidebar:true,
    children:[]
  },
  {
    title:"Equipment",
    icon:"equipment",
    to:"/equipment",
    sidebar:true,
    Element:<EquipmentPage/>,
    children:[
      {
          to:"add",
          title:"Add Equipment",
          Element:<AddEquipmentPage title={"Add Equipments"} breadcrumb={"add"}/>
      },
      {
          to:"edit/:id",
          title:"Edit Equipment",
          Element:<AddEquipmentPage title={"Update Equipments"} breadcrumb={"update"}/>
      }
    ],
  },
  {
    title:"Design",
    icon:"svg1",
    to:"/svg",
    sidebar:true,
    Element:<SvglistPage/>,
    children:[
      {
        to:"add",
        title:"Add Design",
        Element:<AddsvgPage title={"Add Svg"} breadcrumb={"Add"}/>
      },{
          to:"edit/:id",
          title:"Edit Design",
          Element:<AddsvgPage title={"Edit Svg"} breadcrumb={"update"}/>
      }
    ]
  },
  {
    title:"Media",
    icon:"media",
    to:"/Media",
    sidebar:false,
    Element:<ReactMediaLibraryWrapper/>,
    children:[]
  },
  {
    title:"Users",
    icon:"users_1",
    to:"/Users",
    sidebar:true,
    Element:<Userslistpage/>,
    children:[
        {
          title:"Users",
          icon:"userlist",
          to:"add",
          Element:<AddUsers title={"Add User"} breadcrumb={"Add"} type={"add"} />
      },
      {
          title:"Users",
          icon:"userlist",
          to:"edit/:id",
          Element:<AddUsers title={"Update User"} breadcrumb={"Update"} type={"edit"}/>
      }
    ]
  },
  {
    title:"Profile",
    icon:"usermenu",
    to:"/Profile",
    sidebar:true,
    Element:<ProfilePage/>,
    children:[]
  }
];

function App() {
  const {access_token} = useSelector((state)=>state?.allReducers);
  useEffect(()=>{
  },[])
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            {!access_token ?
                <React.Fragment>
                  <Route path="/" element={<Navigate to={"/login"} replace={true} />} />
                  <Route path="/login" element={<LoginPage type={"user"} />} />
                  <Route path="/admin/login" element={<LoginPage type={"admin"} />} />
                  <Route path="/forgot" element={<ForgotPage />} />
                  <Route path="/reset-password" element={<ResetpasswordPage/>} />
                  <Route path="*"  exact element={<Navigate to={"/login"} replace={true} />} />
                 </React.Fragment>
                :
                <React.Fragment>
                  <Route exact path="/" element={<DashboardIndex />}>
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
                  <Route path="/:id"  exact element={<SvgviewerPage />} />
              </React.Fragment>
            }
          </Routes>
      </BrowserRouter>
      <div className="tap-top">
        <Icon className={"arrowtop"} />
      </div>
      <CustomeToaster/>
      <ConfirmModal/>
    </div>
  );
}

export default App;
