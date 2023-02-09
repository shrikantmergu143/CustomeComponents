/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Button from '../../common/Button'
import Icon from '../../common/Icon'
import IconButton from '../../common/IconButton'
import InputGroup from '../../common/InputGroup'
import Texteditor from '../../common/TextEditor'
import CardItem from './CardItem';
import { Link, useLocation } from 'react-router-dom'
import { PostRequestAPI } from '../../../Api/PostRequest'
import { EQUIPMENT_ADD, EQUIPMENT_UPDATE } from '../../../Api/constant'

const Breadcrumb = (props) =>{
    return(
        <Row className={"m-0"}>
            <Col className='col-6 page-title'>
                <h4 className=" title text-capitalize breadcrumb-title">{props?.title}</h4>
            </Col>
            <Col className='col-6 page-title' >
                <div className='breadcrumb'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/dashboard"}>
                                <Icon className={"home"} />
                            </Link>
                        </li>
                        <li className="breadcrumb-item active text-capitalize">
                            <Link to={`/equipment`}>
                                equipment
                            </Link>
                        </li>
                        <li className="breadcrumb-item active text-capitalize">
                        {props?.breadcrumb}
                        </li>
                    </ol>
                </div>
            </Col>
        </Row>
    )
}

export default function AddEquipmentPage(props) {
    const equipmentList =  useSelector((state)=>state?.allReducers?.equipment);
    const access_token =  useSelector((state)=>state?.allReducers?.access_token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const  id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1).toString();

    const [formData, setFormData] = useState({
        equipment_title:"",
        equipment_description:"",
        equipment_meta:[],
        is_active:1,
        key:"",
        value:""
    });
    const [errors, setErrors] = useState({
        equipment_title:"",
        equipment_description:"",
        key:"",
        value:""
    });
    useEffect(()=>{
        if(props?.breadcrumb ==="add"){

        }else if(props?.breadcrumb === "update" && state?.item){
            callEditDetails()
        }else if(state?.item === undefined && props?.breadcrumb === "update" ){
            navigate("/equipment")
        }

    }, []);
    const callEditDetails = () =>{
        setFormData({
            ...state?.item,
            equipment_meta:state?.item?.equipment_meta?state?.item?.equipment_meta:[],
            is_active:state?.item?.is_active?1:0,
            key:"",
            value:""
        })
    }

    const validation = () =>{
        let val = true;
        if(formData?.equipment_title === ""){
            errors.equipment_title = "Enter title"
            val = false;
        }
        if(formData?.equipment_description === ""){
            val = false;
            errors.equipment_description = "Enter description"
        }
        setErrors({
            equipment_title:errors?.equipment_title,
            equipment_description:errors?.equipment_description,
        });
        return val;
    }

    const handleChange = ( e ) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        })
        setErrors({
            ...errors,
            [e.target.name]:"",
        })
    }
    const handleEditorChange = (e) =>{
        setFormData((state)=>({...state,equipment_description:e }))
        setErrors((state)=>({...state,equipment_description:"" }))
    }
    const UpdateStatePayload = () =>{
        const payload = {}
        if(formData?.equipment_title){
            payload.equipment_title = formData?.equipment_title;
        }
        if(formData?.equipment_description){
            payload.equipment_description = formData?.equipment_description;
        }
        if(formData?.equipment_meta){
            payload.equipment_meta = JSON.stringify(formData?.equipment_meta);
        }
        if(formData?.is_active){
            payload.is_active = formData?.is_active;
        }
        return payload
    }
    // console.log("data", type)
    const onHandleSubmit = async (e) =>{
        e.preventDefault();
        if(validation() ){
            if(props?.breadcrumb === "update"){
                const payload = UpdateStatePayload();
                payload.equipment_id = id;
                const response = await PostRequestAPI(EQUIPMENT_UPDATE, payload, access_token);
                navigate('/equipment')
                // dispatch(SetUpdateEquipments(payload));
            }else{
                const payload = UpdateStatePayload();
                const response = await PostRequestAPI(EQUIPMENT_ADD, payload, access_token);
                navigate('/equipment')
                // dispatch(SetAddNewEquipments(payload));
            }
        }
    }
    const validateItems = ( ) =>{
        let val = true;
        if(formData?.key === ""){
            val = false;
            errors.key = "Enter key"
        }
        if(formData?.value === ""){
            val = false;
            errors.value = "Enter value"
        }
        setErrors({
            ...errors,
            key:errors?.key,
            value:errors?.value,
        });
        return val;
    }
    const CallAddItems = ()=>{
        if(validateItems()){
            const Data = formData?.equipment_meta?.length === 0 ?[]:formData?.equipment_meta
            Data?.push({
                key:formData?.key,
                value:formData?.value
            });
            console.log("Data", Data)
            setFormData((state)=>({
                ...state,
                equipment_meta:Data,
                key:"",
                value:""
            }));
        }
    }
    const onDelete = (e)=>{
            setFormData((state)=>({
                ...state,
                equipment_meta:formData?.equipment_meta?.filter((item, index)=>index !== e)
            }))
    }

  return (
    <Row>
        <Col className='mt-3 mb-3 '>
            <Card className='overflow'>
                <Card.Header className=''>
                    <Breadcrumb title={props?.title} breadcrumb={props?.breadcrumb} />
                </Card.Header>
                <Card.Body className='pt-0'>
                    <Form className='row ' onSubmit={onHandleSubmit}>
                        <Col className='col-12'>
                            <InputGroup
                                name="equipment_title"
                                placeholder='Enter Title'
                                label='Title'
                                value={formData?.equipment_title}
                                onChange={handleChange}
                                require
                                errors={errors?.equipment_title}
                            />
                        </Col>
                        <Col className='col-12 mb-3'>
                            <Texteditor
                                name="equipment_description"
                                placeholder='Enter Description hear...'
                                onChange={handleEditorChange}
                                value={formData?.equipment_description}
                                label='Description'
                                errors={errors?.equipment_description}
                                require
                            />
                        </Col>
                        
                        <Row className='m-0'>
                            <div className='d-flex align-items-end gap-3 mb-3 px-4'>
                                <InputGroup
                                    name="key"
                                    placeholder='Enter Key'
                                    label='Key'
                                    formClass={"mb-0 w-auto"}
                                    onChange={handleChange}
                                    showTextError={false}
                                    errors={errors.key}
                                    value={formData.key}
                                />
                                <InputGroup
                                    name="value"
                                    placeholder='Enter Value'
                                    label='Value'
                                    formClass={"mb-0 w-auto"}
                                    onChange={handleChange}
                                    errors={errors.value}
                                    showTextError={false}
                                    value={formData.value}
                                />
                                <div className='action-item ml-2 w-auto'>
                                    <IconButton
                                        icon="plus"
                                        className={"primary "}
                                        onClick={CallAddItems}
                                    />
                                </div>
                            </div>
                            {formData?.equipment_meta?.map((item, index)=>(
                                <div className='w-auto' key={index.toString()}>
                                    <CardItem data={formData?.equipment_meta} key={index?.toString()} onDelete={onDelete} item={item} index={index} />
                                </div>
                            ))}
                        </Row>
                        <Col className='col-12 mb-4 d-flex justify-content-end  mt-3'>
                            <Button type='submit' block={false} className={"button--primary mt-0 btn-sm text-capitalize "}>
                                {props?.title}
                            </Button>
                        </Col>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}
