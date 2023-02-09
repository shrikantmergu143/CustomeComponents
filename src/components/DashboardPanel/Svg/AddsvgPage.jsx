/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import minus_icon from "../../../assets/img/minus_icon.svg";
import plus_icon from "../../../assets/img/plus_icon.svg";
import { useDispatch,useSelector } from "react-redux";
import { ShowPoints } from "../../../redux/actions";
import EquipmentlinkPage from "./EquipmentlinkPage";
import Button from "../../common/Button";
import { useNavigate } from "react-router";
import { ShowToast } from "../../../redux/actions";
import InputGroup from "../../common/InputGroup";
import { PostRequestAPI } from "../../../Api/PostRequest";
import { DESIGN_UPDATE } from "../../../Api/constant";


export function PointervalueChange (props) {
  return (
    <span onMouseDown={props?.editPoint} style={{left:props?.item?.left,top:props?.item?.top,visibility:props?.item?.visibility}} id={"pointer"}>{props?.item?.sr_no}</span>
  )
}

export default function AddsvgPage () {

    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let start = { x: 0, y: 0 };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [contentdata,setContnentdata] = useState({
      title:"",
      description:""
     });

    let getId = window.location.pathname.split("/").pop();
    const { points,design,access_token,designlist } = useSelector((state)=>state?.allReducers)
 
    const [position,setPosition] = useState(0);
    const [randomId,setRandomId] = useState("");
    const [show, setShow] = useState(false);
    const[pointer,setPointer] = useState();
    const[scale,setScale] = useState(1);
    const [designInfo,setDesignInfo] = useState({
       title:"",
       url:""
    })
    const[showeditOption,setShoweditoption] = useState(false);
    const[contextmenu,setContextmenu] = useState(false);

    function setTransform(pointX, pointY, type,scale) {
      document.getElementById("svg-editor").style.transform = `translate(${pointX}${type} , ${pointY}${type}) scale(${scale})`;
    }

    useEffect(()=>{
      if(getId !== "add"){
        designEdit();
      }else{
        setDesignInfo({
          ...designInfo,
          url:design?.design_svg
       })
      }
    },[])

    const designEdit = () => {
      let getCurrentdesign = designlist?.data?.filter((item)=>item.id === getId);
      if(getCurrentdesign.length > 0) {
        setDesignInfo({
           title:getCurrentdesign[0]?.design_title,
           url:getCurrentdesign[0]?.design_svg
        })
        plotPointeratEdit(JSON.parse(getCurrentdesign[0]?.design_description));
      }
    }

    const plotPointeratEdit = (getPoints) => {
      if(getPoints?.allpoints?.length > 0) {
        let pointer = {};
        let updatePointers = getPoints?.allpoints?.map((item)=>{
               return pointer = {
                ...item,
                 visibility:"visible",
               }
        })
        let getLastindex= updatePointers?.length - 1; // get last index of points
        let getlastposition =  updatePointers[getLastindex]?.sr_no // get last position of points
        setPosition(getlastposition) // For next position set the prev position
        dispatch(ShowPoints(updatePointers))
      }
    }

    const imageClik = (e) => {
      e.preventDefault();
      var rightclick;
      if (e.which) rightclick = (e.which === 3);
      else if (e.button) rightclick = (e.button === 2);
      if(rightclick === true) {
      setShoweditoption(false);
      let randomId = Math.random().toString(16).slice(2);
      var clientWidth = document.getElementById("add-image").clientWidth;
      var clientHeight = document.getElementById("add-image").clientHeight;
      var getPosition =  e.target.getBoundingClientRect();
      var x = (e.clientX - getPosition.left) / parseFloat(scale); //x position within the element.
      var y = (e.clientY - getPosition.top) / parseFloat(scale);  //y position within the element.
      var pos_x; 
      var pos_y; 
      pos_x = x/clientWidth * 100;  
      pos_y = y/clientHeight * 100;  
      // Show the context menu for add the pointer
      const contextMenu = document.getElementById('contextMenu')
      contextMenu.addEventListener('contextmenu', (ev)=>{
        ev.preventDefault(); // this will prevent browser default behavior 
      });
      contextMenu.style.left = pos_x+"%";
      contextMenu.style.top = pos_y+"%";
      setContextmenu(true);
      let getValue = {
        id:randomId,
        sr_no:position + 1,
        left:pos_x+"%",
        top:pos_y+"%",
        visibility:"visible",
        title:"",
        description:"",
        selected_equipment:"",
        selected_media:""
     }
      setPointer(getValue);
    }
  }

    const zoomOut = (e) => {
      e.preventDefault();
      if(scale>=0.5){
        let getScale = scale - 0.1
        setScale(getScale);
        setTransform(pointX, pointY, "px",getScale);
     }
    }
      
    const zoomIn = (e) => {
      e.preventDefault();
      if(scale<=3.5){
        let getScale = scale + 0.1
        setScale(getScale);
        setTransform(pointX, pointY, "px",getScale);
      }
    }

    const editPoint = (e,id) => {
      var rightclick;
      if (e.which) rightclick = (e.which === 3);
      else if (e.button) rightclick = (e.button === 2);
      if(rightclick === true) {
      e.preventDefault();
      setShoweditoption(true);
      setRandomId(id);
      let getPointer = points.filter((item)=> item.id === id);
      setContnentdata({
          title:getPointer[0]?.title,
          description:getPointer[0]?.description
      })
       const contextMenu = document.getElementById('contextMenu');
      contextMenu.addEventListener('contextmenu', (ev)=>{
        ev.preventDefault(); // this will prevent browser default behavior 
      });
      contextMenu.style.left = getPointer[0].left;
      contextMenu.style.top = getPointer[0].top;
      }
      setContextmenu(true);
   }

  const resetSvg = (e) => {
      e.preventDefault();
      setScale(1);
      pointX= 0
      pointY= 0
      setTransform(pointX, pointY, "px",1);
  }

  const onMouseDownchange = (e) => {
    var rightclick;
    if (e.which) rightclick = (e.which === 3);
    else if (e.button) rightclick = (e.button === 2);
    if(typeof rightclick === "undefined") {
      if (e.cancelable) e.preventDefault();
      start = { x: e.clientX - pointX, y: e.clientY - pointY };
      panning = true;
    }
  }

  const onWheelchange = (e) => {
    var rightclick;
    if (e.which) rightclick = (e.which === 3);
    else if (e.button) rightclick = (e.button === 2);
    if(typeof rightclick === "undefined") {
    if (e.cancelable) e.preventDefault();
    let getScale = scale;
    let xs = (e.clientX - pointX) / getScale;
    let ys = (e.clientY - pointY) / getScale;
    let delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    (delta > 0) ? (getScale *= 1.1) : (getScale /= 1.1);
    pointX = e.clientX - xs * getScale;
    pointY = e.clientY - ys * getScale;
    setTransform(pointX, pointY, "px",getScale);
    }
  }

  const onMouseUpchange = (e) => {
    if (e.cancelable) e.preventDefault();
    panning = false;
   }
  
   const onMouseMovechange = (e) => {
    if (e.cancelable) e.preventDefault();
    if (!panning) {
        return;
    }
    pointX = (e.clientX - start.x);
    pointY = (e.clientY - start.y);
    setTransform(pointX, pointY, "px",scale);
  }

  const addPointer = (e) => {
     e.preventDefault();
     setContextmenu(false); // context menu hide
     let createPoints = [...points];
     createPoints.push(pointer);
     dispatch(ShowPoints(createPoints));
     setRandomId(pointer?.id);
     setPosition(pointer?.sr_no);
     setContnentdata({
      title:"",
      description:""
  })
     setShow(true);
  }

  const editPointer = (e) => {
    e.preventDefault();
    console.log("randoom id",randomId)
    setShow(true);
    setContextmenu(false);
  }

  const removePointer = (e) => {
     e.preventDefault();
     if(points?.length > 0) {
      let updatePoints = points?.filter((item)=>item.id !== randomId);
      dispatch(ShowPoints(updatePoints));
      if(points.length === 1){
        setPosition(0)
      }else{
        setPosition(position-1)
      }
    }
    setContextmenu(false);
  }

 const onHidemenu = (e) => {
    e.preventDefault();
 }

const titleOnchange = (e) => {
    e.preventDefault();
    setDesignInfo({
       ...designInfo,
       title:e.target.value
    })
}

const validation = () => {
    let value = true;
    if(designInfo?.title === "") {
      dispatch(ShowToast({
        title:"Please enter design title",
        description:"",
        show:true,
        type:"success",
      }))
      value=false;
    }
   return value;
}

// Update the design file 
const updateDesignfile = async (e) => {
  e.preventDefault();
  if(validation()){
    let pointer;
    let getAllpoints = points?.map((item)=> {
        return pointer = {
          id: item?.id,
          sr_no: item?.sr_no,
          title: item?.title,
          description:item?.description,
          left:item?.left,
          top:item?.top,
          selected_equipment:item?.selected_equipment,
          selected_media:item?.selected_media,
        }
    });
    let allpointers = {
        allpoints:getAllpoints
    }
    let payload = {
      design_title:designInfo?.title,
      design_description:JSON.stringify(allpointers),
      design_id:design?.id
    }  
    let getResponse = await PostRequestAPI(DESIGN_UPDATE,payload,access_token);
    if(getResponse.status === 200){
        navigate("/svg");
        dispatch(ShowPoints([]));
     } 
    }
  }

   return (
    <>
    <Row>
    <Col className='mt-3'>
        <Card className="add-svg" onContextMenu={(e)=>onHidemenu(e)}> 
        <Card.Header className='  '>
             <div className="d-flex align-items-center">
             <h5 onClick={(e)=>updateDesignfile(e)}>Update file</h5>
             <div onClick={(e)=>zoomIn(e)} className="d-flex align-items-center zoom ms-4"> 
                <img alt="" src={plus_icon} className="icon"></img>
                <h5>Zoom in</h5>
             </div> 
              <div onClick={(e)=>zoomOut(e)} className="d-flex align-items-center zoom ms-4"> 
                <img alt="" src={minus_icon} className="icon"></img>
                <h5>Zoom out</h5>
             </div>
             <Button type={"submit"} className={"reset-btn"} children={"Reset"} onClick={(e)=>resetSvg(e)}></Button>
             </div>
             <div className="col-6">
             <InputGroup
               placeholder='Enter design title'
               name={"title"}
               formClass="mb-0"
               onChange={titleOnchange}
               value={designInfo?.title}
               require
               errors={""}
              />
             </div>
         </Card.Header>
          <Card.Body className='pt-0 pb-0'>
              <div id="add-image">
              <div id="svg-editor" 
                onMouseDown={(e)=>onMouseDownchange(e)}  
                onWheel={(e)=>onWheelchange(e)}
                onMouseUp={(e)=>onMouseUpchange(e)}
                onMouseMove={(e)=>onMouseMovechange(e)}
              >
              <img alt="" src={`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_MEDIA}${designInfo?.url}`} id="pointer_div" onContextMenu={(e)=>imageClik(e)}/>
                {console.log("value",points)}
               {
                points?.map((item,index)=>(
                    <PointervalueChange editPoint={(e)=>editPoint(e,item?.id)} item={item} scale={scale} />
                ))
               }
               <div id="contextMenu" className="context-menu" style={{display:!contextmenu?"none":"block"}}> 
                <ul className="menu"> 
                 {!showeditOption && (<li onClick={(e)=>addPointer(e)}>Add</li>)}
                 {showeditOption && (
                  <>
                  <li onClick={(e)=>editPointer(e)}>Edit</li>
                  <li onClick={(e)=>removePointer(e)}>Remove</li> 
                  </>
                 )}
                </ul>  
               </div>
             </div>
             </div>
         </Card.Body>
       </Card>
      </Col>
   </Row>
   <EquipmentlinkPage setShow={setShow} contentdata={contentdata} setContnentdata={setContnentdata} show={show} randomId={randomId} position={position} setPosition={setPosition}/>
  </>
   )
}
