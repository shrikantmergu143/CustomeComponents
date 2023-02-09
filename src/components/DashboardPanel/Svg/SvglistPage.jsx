/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import IconButton from "../../common/IconButton";
import { useNavigate } from "react-router";
import Button from "../../common/Button";
import { setCallBackFileSelect, ShowModalConfirm, ShowToast } from "../../../redux/actions";
import {useDispatch,useSelector} from "react-redux";
import Nodatafound from "../../common/Nodatafound";
import { ShowPoints } from "../../../redux/actions";
import { PostRequestAPI } from "../../../Api/PostRequest";
import { DESIGN_ADD,DESIGN_DELETE } from "../../../Api/constant";
import { setAddDesign } from "../../../redux/actions";
import { CallGetDesignList } from "../../../redux/actions/utils";
import PaginationPage from "../../common/PaginationPage";

export default function SvglistPage () {

const navigate = useNavigate();
const dispatch = useDispatch();
const {designlist,access_token} = useSelector((state)=>state?.allReducers)

  useEffect(()=>{
     callSvglist(1);
  },[])

  const callSvglist = async (current_page) => {
    dispatch(await CallGetDesignList("all", current_page));
  }

  const navigateEdit = (e,item) => {
    e.preventDefault();
    let data = {
          id:item?.id
    }
    dispatch(setAddDesign(data))
    dispatch(setCallBackFileSelect({data:[]}))
    dispatch(ShowPoints([]))
    navigate(`edit/${item?.id}`);
  }

  const deleteDesign = (e,item) => {
      e.preventDefault();
      dispatch(ShowModalConfirm({
        Title:"Are you Sure?",
        show:true,
        Description:" Are you want to delete svg?",
        id:"",
        callBackModal:()=>callDeletesvg(item?.id),
        ButtonSuccess:"Delete Mode"
    }))
  }

  const callDeletesvg = async (id) => {
    let getDesignid = {
        design_id:id
    }
    const response = await PostRequestAPI(DESIGN_DELETE,getDesignid,access_token);
     if(response?.status === 200) {
        callSvglist(1);
     }
  }

  const designImagechange = async (e) => {
    if(e.target.files[0].type === "image/svg+xml") {
        let formData = new FormData();
        formData.append("file", e.target.files[0]);
        let getResponse  = await PostRequestAPI(DESIGN_ADD,formData,access_token,true);
        if(getResponse?.status === 200){
         dispatch(setAddDesign(getResponse?.data?.data))
         dispatch(setCallBackFileSelect({data:[]}))
         dispatch(ShowPoints([]))
         navigate("add")
        }
    } else {
        dispatch(ShowToast({
            title:"Please upload svg file",
            description:"",
            show:true,
            type:"success",
          }))
    }
 }
 
 const navigateView = (e,item) => {
    e.preventDefault();
    navigate(`/${item?.id}`)
 }

 return (
    <Row>
    <Col className='mt-3'>
        <Card>
            <Card.Header className='  '>
                <Row>
                    <Col sm={12} xl={6} className={"mb-2"} >
                        <div className='left-card'>
                            <h5 className='title'>Design list</h5>
                        </div>
                    </Col>
                    <Col sm={12} xl={6} className={"mb-2"}>
                        <div className='right-card gap-3'>
                        <input
               type="file"
               id="autocad_img"
               style={{ display: "none" }}
               onChange={(e) => designImagechange(e)}
                accept='.svg'
              />
                            <Button onClick={() => document.getElementById("autocad_img").click()} btntype="button--primary btn-sm btn-x-lg">
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body className='pt-0 pb-0'>
                <h5>Result</h5>
            </Card.Body>
            {
                designlist?.data?.length === 0 ? 
                (
                     <Nodatafound title={"No svg found please add"}></Nodatafound>
                ):(
                    <div className="table-responsive fade show">
                    <table className="table table-responsive-sm table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No</th>
                                <th scope="col">Title</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                designlist?.data?.map((item,index)=> (
                                    <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{item?.design_title}</td>
                                    <td className='gap-2'>
                                        <IconButton icon='eye' onClick={(e)=>navigateView(e,item)}/>
                                        <IconButton icon='edit' onClick={(e)=>navigateEdit(e,item)}/>
                                        <IconButton icon='trash'  onClick={(e)=>deleteDesign(e,item)}/>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                )
            }
        </Card>
         <PaginationPage 
           handleChange={callSvglist}
           nopagination={false}
           pagination={designlist?.pagination}
           data={designlist?.data}
         />
    </Col>
</Row>
 )

}
