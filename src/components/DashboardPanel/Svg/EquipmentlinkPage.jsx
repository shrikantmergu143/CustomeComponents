/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Offcanvas } from "react-bootstrap";
import { useSelector ,useDispatch} from "react-redux";
import { setCallBackFileSelect, ShowPoints } from "../../../redux/actions";
import Button from "../../common/Button";
import Selectlist from "../../../components/common/Selectlist";
import Texteditor from "../../common/TextEditor";
import { CallGetEquipmentList } from "../../../redux/actions/utils";
import { getRequestcall } from "../../../Api/GetRequest";
import { EQUIPMENT_DETAIL, FILE_DETAIL } from "../../../Api/constant";
import InputGroup from "../../common/InputGroup";

export default function EquipmentlinkPage (props) {

const dispatch = useDispatch();
const {points,callBackMediaFile,access_token} = useSelector((state)=>state?.allReducers)
const equipmentList =  useSelector((state)=>state?.allReducers?.equipment);


const [errors, setErrors] = useState({
  title:"",
  description:"",
  selected_equipment:"",
  selected_media:""
});

const [showlist,setShowlist] = useState(false);
const[equiplist,setEquiplist] = useState([]);
const[selectedEquipment,setSelectedequipment] = useState([])
const[position,setPosition] = useState()

useEffect(()=>{
   getEquipmentlist();
},[])

 const getEquipmentlist = async () => {
  dispatch(await CallGetEquipmentList("all",1,1));
 }

const valueOnchange = (e) => {
      e.preventDefault();
      props?.setContnentdata({
        ...props?.contentdata,
        [e.target.name]: e.target.value,
      })
      setErrors({
        ...errors,
        title:""
     })
} 

const descriptionOnchange = (e) => {
  props?.setContnentdata({
    ...props?.contentdata,
    description: e,
  })
  setErrors({
     ...errors,
     description:""
  })

}

const validation = () => {
      let value = true;
      if(props?.contentdata?.title === ""){
         errors.title = "Enter title";
         value = false;
      }
      if(props?.contentdata?.description === ""){
        errors.description = "Enter description";
        value = false;
     }
     if(selectedEquipment?.length === 0) {
        errors.selected_equipment="Select equipment";
        value=false;
     }
     if(callBackMediaFile?.data?.length === 0 || typeof callBackMediaFile === "undefined"){
        errors.selected_media = "Select media";
        value = false;
     }
      setErrors({
        ...errors,
        title:errors?.title,
        description:errors?.description,
        selected_equipment: errors?.selected_equipment,
        selected_media:errors?.selected_media
     })
     return value;
}

const submitForm = (e) => {
 e.preventDefault();
 if(points?.length > 0) {
    if(validation()){
      let value = {};
      let updatePoints = [];
      points?.forEach((item) => {
        if(item.id === props?.randomId){
          let selectedEqu = selectedEquipment.map((item) => { return item?.key; }).join(",");
          let selectedfile = callBackMediaFile?.data.map((item) => {return item?.id; }).join(",");
          value = {
            ...item,
            title:props?.contentdata?.title,
            description:props?.contentdata?.description,
            selected_equipment:selectedEqu,
            selected_media:selectedfile
         };
         updatePoints.push(value);
        }else{
          updatePoints.push(item);
        }
      })
      dispatch(ShowPoints(updatePoints))
      props?.setShow(false);
      props?.setContnentdata({
        title:"",
        description:""
       })
    }
  }
}

const openEquipmentform =  () => {
 if(points?.length > 0) {
 let getvalue = points?.filter((item)=> (item.id === props?.randomId));
if(getvalue?.length > 0) {
   setSelectedequipment([]); // clear prev selected equipment
  dispatch(setCallBackFileSelect({data:[]})) // clear prev selected media
  showSelectedequiandMedia(getvalue);  // Show selected media and equipment 
  }
 }
 }

 const showSelectedequiandMedia = async (getvalue) => {
  var getSelectedEquipment = getvalue[0]?.selected_equipment?.split(",");
  var getSelectedMedia = getvalue[0]?.selected_media?.split(",");
  // Get equipment list 
 let getlist = equipmentList?.data?.map((item)=>({ key:item?.id,value:item?.equipment_title}));
 if(getvalue[0]?.selected_equipment !== ""){
  let updatedlist = getlist.filter(val => { return !getSelectedEquipment.find((val2)=>{return val.key===val2})});
  setEquiplist(updatedlist)
}else {
  setEquiplist(getlist)
}
  if(getvalue[0]?.selected_equipment !== ""){
    let getEquipment = await Promise.all(getSelectedEquipment?.map(async(item) => {
    let getResponse = await getRequestcall(EQUIPMENT_DETAIL+item,access_token)
    if(getResponse?.status === 200){
     let getSelected = {};
     return getSelected = {
      key: getResponse?.data?.data?.id,
      value:getResponse?.data?.data?.equipment_title 
     } 
   }else if(getResponse?.status === 400){
     return undefined;
   }
   }))
   getEquipment = getEquipment?.filter((item)=>item !== undefined)
   if(getEquipment?.length > 0)
   setSelectedequipment(getEquipment);
  }
  if(getvalue[0]?.selected_media !== ""){
  let getMedia = await Promise.all(getSelectedMedia?.map(async (item) => {
    let getResponse = await getRequestcall(FILE_DETAIL+item,access_token)
    if(getResponse?.status === 200){
      let getSelected = {};
      return getSelected = {
        id: getResponse?.data?.data?.id,
        file_real_name:getResponse?.data?.data?.file_real_name 
     }
    }else if(getResponse?.status === 400) {
       return undefined;
    }
  }))
  getMedia = getMedia?.filter((item)=>item !== undefined)
  if(getMedia?.length > 0)
  dispatch(setCallBackFileSelect({data:getMedia}))
  }
 }

 const getEquipmentdetail = async (id) => {
  
 }

const onSelectEquipment = (e,select,index) => {
  e.preventDefault();
  let getItem = [...selectedEquipment];
  setPosition(index)
  getItem.push(select)
  setSelectedequipment(getItem);
  let getList = equiplist?.filter((item,index) => item?.key !== select?.key)
  setEquiplist(getList);
  setShowlist(false);
  setErrors({
     ...errors,
     selected_equipment:""
  })
}

const removeSelectedequipment = (e,item) => {
  e.stopPropagation();
  e.preventDefault();
  let updateSelected = selectedEquipment?.filter((select)=>select?.key !== item?.key)
  setSelectedequipment(updateSelected);
   // After remove add into the list to previoues position
   let updateEqui = [...equiplist];
   updateEqui.splice(position,0,item);
   setEquiplist(updateEqui);
}

const removeSelectedMedia = (e,item) =>{
  e.stopPropagation();
   e.preventDefault();
   let updateSelected = callBackMediaFile?.data?.filter((select)=>select?.id !== item?.key)
   dispatch(setCallBackFileSelect({data:updateSelected}))
}

const renderSelectedmedia = (media) =>{
  let getList = media?.data?.map((item)=>{
    let media;
    return media = {
     key:item?.id,
     value:item?.file_real_name
   }
  })
  return getList;
}
  
const handleClose = () => {
  console.log("Hide")
   props?.setContnentdata({
    title:"",
    description:""
   })
   props?.setShow(false);
} 

  return (
    <React.Fragment>
    <Offcanvas
    show={props?.show} placement={"end"} onHide={handleClose} onShow={()=>openEquipmentform()} className="equipment-offcanvas">
   <Offcanvas.Header closeButton>
    <Offcanvas.Title>Add Equipment</Offcanvas.Title>
    </Offcanvas.Header>
     <Offcanvas.Body className="pt-0">
     <Form className="pointer-form">
     <Form.Group className="mb-2">
      <Form.Label className="mb-0">Select Equipment</Form.Label>
       <Selectlist
        placeholder={"Select equipment"}
        type="equipment"
        list={equiplist}
        groupItemClick={onSelectEquipment}
        showlist={showlist}
        setShowlist={setShowlist}
        selectedItem={selectedEquipment}
        removeItem={removeSelectedequipment}
      />
      <div>
         <span className="text-danger">{errors?.selected_equipment}</span>
      </div>
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Label className="mb-0">Select Media</Form.Label>
       <Selectlist
        placeholder={"Select media"}
        type="media"
        showlist={showlist}
        setShowlist={setShowlist}
        selectedItem={renderSelectedmedia(callBackMediaFile)}
        removeItem={removeSelectedMedia}
       />
       {
        callBackMediaFile?.data?.length > 0 ? (<></>) : (
          <div><span className="text-danger">{errors?.selected_media}</span></div>
        )
       }
    </Form.Group>

    <Form.Group className="mb-2">
      <InputGroup
       label='Title'
       placeholder='Enter title'
       formClass='mb-2'
       name={"title"}
       onChange={valueOnchange}
       value={props?.contentdata?.title}
       type={"text"}
      />
<span className="text-danger">{errors?.title}</span>
      {/* <Form.Control value={contentdata?.title} onChange={(e)=>valueOnchange(e)} name="title" type="text" placeholder="Enter title" /> */}
    </Form.Group>
    <Form.Group className="mb-2">
     <Texteditor
       name="description"
      placeholder='Enter Description hear...'
      label='Description'
      value={props?.contentdata?.description}
      onChange={(e)=>descriptionOnchange(e)}
      require
     />
       <span className="text-danger">{errors?.description}</span>
   </Form.Group>
    <Button variant="success"  className="save-btn" onClick={(e)=>submitForm(e)}>
        Save
    </Button>
    </Form>
    </Offcanvas.Body>
   </Offcanvas>
   </React.Fragment>
  )

}
