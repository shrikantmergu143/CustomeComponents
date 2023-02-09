/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import { Alert, Card, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetLoginAPI } from '../../api/GetLogin';
import { PostResetForgotPasswordAPI, PostSendotpAPI } from '../../api/PostRequest';
import { SetCurrentUserLogin, ShowToast } from '../../redux/actions';
import Icon from '../common/component/Icon';
import { useLocation, useNavigate } from 'react-router';
import { validatePassword } from '../login/LoginPage';

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
const CheckOTP = (value) =>{
    const regex_four_digit = /^\d{4}$/;
    if(!regex_four_digit.test(value))
    return "OTP must be 4 digit number";
    return null;

}
  
export default function ResetpasswordPage() {
    const dispatch = useDispatch();
    const [PassType, setPassType] = useState(true)
    const [formData, setFormData] = useState({
        email:"",
        new_password:"",
        otp:""
    });
    const [errors, setErrors] = useState({
        email:"",
        new_password:"",
        otp:""
    });
    const [showAlert, SetShowAlert] = useState(false)
    const { state } = useLocation();

    useEffect(()=>{
        if(state?.formData){
            setFormData({
                ...formData,
                email:state?.formData?.email
            })
        }else{
            SetShowAlert(true);
        }
    },[state]);

    console.log("state", state)
    const navigate = useNavigate();
    const onChangeHandler = (e) =>{
        switch(e?.target?.type){
            case "number":
                if(e.target.value <=9999){
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
        if(formData?.email === ""){
            value = false;
            errors.email = "Enter your email"
        }
        if(checkPasswordValidity(formData?.new_password)){
            value = false
            errors.new_password = checkPasswordValidity(formData?.new_password)
        }
        if(formData?.new_password === ""){
            value = false
            errors.new_password = "Enter your password"
        }
        if(CheckOTP(formData?.otp)){
            value = false
            errors.otp = CheckOTP(formData?.otp);
        }
        if(formData?.otp === ""){
            value = false
            errors.otp = "Enter otp"
        }
        setErrors({
            ...errors,
            email:errors?.email,
            new_password:errors?.new_password,
            otp:errors?.otp,
        })
        return value;
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(validate()){
            const response = await PostResetForgotPasswordAPI(formData);
            if(response?.status === 200){
                navigate("/login")
                dispatch(ShowToast({
                    description:response?.data?.msg,
                    type:"success",
                }))
            }else{
                SetShowAlert(true)
                dispatch(ShowToast({
                    description:response?.response?.data?.error,
                    type:"error",
                }))
                if(response?.response?.status === 403){
                    dispatch(SetCurrentUserLogin({access_token:""}));
                }
            }
        }
    }
    const CallCheckResendOTP = async () =>{
        if(state?.type === "reset-password"){
            const payload = {
                name:state?.formData?.name,
                email: formData?.email,
                is_forgot: 1,
            }
           
            const response = await PostSendotpAPI(payload);
            if(response?.status === 200){
                dispatch(ShowToast({
                    description:response?.data?.msg,
                    type:"success",
                }));
                setFormData({
                    email:state?.formData?.email,
                    new_password:"",
                    otp:""
                })
            }else{
                dispatch(ShowToast({
                    description:"Unable to send otp",
                    type:"success",
                }))
            }
        }else{
            navigate("forgot")
        }
    }
    const ResentOTP = ({show}) => {
        return (
            <div hidden={!show}>
                <span> Do you want to resend OTP?</span>
                <a href className='pr-color cursor-pointer' onClick={()=>CallCheckResendOTP()} > Click here</a>
            </div>
        )
    }
  return (
    <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
            <div className="authentication-inner">
                <Card>
                    <Card.Body>
                        <h4 className="mb-2">Reset Password</h4>
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
                            <div className="mb-3 form-div">
                                <label htmlFor="otp" className="form-label">OTP</label>
                                <div className="input-group input-group-merge">
                                    <FormControl
                                        type="number"
                                        id="otp"
                                        name="otp"
                                        placeholder="Enter otp"
                                        onChange={onChangeHandler}
                                        value={formData?.otp}
                                        onWheel={e=>e.target.blur()}
                                    />
                                </div>
                                <span className='text-danger'>{errors?.otp}</span>
                            </div>
                            <div className="mb-3 form-password-toggle form-div">
                                <label className="form-label" htmlFor="new_password">New Password</label>
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text ">
                                        <Icon className='lock form' />
                                    </span>
                                    <FormControl
                                        type={PassType ? "password" : "text"}
                                        id="new_password"
                                        className="form-control"
                                        name="new_password"
                                        placeholder="············"
                                        aria-describedby="new_password"
                                        onChange={onChangeHandler}
                                        value={formData?.new_password}
                                    />
                                    <span className="input-group-text cursor-pointer p-0">
                                        <Icon button={true} onClick={function(){setPassType(!PassType)}} className={PassType? 'eye-slash form':'eye form'} rounded={true}  />
                                    </span>
                                </div>
                                <span className='text-danger'>{errors?.new_password}</span>
                            </div>
                            <button type='submit' className="btn btn-primary d-grid w-100">
                                Verify
                            </button>
                        </form>
                        <ResentOTP show={showAlert} />
                    </Card.Body>
                </Card>
            </div>
        </div>
    </div>
  )
}