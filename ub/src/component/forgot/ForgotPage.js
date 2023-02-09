/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import { Card, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetLoginAPI } from '../../api/GetLogin';
import { PostSendotpAPI } from '../../api/PostRequest';
import { SetCurrentUserLogin, ShowToast } from '../../redux/actions';
import Icon from '../common/component/Icon';
import { useNavigate } from 'react-router';

export default function ForgotPage() {
    const dispatch = useDispatch();
    const [PassType, setPassType] = useState(true)
    const [formData, setFormData] = useState({
        email:"",
        name:"",
        is_forgot:1
    });
    const [errors, setErrors] = useState({
        email:"",
        name:"",
    });
    const navigate = useNavigate()
    const onChangeHandler = (e) =>{
        setFormData((data)=>({...data, [e?.target?.name]:e.target.value}))
        setErrors({...errors, [e?.target?.name]:""})
    }
    const validate = () =>{
        let value = true;
        if(formData?.email === ""){
            value = false;
            errors.email = "Enter your email"
        }
        if(formData?.name === ""){
            value = false
            errors.name = "Enter your name"
        }
        setErrors({
            ...errors,
            email:errors?.email,
            name:errors?.name,
        })
        return value;
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(validate()){
            const response = await PostSendotpAPI(formData);
            console.log(response);
            if(response?.status === 200){
                navigate('/reset-password',{state:{type:'reset-password', formData:formData}})
                dispatch(ShowToast({
                    description:response?.data?.msg,
                    type:"success",
                }))
            }else{
                dispatch(ShowToast({
                    description:"Unable to send otp",
                    type:"success",
                }))
            }
        }
    }
  return (
    <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
            <div className="authentication-inner">
                <Card>
                    <Card.Body>
                        <h4 className="mb-2">Forgot Password</h4>
                        <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                            <div className="mb-3 form-div">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <div className="input-group input-group-merge">
                                    <FormControl
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        onChange={onChangeHandler}
                                        value={formData?.name}
                                    />
                                </div>
                                <span className='text-danger'>{errors?.name}</span>
                            </div>
                            <div className="mb-3 form-div">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text">
                                        <Icon className='email form' />
                                    </span>
                                    <FormControl
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        onChange={onChangeHandler}
                                        value={formData?.email}
                                    />
                                </div>
                                <span className='text-danger'>{errors?.email}</span>
                            </div>
                            <button type='submit' className="btn btn-primary d-grid w-100">
                                Reset Password
                            </button>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    </div>
  )
}