/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { GetUserProfileAPI } from '../../../api/GetRequest';
import {  useDispatch, useSelector  } from "react-redux";
import { Col, FormControl, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Icon from '../../common/component/Icon';
import { PostChangePasswordAPI, PostUpdateProfileAPI } from '../../../api/PostRequest';
import { SetCurrentUserLogin, ShowToast } from '../../../redux/actions';
import { checkPasswordValidity } from '../../resetpassword/ResetpasswordPage';

export default function ProfilePage() {
    const { access_token } = useSelector((state)=>state?.allReducers);
    const [PassType, setPassType] = useState(true)
    const [PassType2, setPassType2] = useState(true)
    const [PassType3, setPassType3] = useState(true)
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        address:"",
        age:"",
        hobbies:"",
        interests:"",
        position:"",
        profession:"",
        old_password:"",
        new_password:'',
        confirm_password:""
    });
    const [errors, setErrors] = useState({
        name:"",
        email:"",
        address:"",
        age:"",
        hobbies:"",
        interests:"",
        position:"",
        profession:"",
        old_password:"",
        new_password:'',
        confirm_password:""
    });
    const dispatch = useDispatch()
    useEffect(()=>{
        CallUserProfile();
    },[])

    const CallUserProfile = async () => {
        const response = await GetUserProfileAPI(access_token);
        if(response?.status === 200){
            setFormData({
                ...response?.data?.data,
                old_password:"",
                new_password:'',
                confirm_password:""
            })
        }else{
            if(response?.response?.status === 403){
                dispatch(SetCurrentUserLogin({access_token:""}))
            }
        }
    }
    const onChangeHandler = (e) =>{
        switch(e?.target?.type){
            case "number":
                if(parseInt(e.target.value) === 0){
                    setFormData((data)=>({...data, [e?.target?.name]:""}))
                    setErrors({...errors, [e?.target?.name]:""})
                }else if(e.target.value <= 110){
                    setFormData((data)=>({...data, [e?.target?.name]:e.target.value}))
                    setErrors({...errors, [e?.target?.name]:""})
                }
                break;
            default:
                setFormData((data)=>({...data, [e?.target?.name]:e.target.value}))
                setErrors({...errors, [e?.target?.name]:""})
                break;
        }
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
    const UpdatePayload = () =>{
        const payload = {}
        if(formData?.address!==""){
            payload.address = formData?.address
        }
        if(formData?.age!==""){
            payload.age = formData?.age
        }
        if(formData?.hobbies!==""){
            payload.hobbies = formData?.hobbies
        }
        if(formData?.interests!==""){
            payload.interests = formData?.interests
        }
        if(formData?.position!==""){
            payload.position = formData?.position
        }
        if(formData?.profession!==""){
            payload.profession = formData?.profession
        }
        return payload;
    }
    const OnSubmitHandler = async (e) =>{
        e.preventDefault();
        const payload = UpdatePayload();
        const response = await PostUpdateProfileAPI(payload, access_token);
        if(response?.status === 200){
            setFormData({
                ...response?.data?.data
            })
        }else{
            if(response?.response?.status === 403){
                dispatch(SetCurrentUserLogin({access_token:""}))
            }
        }
    }
    const SubmitUpdatePassword = async (e) => {
        e.preventDefault();
        if(validate()){
            const payload = {
                new_password:formData?.new_password,
                old_password:formData?.old_password,
            };
            const response = await PostChangePasswordAPI(payload, access_token);
            if(response?.status === 200){
                dispatch(ShowToast({
                    description:response?.data?.msg,
                    type:"success",
                }));
                setFormData({
                    ...formData,
                    old_password:"",
                    new_password:'',
                    confirm_password:""
                })
            }else{
                dispatch(ShowToast({
                    description:response?.response?.data?.error,
                    type:"error",
                }))
                if(response?.response?.status === 403){
                    dispatch(SetCurrentUserLogin({access_token:""}))
                }
            }
        }
    }
  return (
    <React.Fragment>
        <div className='container-fluid page-outlet'>
            <div className="card">
                <div className="card-body  ">
                    <Row>
                        <Col >
                            <h5>Profile </h5>
                        </Col>
                        <Col >
                            <div className='breadcrumb'>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={"dashboard"}>
                                            <Icon    className={"home"} />
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active"> Profile</li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <form id="formAuthentication" className="mb-4 row" onSubmit={OnSubmitHandler}>
                        <Col className='col-sm-6 mb-3 form-div'>
                            <label htmlFor="name" className="form-label">Name</label>
                            <FormControl
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                value={formData?.name}
                                onChange={onChangeHandler}
                                disabled
                            />
                        </Col>
                        <Col className='col-sm-6 mb-3 form-div'>
                            <label htmlFor="email" className="form-label">Email</label>
                            <FormControl
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData?.email}
                                onChange={onChangeHandler}
                                disabled
                            />
                        </Col>
                        <Col className='col-sm-6 mb-3 form-div'>
                            <label htmlFor="address" className="form-label">Address</label>
                            <FormControl
                                type="text"
                                onChange={onChangeHandler}
                                id="address"
                                name="address"
                                placeholder="Enter address"
                                value={formData?.address}
                            />
                        </Col>
                        <Col className='col-sm-6 mb-3 form-div'>
                            <label htmlFor="age" className="form-label">Age</label>
                            <FormControl
                                type="number"
                                onChange={onChangeHandler}
                                id="age"
                                name="age"
                                placeholder="Enter age"
                                value={formData?.age}
                                onWheel={e=>e.target.blur()}
                            />
                        </Col>
                        <Col className='col-sm-6 mb-3 form-div'>
                            <label htmlFor="hobbies" className="form-label">Hobbies</label>
                            <FormControl
                                type="text"
                                onChange={onChangeHandler}
                                id="hobbies"
                                name="hobbies"
                                placeholder="Enter hobbies"
                                value={formData?.hobbies}
                            />
                        </Col>
                        <Col className='col-sm-6 mb-3 form-div'>
                            <label htmlFor="interests" className="form-label">Interests</label>
                            <FormControl
                                type="text"
                                id="interests"
                                name="interests"
                                placeholder="Enter interests"
                                onChange={onChangeHandler}
                                value={formData?.interests}
                            />
                        </Col>
                        <Col className='col-sm-6 mb-3 form-div'>
                            <label htmlFor="position" className="form-label">Position</label>
                            <FormControl
                                type="text"
                                id="position"
                                name="position"
                                placeholder="Enter position"
                                onChange={onChangeHandler}
                                value={formData?.position}
                            />
                        </Col>
                        <Col className='col-sm-6 mb-3 form-div'>
                            <label htmlFor="profession" className="form-label">Profession</label>
                            <FormControl
                                type="text"
                                id="profession"
                                name="profession"
                                placeholder="Enter profession"
                                onChange={onChangeHandler}
                                value={formData?.profession}
                            />
                        </Col>
                        <div className='ml-auto d-flex'>
                            <button type={"submit"} className='ml-auto btn btn-primary'>
                                Update Profile
                            </button>
                        </div>
                    </form>
                    <hr/>
                    <h5>Change Password </h5>
                    <form id="formAuthentication1" className="mb-3 row" onSubmit={SubmitUpdatePassword}>
                        <Col className='col-sm-6 mb-3 form-div'>
                            <div className="form-password-toggle form-div">
                                <label className="form-label" htmlFor="old_password">Old Password</label>
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text ">
                                        <Icon className='lock form' />
                                    </span>
                                    <FormControl
                                        type={PassType ? "password" : "text"}
                                        id="old_password"
                                        className="form-control"
                                        name="old_password"
                                        placeholder="Old Password"
                                        aria-describedby="old_password"
                                        onChange={onChangeHandler}
                                        value={formData?.old_password}
                                    />
                                    <span className="input-group-text cursor-pointer p-0">
                                        <Icon button={true} onClick={function(){setPassType(!PassType)}} className={PassType? 'eye-slash form':'eye form'} rounded={true}  />
                                    </span>
                                </div>
                                <span className='text-danger'>{errors?.old_password}</span>
                            </div>
                        </Col>
                        <Col className='col-sm-6 mb-3 form-div'>
                            <div className="form-password-toggle form-div">
                                <label className="form-label" htmlFor="new_password">New Password</label>
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text ">
                                        <Icon className='lock form' />
                                    </span>
                                    <FormControl
                                        type={PassType2 ? "password" : "text"}
                                        id="new_password"
                                        className="form-control"
                                        name="new_password"
                                        placeholder="Enter new password"
                                        aria-describedby="new_password"
                                        onChange={onChangeHandler}
                                        value={formData?.new_password}
                                    />
                                    <span className="input-group-text cursor-pointer p-0">
                                        <Icon button={true} onClick={function(){setPassType2(!PassType2)}} className={PassType2? 'eye-slash form':'eye form'} rounded={true}  />
                                    </span>
                                </div>
                                <span className='text-danger'>{errors?.new_password}</span>
                            </div>
                        </Col>
                        <Col className='col-sm-6 mb-3 form-div'>
                            <div className="form-password-toggle form-div">
                                <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text ">
                                        <Icon className='lock form' />
                                    </span>
                                    <FormControl
                                        type={PassType3 ? "password" : "text"}
                                        id="confirm_password"
                                        className="form-control"
                                        name="confirm_password"
                                        placeholder="Enter confirm password"
                                        aria-describedby="confirm_password"
                                        onChange={onChangeHandler}
                                        value={formData?.confirm_password}
                                    />
                                    <span className="input-group-text cursor-pointer p-0">
                                        <Icon button={true} onClick={function(){setPassType3(!PassType3)}} className={PassType3? 'eye-slash form':'eye form'} rounded={true}  />
                                    </span>
                                </div>
                                <span className='text-danger'>{errors?.confirm_password}</span>
                            </div>
                        </Col>
                        <div className='ml-auto d-flex'>
                            <button type={"submit"} className='ml-auto btn btn-primary'>
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}
