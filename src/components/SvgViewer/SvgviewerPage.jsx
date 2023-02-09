/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react'
import { Button, Card, Dropdown, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { setCallLogout, setDeleteSelectPointer, setFilePreview, SetShowMenu, setStoreSelectPointer, setStoreSelectViewerDesign, setStoreViewerDesign, setUpdateEquipmentSelect, setUpdateMediaSelect, ShowToast } from '../../redux/actions';
import Icon from '../common/Icon'
import InputGroup from '../common/InputGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LogoImages from "./../../assets/img/323logo.png"
import fcs from "./../../assets/img/fcs.svg";
import IconButton from "./../common/IconButton"
import ViewerSideBar from './ViewerSideBar';
import { Link, useNavigate } from 'react-router-dom';
import ReactSelect from '../common/ReactSelect';
import { PostRequestAPI } from '../../Api/PostRequest';
import { DESIGN_GET, DESIGN_LIST, EQUIPMENT_GET, FILES_GET, LOGOUT } from '../../Api/constant';
import { getRequestcall } from '../../Api/GetRequest';
import { FilePreview } from '../common/FilePreviewPopup';

const SvgViewerComponent = (props)=>{
    // const [url, seturl] = useState(null);
    // const [svg, setSvg] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);
    // const [isErrored, setIsErrored] = useState(false);

    // useEffect(()=>{
        
    //     fetch(process.env.REACT_APP_BASE_URL +"/media/"+props?.design_svg)
    //     .then(res => res.text())
    //     .then(setSvg)
    //     .catch(setIsErrored)
    //     .then(() => setIsLoaded(true))
    // },[])
    return(
        <img alt='' src={process.env.REACT_APP_BASE_URL +"/media/"+props?.design_svg}  id='image-viewers'
                                style={{
                                width:"100%",
                                height: 'auto'
                                }}
                            />
    )
    // return (
    //     <div 
    //         className={`svgInline svgInline--${isLoaded ? 'loaded' : 'loading'} ${isErrored ? 'svgInline--errored' : ''}`}
    //         dangerouslySetInnerHTML={{ __html: svg }}
    //         onMouseMove={console.log}
    //         id='image-viewers'
    //     />
    // );
}

export default function SvgviewerPage(props) {
    const [SideBarState, setSideBarState] = useState({
        show:false,
        showlist:false
    });
    const { currentUser  } = useSelector((state)=>state?.allReducers)

    const [select, setSelect] = useState(null);
    const [options, setOptions] = useState([])
    const access_token = useSelector((state)=>state?.allReducers?.access_token);
    // const viewerDesign = useSelector((state)=>state?.allReducers?.viewerDesign?.data);
    const selectDesign = useSelector((state)=>state?.allReducers?.selectDesign);
    const selectPointer = useSelector((state)=>state?.allReducers?.selectPointer);
    const [ShowEquipment, setShowEquipment] = useState(false)
    const [Loader, setLoader] = useState(true);
    const [hover, setHover] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pos, setPos] = useState({ x: 0, y: 0, scale: 1 });
    let getDesignid = window.location.pathname.split("/").pop();

    let panning = false;
    let scale = 1;
    let pointX = 0;
    let pointY = 0;
    let start = { x: 0, y: 0 };

    useEffect(()=>{
        callViewerDesign();
    },[]);

    // Calling Viewer design list
    const callViewerDesign = async ( ) =>{
        const url = `${DESIGN_LIST}/all/${10}/${1}`;
        setLoader(true);
        dispatch(setDeleteSelectPointer(undefined))
        const response = await getRequestcall(url, access_token);
        if(response?.status === 200){
            // dispatch(setStoreViewerDesign(response?.data));
            const data = response?.data?.data?.map((item)=>({label:item?.design_title, value:item?.id}));
            //console.log("data", data)
            setOptions(data);
            // default selected first
            if(data?.length > 0) {
                if(getDesignid !== ""){
                   let getSelecteddesing = data?.filter((item)=>item.value === getDesignid);
                   if(getSelecteddesing?.length > 0) {
                    // console.log("value",getSelecteddesing)
                    setSelect({
                        label:getSelecteddesing[0]?.label,
                        value:getSelecteddesing[0]?.value,
                       });
                      showViewer(getSelecteddesing[0]?.value);
                   } else {
                    setSelect({
                        label:data[0]?.label,
                        value:data[0]?.value,
                    });
                    showViewer(data[0]?.value);
                   }
                } else {
                    setSelect({
                        label:data[0]?.label,
                        value:data[0]?.value,
                    });
                    showViewer(data[0]?.value);
                }
             }
        }else{
            setOptions([])
            dispatch(setStoreViewerDesign({
                data:[],
                pagination:{
                    current_page:1,
                    record_limit:10,
                    total_records:0
                }
            }))
        }
        // if(selectDesign!== undefined){
        //     showViewer(selectDesign?.id);
        // }
        setLoader(false);
        //setTimeout(()=>setLoader(false), 600)
    }

    const showViewer = async (selectDesign) => {
        // console.log("select design",selectDesign)
        const url = `${DESIGN_GET}/${selectDesign}`
        const response = await getRequestcall(url, access_token);
        if(response?.status === 200){
            dispatch(setStoreSelectViewerDesign(response?.data?.data))
            setSelect({
                label:response?.data?.data?.design_title,
                value:response?.data?.data?.id,
            });
        }else{
            setSelect(null);
            dispatch(setStoreSelectViewerDesign(undefined))
            
        }
    }

    function setTransform(pointX, pointY, type) {
        document.getElementById("svg-viewer").style.transform = `translate(${pointX}${type} , ${pointY}${type}) scale(${scale})`;
    }
    const callSideBarMenu = async (state, items) =>{
        setSideBarState({
            show:state,
            showlist:items
        })
    }
    const CallSelectPointer = (list) =>{
        setHover(null)
        setSideBarState({
            show:true,
            showlist:true,
        });
        dispatch(setStoreSelectPointer(list))
        const Equipments = list?.selected_equipment?.split(",");
        Equipments?.map(async(item)=>{
            const URL = EQUIPMENT_GET+"/"+item
            const response = await getRequestcall(URL,access_token);
            if(response?.status === 200){
                const data = {
                    ...response?.data?.data,
                    equipment_meta:JSON.parse(response?.data?.data?.equipment_meta)
                }
                dispatch(setUpdateEquipmentSelect(data))
            }
        })
        const Media = list?.selected_media?.split(",");
        Media?.map(async(item)=>{
            const URL = FILES_GET+"/"+item
            const response = await getRequestcall(URL, access_token);
            if(response?.status === 200){
                dispatch(setUpdateMediaSelect(response?.data?.data));
            }
        });
        setShowEquipment(false)

    }
    // const options = [
    //     {label:"Machine tank1", value:"1"},
    //     {label:"Machine tank2", value:"2"},
    //     {label:"Machine tank3", value:"2"},
    // ]
    const callOnSelect = async(list, e) =>{
        if(select?.value!== list?.value){
            dispatch(setDeleteSelectPointer(undefined))
            setShowEquipment(false)
            setSelect(list);
            setLoader(true);
            const url = `${DESIGN_GET}/${list?.value}`
            const response = await getRequestcall(url, access_token);
            if(response?.status === 200){
                dispatch(setStoreSelectViewerDesign(response?.data?.data))
                navigate(`/${list?.value}`)
            }else{
                dispatch(setStoreSelectViewerDesign(undefined))
            }
            setLoader(false)
            //setTimeout(()=>setLoader(false), 600)
        }
        // callOnSelect()
    }
    const callShowPreview = async (item) =>{
        
        const response = await fetch(process.env.REACT_APP_BASE_URL +"/media/" + item?.file_path)
       
        if(response?.status === 200){
            const result = await response.blob()
            const payload = {
                ...item,
                show:true,
                isFile:true,
                file_path:item?.file_path,
                file_name:item?.file_name,
                file_url:URL.createObjectURL(result)
            }
            dispatch(setFilePreview(payload));
        }else{
            dispatch(ShowToast({
                description:"Anable to open file",
                show:true,
                type:"error",
            }))
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
        // console.log("response", selectDesign)
    return (
    <aside className='single-page'>
        <header className="header-top header-wrapper">
            <nav className={`navbar navbar-dark `}>
                <div className='navbar-left me-lg-4'>
                    <div className="logo-area" onClick={(()=>access_token&&navigate("/dashboard"))}>
                        <div className='logo-brand'>
                            <img alt='' src={LogoImages} />
                        </div>
                    </div>
                </div>
                <div className='left-side-header col ps-0 d-flex ml-2'>
                    <ReactSelect
                        options={options}
                        formClass={"mb-0"}
                        value={select}
                        onChange={callOnSelect}
                        placeholder={"Select Design"}
                    />
                    {
                        !access_token && (
                            <div className='header-tabs'>
                            <div className="collection homepage">
                                <Link to="/login">
                                    Login
                                </Link>
                            </div>
                        </div>
                        )
                    }
                     <Dropdown className='user-menu'>
                            <Dropdown.Toggle id="dropdown-button-dark-example1">
                                <Icon className={"users"} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='menu_icon'>
                                <Dropdown.ItemText >
                                    <Icon className={"users"} />
                                    <div>
                                        <h6 className='mb-0'>{currentUser?.name}</h6>
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
                    <IconButton onClick={()=>{
                            if(SideBarState?.show){
                                callSideBarMenu(false, false)
                            }else{
                                callSideBarMenu(!SideBarState?.show, false)
                            }
                        }} icon={"sidebar"} className='menu btn-sm tab-view ml-2 '/>
                </div>
            </nav>
        </header>
        <aside className='body-content'>
            <div className='floorplan'>
                <div className='floorplan-control'>
                    <div className='floorplan-controls__left'>
                        <button onClick={(e)=>{
                           if(scale<=5.3){
                                scale += .1;
                                setTransform(pointX, pointY, "px");
                            }
                        }} className='btn floor-control btn-sm border-0' >
                            <li>
                                <Icon className='plus-map floor_plus' />
                                Zoom In
                            </li>
                        </button>
                        <button  onClick={(e)=>{
                            if(scale>=0.3){
                                scale -= .1;
                                setTransform(pointX, pointY, "px");
                            }
                        }} className='btn floor-control btn-sm border-0' >
                            <li>
                                <Icon className='minus floor_plus' />
                                Zoom Out
                            </li>
                        </button>
                        <button onClick={(e)=>{
                            scale= 1;
                            pointX= 0
                            pointY= 0
                            setTransform(pointX, pointY, "px");

                        }}  className='btn floor-control btn-sm border-0' >
                            <li>
                                <Icon className='resize floor_plus' />
                                Resize
                            </li>
                        </button>
                        <button hidden className='btn floor-control btn-sm border-0' >
                            <li>
                                <Icon className='info_icon floor_plus' />
                                Legend
                            </li>
                        </button>
                        <button hidden className='btn floor-control btn-sm border-0' >
                            <li>
                                <Icon className='eye floor_plus' />
                                Options
                            </li>
                        </button>
                    </div>
                    <div className='floorplan-controls__right'>
                        <button className='btn floor-control btn-sm border-0 d-none' >
                            <li>
                                <Icon className='print floor_plus' />
                                Print
                            </li>
                        </button>
                    </div>
                </div>
                <div className='floorplan-canvas-div'>
                    {!Loader && selectDesign!==undefined &&(
                        <div 
                            className='svg-viewer sortable-handler'
                            id={"svg-viewer"}
                            onMouseDown = { function (e) {
                                if (e.cancelable) e.preventDefault();
                                start = { x: e.clientX - pointX, y: e.clientY - pointY };
                                panning = true;
                            }}
                            onWheel = {function (e) {
                                if (e.cancelable) e.preventDefault();
                                let xs = (e.clientX - pointX) / scale;
                                let ys = (e.clientY - pointY) / scale;
                                let delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
                                (delta > 0) ? (scale *= 1.1) : (scale /= 1.1);
                                pointX = e.clientX - xs * scale;
                                pointY = e.clientY - ys * scale;
                                setTransform(pointX, pointY, "px");
                            }}
                            onMouseUp ={ function (e) {
                                if (e.cancelable) e.preventDefault();
                                panning = false;
                            }}
                            onMouseMove = {function (e) {
                                if (e.cancelable) e.preventDefault();
                                if (!panning) {
                                    return;
                                }
                                pointX = (e.clientX - start.x);
                                pointY = (e.clientY - start.y);
                                setTransform(pointX, pointY, "px");
                            }}
                            onClick={e=>e.preventDefault()}
                        >
                            <div className='position-relative' id="add-image">
                            <SvgViewerComponent {...selectDesign}/>
                            {selectDesign?.design_description?.allpoints?.map((item,index)=>(
                                <span
                                    key={index}
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        CallSelectPointer(item)
                                    }}
                                    style={{left:item?.left,top:item?.top,visibility:"visible"}}
                                    id={"pointer"}
                                    className={(hover  === item?.id || selectPointer?.id === item?.id)?"active pulse":""}
                                >
                                    {item?.sr_no}
                                </span>
                            ))}
                            </div>
                        </div>
                    )}
                    {!Loader &&selectDesign === undefined&&(
                        <>
                            Data not found
                        </>
                    )}
                    {Loader&&(
                        <div className="mys-spinner mys-spinner-centered  mys-spinner-large">
                            <div className="mys-spinner-double-bounce1  "></div>
                            <div className="mys-spinner-double-bounce2  "></div>
                            <p className="mys-spinner-txt">Loading...</p>
                        </div>
                    )}
                </div>
            </div>
            <ViewerSideBar
                SideBarState={SideBarState}
                callSideBarMenu={callSideBarMenu}
                CallSelectPointer={CallSelectPointer}
                ShowEquipment={ShowEquipment}
                setShowEquipment={setShowEquipment}
                setHover={setHover}
                callShowPreview={callShowPreview}
                hover={hover}
                select={select}
                setSelect={setSelect}
            />
        </aside>
        <FilePreview />
    </aside>
  )
}
