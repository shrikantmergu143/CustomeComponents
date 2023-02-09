/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import { Tab } from 'bootstrap';
import React, { useEffect, useRef, useState } from 'react'
import { Card, ListGroup, ListGroupItem, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setDeleteSelectPointer } from '../../redux/actions';
import formatBytes from '../../utils/formatBytes';
import formatDate from '../../utils/formatDate';
import Icon from '../common/Icon';
import Image from '../common/Image';
import { UUID4 } from '../common/InputGroup';
import {  getExtension  } from "./../DashboardPanel/Media/ReactMediaLibraryWrapper";
import Button from "./../common/Button";

export const ViewPointDetails = ( props) =>{
    const dispatch = useDispatch()
    return(
        <div className='relative svg-poiner-list sidebar-list-wrapper '>
            <Link className='link' onClick={()=>{
                props?.callSideBarMenu(true, false)
                dispatch(setDeleteSelectPointer(undefined))
            }}>
                <div className='sidebar-header svg-result' >
                    <Icon className="arrowleft primary" /> 
                    <span >Back to list</span>
                </div>
            </Link>
            <div className='p-2 pb-3 pt-3'>
                <div className='mb-3'>
                    <h5 className='text-primary'>{props?.title}</h5>
                    <p dangerouslySetInnerHTML={{ __html:props?.description }} />
                    <div className='attach-media'>
                        {props?.selected_media?.map((item, index)=>(
                            <Card className='p-0 mb-2' key={index?.toString()} onClick={()=>props?.callShowPreview(item)}>
                                <Card.Body>
                                    <Image className={getExtension(item?.file_name)} />
                                    <div className='file-details'>
                                        <Card.Title className='mb-0'>{item?.file_real_name}</Card.Title>
                                        <span className='file-info'>
                                            <label >{formatBytes(item?.file_size)}</label>
                                            <label>{formatDate(new Date(item?.created_at))}</label>
                                        </span>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
               </div>
            <Button className={"button--primary btn-sm w-100"} onClick={()=>props?.setShowEquipment(true)} >See Equipments</Button>
            </div>
            
        </div>
    )
}

export const ViewerTabScrollBar = () =>{
    const selectPointer = useSelector((state)=>state?.allReducers?.selectPointer);
    const [tabState, setTabState] = useState("");
    const [isLeft, setIsLeft] = useState(false)
    const [cursor, setCursor] = useState(0)
    const uuid = UUID4();
    const [showSlide, setShowSlide] = useState(false);
    const scrollBar = useRef();
    let mouseDown = false;
    let startX, scrollLeft;
    
    useEffect(()=>{
        if(selectPointer?.selected_equipment?.length){
            setTabState(selectPointer?.selected_equipment[0]?.id)
        }
        if(scrollBar.current.scrollWidth === scrollBar?.current?.offsetWidth){
            setShowSlide(false)
        }else{
            setShowSlide(true)
        }
    },[]);

    useEffect(()=>{
        scrollBar.current.addEventListener("wheel", (evt) => {
            evt.preventDefault();
                scrollBar.current.scrollLeft += evt.deltaY;
        });
    },[]);

    const GotoMain = () => {
        document.getElementById('floor-sidebar').scrollTo(0,0)
    }
    const RightClick = ( event ) =>{
        const conent = document.getElementById(`tab-lists`+uuid);
        conent.scrollLeft += 300;
        event.preventDefault();
    }
    const LeftClick = ( event ) =>{
        const conent = document.getElementById(`tab-lists`+uuid);
        conent.scrollLeft -= 300;
        event.preventDefault();
    }
    const ListItemsData = () =>{
        return(
            selectPointer?.selected_equipment?.map((item, index)=>tabState === item?.id && (
                <div className='tab-content' id={item?.id + ` ${uuid}`} key={index?.toString()}>
                    <div className='fade tab-pane active show'>
                        <div className='sidebar-list-wrapper tab-bar'>
                            <ListGroup variant='flush' className='Demos' id={"list-group"} >
                                {item?.equipment_meta?.map((item, index1)=>(
                                    <ListGroupItem action key={index1?.toString()} className={index1 % 2===0?"even":"odd"} >
                                        <div className=" me-auto">
                                            <div className="fw-bold w-100 text-primary">{item?.key}</div>
                                            <div dangerouslySetInnerHTML={{__html:item?.value}} />
                                        </div>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                </div>
            ))
        )
    }
    return(
        <div className=''>
            <div className='carasoul-wrapper'>
                <div className='sticky-top-tab'>
                    <div className='scrollbar-tabs'>
                        <ul
                            className='carasoul nav nav-tabs'
                            id={`tab-lists`+uuid}
                            ref={scrollBar} 
                            onMouseDown={function (e) {
                                e.preventDefault()
                                if(showSlide){
                                    mouseDown = true;
                                    startX = e.pageX - scrollBar.current.offsetLeft;
                                    scrollLeft = scrollBar.current.scrollLeft;
                                }
                            }}
                            onMouseLeave={function (e) {
                                e.preventDefault()
                                if(showSlide){
                                    mouseDown = false;
                                }
                            }}
                            onMouseUp={function (e) {
                                e.preventDefault();
                                if(showSlide){
                                    mouseDown = false;
                                }
                            }}
                            onMouseMove={(e) => {
                                e.preventDefault();
                                if(showSlide){
                                    if(!mouseDown) { return; }
                                    const x = e.pageX - scrollBar.current.offsetLeft;
                                    const scroll = x - startX;
                                    scrollBar.current.scrollLeft = scrollLeft - scroll;
                                }
                            }}
                        >
                            {selectPointer?.selected_equipment?.map((item, index)=>(
                                <li className="nav-item" onClick={()=>{
                                    setTabState(item?.id)
                                    GotoMain();
                                }} id={uuid+index}  key={index?.toString()} >
                                    <button type="button"  id="uncontrolled-tab-example-tab-Pit 1 Leg" className={`btn btn-sm nav-link ${tabState === item?.id ? "active":""}`}>
                                        {item?.equipment_title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                       {showSlide && <div className='control-scroll'>
                            <button disabled={isLeft} onClick={LeftClick} className='arrow-controll'>
                                <Icon className="arrow-left white" />
                            </button>
                            <button onClick={RightClick} className='arrow-controll right'>
                                <Icon className="arrowback white" />
                            </button>
                        </div>}
                    </div>
                </div>
                <div className='carasoul-content' id={"carasoul-content"+uuid}>
                <ListItemsData />
                </div>
            </div>

        </div>
    )
}

export default function ViewerSideBar(props) {
    const selectDesign = useSelector((state)=>state?.allReducers?.selectDesign);
    const selectPointer = useSelector((state)=>state?.allReducers?.selectPointer);
    const { ShowEquipment, setShowEquipment } = props;
  return (
    <div className={`floor-sidebar ${props?.SideBarState?.show?"show":""} ${ShowEquipment?"showTab":""}`} id={"floor-sidebar"}>
        <div className='floor-sidebar-wrapper'>
           {ShowEquipment === true &&
            <div className='relative'>
                <Link className='link' onClick={()=>setShowEquipment(false)}>
                    <div className='sidebar-header svg-result' >
                        <Icon className="arrowleft primary" />
                        <span >Back to {selectPointer?.title}</span>
                    </div>
                </Link>
                <ViewerTabScrollBar/>
            </div>}
            {(selectPointer!== undefined && ShowEquipment === false) &&
                <ViewPointDetails callShowPreview={props?.callShowPreview} className={""} {...selectPointer} callSideBarMenu={props?.callSideBarMenu} setShowEquipment={setShowEquipment} />
            }
            {(selectDesign && ShowEquipment === false && selectPointer=== undefined) &&
                <div className='relative svg-poiner-list pointer-list'>
                    <div className='d-flex gap-2 align-items-center svg-result' >
                        {/* <span className='' onClick={()=>props?.callSideBarMenu(true, false)}>
                            <Icon className="arrowleft" />
                        </span> */}
                        <h6 className='text-primary' >Search Result ({selectDesign?.design_description?.allpoints?.length})</h6>
                    </div>
                    <div className='px-2 text-sm'>
                        <Card className='p-0 bg-ligh-grey border-radius-1'>
                            <Card.Body className='p-2'>
                               {selectDesign?.design_title}
                            </Card.Body>
                        </Card>
                    </div>
                    {/* <hr className='mb-1 mt-3' />{console.log("selectDesign?.design_description", selectDesign?.design_description)} */}
                    <div className='sidebar-list-wrapper mt-4'>
                        <ListGroup variant='flush' >
                            {selectDesign?.design_description?.allpoints?.map((item, index)=>(
                                <ListGroupItem  className={index % 2===0?"even":"odd"} onMouseOver={()=>props?.hover!== item && props?.setHover(item?.id)} onClick={()=>props?.CallSelectPointer(item)} onMouseLeave={()=>props?.hover!== null && props?.setHover(null)} action key={index?.toString()} >
                                    <div className=" me-auto">
                                        <h6 className="fw-bold w-100 text-primary">
                                            {props?.select?.label.substring(0, 1)}{item?.sr_no} - {item?.title}
                                        </h6>
                                        <div className='pointer-description' dangerouslySetInnerHTML={{__html:item?.description}} />
                                    </div>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}
