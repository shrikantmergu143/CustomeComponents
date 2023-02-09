/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import { Card, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetLoginAPI } from '../../api/GetLogin';
import { SetCurrentUserLogin, ShowToast } from '../../redux/actions';
import Icon from '../common/component/Icon';

export const validateEmail = (email) => {
    return !email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
export const validatePassword = (password) => {
    let regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(regularExpression.test(password)) {
        return false;
    }
};


export default function LoginPage() {
    const dispatch = useDispatch();
    const [PassType, setPassType] = useState(true)
    const [formData, setFormData] = useState({
        email:"",
        password:"",
        device_type:"web"
    });
    const [errors, setErrors] = useState({
        email:"",
        password:"",
        device_type:"web"
    })
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
        if(formData?.password === ""){
            value = false
            errors.password = "Enter your password"
        }
        setErrors({
            ...errors,
            email:errors?.email,
            password:errors?.password,
        })
        return value;
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(validate()){
            const response = await GetLoginAPI(formData);
            if(response?.status === 200){
                const UserDetails = {
                    ...response?.data?.data?.user,
                    access_token:response?.data?.data?.access_token,
                    password:""
                }
                dispatch(SetCurrentUserLogin(UserDetails))
            }else{
                dispatch(ShowToast({
                    title:"User not found",
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
    <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
            <div className="authentication-inner">
                <Card>
                    <Card.Body>
                        <h4 className="mb-2">Sign In</h4>
                        <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                            <div className="mb-3 form-div">
                                <label htmlFor="email" className="form-label">Email</label>
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
                            <div className="mb-3 form-password-toggle form-div">
                                <label className="form-label" htmlFor="password">Password</label>
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text ">
                                        <Icon className='lock form' />
                                    </span>
                                    <FormControl
                                        type={PassType ? "password" : "text"}
                                        id="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="············"
                                        aria-describedby="password"
                                        onChange={onChangeHandler}
                                        value={formData?.password}
                                    />
                                    <span className="input-group-text cursor-pointer p-0">
                                        <Icon button={true} onClick={function(){setPassType(!PassType)}} className={PassType? 'eye-slash form':'eye form'} rounded={true}  />
                                    </span>
                                </div>
                                <span className='text-danger'>{errors?.password}</span>
                            </div>
                            <p className="text-end">
                                <Link to={"/forgot"}>
                                    <span> Forgot Password</span>
                                </Link>
                            </p>
                            <button type='submit' className="btn btn-primary d-grid w-100">
                            Sign In
                            </button>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    </div>
  )
}
