/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import Button from '../common/Button'
import CheckBox from '../common/CheckBox'
import InputGroup from '../common/InputGroup'
import Icon from "../common/Icon";
import { useDispatch } from 'react-redux';
import { SetStoreCurrentUserLogin, ShowToast } from '../../redux/actions';
import { Link, useNavigate } from 'react-router-dom';
import { PostRequestAPI } from '../../Api/PostRequest';
import { ADMIN_LOGIN, USER_LOGIN } from '../../Api/constant';
import LogoImages from "./../../assets/img/323logo.png";

export const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain Whitespaces.";
    }
  
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Password must have at least one Uppercase Character.";
    }
  
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Password must have at least one Lowercase Character.";
    }
  
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one Digit.";
    }
  
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
      return "Password must contain at least one Special Symbol.";
    }
  
    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 8-16 Characters Long.";
    }
    return null;
}
export const validateEmail = (email) => {
    return !email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
export default function LoginPage(props) {
    const {  type  } = props;
    const isadmin = type === "admin"?true:false;
    const [PassType, setPassType] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email:"",
        password:"",
        remember:false
    });
    const [errors, setErrors] = useState({
        email:"",
        password:"",
    });
    const validation = () =>{
        let value = true;
        if(validateEmail(formData?.email)){
            value = false;
            errors.email = "Enter valid email";
        }
        if(checkPasswordValidity(formData?.password)){
            value = false;
            errors.password = checkPasswordValidity(formData?.password);
        }
        if(formData?.email === ""){
            value = false;
            errors.email = "Enter email";
        }
        if(formData?.password === ""){
            value = false;
            errors.password = "Enter password";
        }
        setErrors({
            email:errors.email ,
            password:errors.password ,
        });
        return value;
    }
    const onChangeHandler = (e) =>{
        setFormData((data)=>({...data, [e?.target?.name]:e.target.value}))
        setErrors({...errors, [e?.target?.name]:""})
    }
    const onChecked = (e) =>{
        setFormData((data)=>({...data, remember:e.target.checked}))
    }
    const getPayload =()=> {
        const payload = {device_type:"web"}
        if(formData?.email){
            payload.email = formData?.email
        }
        if(formData?.password){
            payload.password = formData?.password
        }
        return payload;
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(validation()){
            const payload = getPayload();
            const response = await PostRequestAPI( isadmin? ADMIN_LOGIN:USER_LOGIN, payload);
            if(response?.status === 200){
                const access_token = response?.data?.data?.access_token
                const currentUser = {
                    ...response?.data?.data?.user,
                    access_token:access_token
                }
                if(formData?.remember){
                    dispatch(SetStoreCurrentUserLogin({
                        loginData:formData,
                        currentUser:currentUser,
                        access_token:access_token,
                        usertype:type,
                        isadmin:isadmin
                    }))
                }else{
                    dispatch(SetStoreCurrentUserLogin({
                        loginData:errors,
                        currentUser:currentUser,
                        access_token:access_token,
                        usertype:type,
                        isadmin:isadmin
                    }))
                }
                navigate("/dashboard")
            }else{
                dispatch(ShowToast({
                    title:"Invalid credentials ",
                    description:"User details not found",
                    show:true,
                    type:"error",
                }));
            }
        }
    }

  return (
    <div className="page-wrapper">
        <main className="page-auth">
            <div className="page-auth__center login">
                <div className="auth-card card">
                    <div className="card__wrapper">
                        <form className="auth-card__center" onSubmit={handleSubmit}>
                            <div className="auth-card__top">
                                <div className='logo-brand mb-3'>
                                    <img alt='' src={LogoImages} />
                                </div>
                                {isadmin && <h1 className="auth-card__title">Welcome to <span className="text-theme">Admin Panel</span></h1>}
                                <p className="auth-card__text">Welcome Back, Please login
                                    <br/>to your account.</p>
                            </div>
                            <div className="auth-card__body">
                                <InputGroup
                                    leftIcon='userform'
                                    placeholder='Enter email'
                                    name={"email"}
                                    type={"text"}
                                    onChange={onChangeHandler}
                                    value={formData?.email}
                                    errors={errors?.email}
                                />
                                <InputGroup
                                    leftIcon='icon_password'
                                    placeholder='Enter password'
                                    type={PassType?"password":"text"}
                                    name={"password"}
                                    onChange={onChangeHandler}
                                    value={formData?.password}
                                    errors={errors?.password}
                                    rightIcon={PassType?"eyeslash":"eye"}
                                    rightButton={true}
                                    rightClick={()=>setPassType(!PassType)}
                                />
                                <div className="row align-items-center">
                                    <div className="col">
                                        <div className="form-group">
                                            <div className="input-group input-group--prepend">
                                                <CheckBox onChange={onChecked} checked={formData?.remember} label="Remember Me"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="form-group">
                                            <Link to="/forgot" className="text-blue" href="auth-forgot.html">Forgot Password?</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="auth-card__bottom">
                                <div className="auth-card__buttons">
                                    {/* <div className="auth-card__button">
                                        <a className="button button--secondary button--block" href="auth-create.html"><span className="button__text">Sign Up</span></a>
                                        <Button type={"button--secondary"}>
                                            Login
                                        </Button>
                                    </div> */}
                                    <div className="auth-card__button">
                                        <Button  block={true} type={"submit"} btntype={"button--primary"}>
                                            Login
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}