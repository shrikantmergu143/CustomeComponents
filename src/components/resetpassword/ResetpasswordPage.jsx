/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import { Card, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
// import { PostResetForgotPasswordAPI, PostSendotpAPI } from '../../api/PostRequest';
// import { SetCurrentUserLogin, ShowToast } from '../../redux/actions';

import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { FORGOT_PASSWORD } from '../../Api/constant';
import { PostRequestAPI } from '../../Api/PostRequest';
import { setCallLogout, ShowToast } from '../../redux/actions';
import Button from '../common/Button';
import Icon from '../common/Icon';
import InputGroup from '../common/InputGroup';
// import { validatePassword } from '../login/LoginPage';
import { checkPasswordValidity, validateEmail } from '../LoginScreen/LoginPage';


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
    const validation = () =>{
        let value = true;

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
        if(validateEmail(formData?.email)){
            value = false;
            errors.email = "Enter valid email";
        }
        if(formData?.email === ""){
            value = false;
            errors.email = "Enter your email"
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
        if(validation()){
            const response = await PostRequestAPI(FORGOT_PASSWORD,formData);
            if(response?.status === 200){
                navigate("/login")
                dispatch(ShowToast({
                    description:response?.data?.msg,
                    type:"success",
                }))
            }else{
                SetShowAlert(true)
                dispatch(ShowToast({
                    description:response?.data?.error,
                    type:"error",
                }))
                if(response?.response?.status === 403){
                    dispatch(setCallLogout({access_token:""}));
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
           
            // const response = await PostSendotpAPI(payload);
            // if(response?.status === 200){
            //     dispatch(ShowToast({
            //         description:response?.data?.msg,
            //         type:"success",
            //     }));
            //     setFormData({
            //         email:state?.formData?.email,
            //         new_password:"",
            //         otp:""
            //     })
            // }else{
            //     dispatch(ShowToast({
            //         description:"Unable to send otp",
            //         type:"success",
            //     }))
            // }
        }else{
            navigate("/forgot")
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
<div className="page-wrapper">
        <main className="page-auth">
            <div className="page-auth__center">
                <div className="auth-card card">
                    <div className="card__wrapper">
                        <form className="auth-card__center" onSubmit={handleSubmit}>
                            <div className="auth-card__top">
                                <h1 className="auth-card__title">Set Your Password</h1>
                                <p className="auth-card__text">Please enter your email address, otp and password. You will reset your password</p>
                            </div>
                            <div className="auth-card__body">
                                <InputGroup
                                    label='Email Address'
                                    leftIcon='userform'
                                    placeholder='Enter email'
                                    formClass='mb-2'
                                    name={"email"}
                                    onChange={onChangeHandler}
                                    value={formData?.email}
                                    require
                                    errors={errors?.email}
                                />
                                 <InputGroup
                                    label='OTP'
                                    formClass='mb-2'
                                    placeholder='Enter otp'
                                    name={"otp"}
                                    type={"number"}
                                    onChange={onChangeHandler}
                                    value={formData?.otp}
                                    require
                                    errors={errors?.otp}
                                />
                                <InputGroup
                                    leftIcon='icon_password'
                                    label='New Password'
                                    placeholder='Enter new password'
                                    type={PassType?"password":"text"}
                                    formClass='mb-4'
                                    require
                                    name={"new_password"}
                                    onChange={onChangeHandler}
                                    value={formData?.new_password}
                                    errors={errors?.new_password}
                                    rightIcon={PassType?"eyeslash":"eye"}
                                    rightButton={true}
                                    rightClick={()=>setPassType(!PassType)}
                                />
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
                                <div className='pt-4 text-center'>
                                Already have an password? <Link to={"/login"} className="text-blue"> Sign in</Link>
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