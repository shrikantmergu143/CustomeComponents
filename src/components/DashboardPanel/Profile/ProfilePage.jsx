/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router'
import { CHANGE_PASSWORD, PROFILE_UPDATE, USER_GET } from '../../../Api/constant'
import { getRequestcall } from '../../../Api/GetRequest'
import { PostRequestAPI } from '../../../Api/PostRequest'
import { setCallLogout, setUpdateGetProfile, ShowToast } from '../../../redux/actions'
import Button from '../../common/Button'
import IconButton from '../../common/IconButton'
import InputGroup from '../../common/InputGroup'
import Select from '../../common/Select'
import { checkPasswordValidity, validateEmail } from '../../LoginScreen/LoginPage'

export default function ProfilePage() {
    // const navigate = useNavigate();
    // const { state } = useLocation();
    // const  type = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const access_token = useSelector((state)=>state?.allReducers?.access_token);
    const currentUser = useSelector((state)=>state?.allReducers?.currentUser);
    const dispatch = useDispatch();
    const [UpdateState, setUpdateState] = useState(true)
    const [PassType, setPassType] = useState(true)
    const [PassType2, setPassType2] = useState(true)
    const [PassType3, setPassType3] = useState(true)
    const [formData, setFormData] = useState({
        name:currentUser?.name,
        email:currentUser?.email,
        new_password:"",
        confirm_password:"",
        old_password:"",
    });
    const [errors, setErrors] = useState({
        name:"",
        email:"",
        password:"",
        confirm_password:"",
        old_password:"",
    });
    useEffect(()=>{
        callUserProfile()
    },[])
    const callUserProfile =async () =>{
        const response = await getRequestcall(USER_GET, access_token);
        if(response?.status === 200){
            dispatch(setUpdateGetProfile(response?.data?.data));
            setFormData({
                ...formData,
                name:response?.data?.data?.name,
                email:response?.data?.data?.email,
            })
        }else if(response?.status === 403){
            dispatch(setCallLogout());
        }
    }
    const validation = () =>{
        let val = true;
        if(formData?.name === ""){
            val = false;
            errors.name = "Enter name"
        }
        if(validateEmail(formData?.email)){
            val = false;
            errors.email = "Enter valid email"
        }
        if(formData?.email === ""){
            val = false;
            errors.email = "Enter email"
        }
        
        setErrors({
            name:errors?.name,
            email:errors?.email,
        });
        return val;
    }
    const validate = () =>{
        let value = true;
        if(formData?.old_password === formData?.new_password){
            value = false
            errors.new_password = "New and old password can not be same"
        }
        if(formData?.new_password !== formData?.confirm_password){
            value = false
            errors.confirm_password = "New password and confirmation password do not match"
        }
        if(checkPasswordValidity(formData?.new_password)){
            value = false
            errors.new_password = checkPasswordValidity(formData?.new_password)
        }
        if(formData?.new_password === ""){
            value = false
            errors.new_password = "Enter new password"
        }
        if(formData?.confirm_password === ""){
            value = false
            errors.confirm_password = "Enter confirm password"
        }
        if(formData?.old_password === ""){
            value = false
            errors.old_password = "Enter your old password"
        }
        setErrors({
            ...errors,
            new_password:errors?.new_password,
            confirm_password:errors?.confirm_password,
            old_password:errors?.old_password,
        })
        return value;
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
        if(e.target.name === "email"){
            if(e.target.value !== currentUser?.email || formData?.name !== currentUser?.name){
                setUpdateState(false)
            }else{
                setUpdateState(true)
            }
        }else if(e.target.name === "name"){
            if(e.target.value !== currentUser?.name || formData?.email !== currentUser?.email){
                setUpdateState(false)
            }else{
                setUpdateState(true)
            }
        }
    }
    const UpdateProfilePayload = () =>{
        let payload = {};
        if(formData?.email !== currentUser?.email){
            payload.email = formData?.email
        }
        if(formData?.name !== currentUser?.name){
            payload.name = formData?.name
        }
        return payload;
    }
    // console.log("data", type)
    const onHandleSubmit = async (e) =>{
        e.preventDefault();
        if(validation() && !UpdateState ){
            const payload = UpdateProfilePayload();
                const response = await PostRequestAPI(PROFILE_UPDATE, payload, access_token);
                if(response?.status === 200){
                    dispatch(ShowToast({
                        description:"Profile successfully updated",
                        show:true,
                        type:"success"
                    }))
                    dispatch(setUpdateGetProfile(response?.data?.data));
                    setFormData({
                        ...formData,
                        name:response?.data?.data?.name,
                        email:response?.data?.data?.email,
                    })
                    setUpdateState(true)
                }else if(response?.status === 403){
                    dispatch(setCallLogout());
                }else{
                    dispatch(ShowToast({
                        description:"Anable to update profile",
                        show:true,
                        type:"info"
                    }))
                }
        }
    }
    const handleUpdate = async (e) =>{
        e.preventDefault();
        if(validate()){
            const payload = {
                old_password:formData?.old_password,
                new_password:formData?.new_password,
            }
            const response = await PostRequestAPI(CHANGE_PASSWORD , payload, access_token);
            if(response?.status === 200){
                dispatch(ShowToast({
                    description:"Password has been changed successfully",
                    show:true,
                    type:"success",
                }));
                setFormData({
                    ...formData,
                    new_password:"",
                    confirm_password:"",
                    old_password:"",
                });
            }else if(response?.status === 403){
                dispatch(setCallLogout());
            }else{
                setErrors({
                    ...errors,
                    new_password:"",
                    confirm_password:"",
                    old_password:response?.data?.error,
                })
            }
        }
    }
  return (
    <Row>
        <Col className='mt-3 mb-3'>
            <Card>
                <Card.Header className=''>
                    <Row>
                        <Col sm={12} xl={6} className={"mb-2"} >
                            <div className='left-card'>
                                <h5 className='title'>Profile</h5>
                            </div>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className='pt-0 pb-0'>
                    <Form className='row ' onSubmit={onHandleSubmit}>
                        <Col className='col-12' md={6}>
                            <InputGroup
                                name="name"
                                placeholder='Enter name'
                                label='Name'
                                value={formData?.name}
                                onChange={handleChange}
                                require
                                errors={errors?.name}
                            />
                        </Col>
                        <Col className='col-12' md={6}>
                            <InputGroup
                                name="email"
                                placeholder='Enter email address'
                                onChange={handleChange}
                                value={formData?.email}
                                label='Email Address'
                                errors={errors?.email}
                                require
                            />
                        </Col>
                        <Col className='col-12 mb-2 d-flex justify-content-end  mt-1'>
                            <Button disabled={UpdateState} type='submit' className={"button--primary mt-0 btn-sm text-capitalize"}>
                                update profile
                            </Button>
                        </Col>
                    </Form>
                    <hr/>
                    <h5>Change Password</h5>
                    <Form className='row mb-3' onSubmit={handleUpdate}>
                        <Col className='col-12' md={6}>
                            <InputGroup
                                leftIcon='icon_password'
                                placeholder='Enter old password'
                                label='Old Password'
                                rightButton
                                name='old_password'
                                rightIcon={PassType?'eyeslash':'eye'}
                                type={PassType?'password':'text'}
                                rightClick={()=>setPassType(!PassType)}
                                onChange={handleChange}
                                value={formData?.old_password}
                                errors={errors?.old_password}
                            />
                        </Col>
                        <Col className='col-12' md={6}>
                            <InputGroup
                                leftIcon='icon_password'
                                placeholder='Enter new password'
                                label='New Password'
                                rightButton
                                name='new_password'
                                rightIcon={PassType2?'eyeslash':'eye'}
                                type={PassType2?'password':'text'}
                                rightClick={()=>setPassType2(!PassType2)}
                                onChange={handleChange}
                                value={formData?.new_password}
                                errors={errors?.new_password}
                            />
                        </Col>
                        <Col className='col-12' md={6}>
                            <InputGroup
                                leftIcon='icon_password'
                                placeholder='Enter confirm password'
                                label='Confirm Password'
                                rightButton
                                rightIcon={PassType3?'eyeslash':'eye'}
                                name='confirm_password'
                                type={PassType3?'password':'text'}
                                rightClick={()=>setPassType3(!PassType3)}
                                onChange={handleChange}
                                value={formData?.confirm_password}
                                errors={errors?.confirm_password}
                            />
                        </Col>
                        <Col className='col-12 mb-2 d-flex justify-content-end  mt-1'>
                            <Button type='submit' className={"button--primary mt-0 btn-sm text-capitalize"}>
                                Change Password
                            </Button>
                        </Col>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}
