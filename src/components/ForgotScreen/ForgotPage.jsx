/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import Button from '../common/Button'
import CheckBox from '../common/CheckBox'
import InputGroup from '../common/InputGroup'
import { useDispatch } from 'react-redux';
import { validateEmail } from '../LoginScreen/LoginPage';
import { Link } from 'react-router-dom';
import { ShowToast } from '../../redux/actions';
import { PostRequestAPI } from '../../Api/PostRequest';
import {  useNavigate  } from "react-router"
import { USER_OTP } from '../../Api/constant';
import LogoImages from "./../../assets/img/323logo.png"

export default function ForgotPage() {
    // const [PassType, setPassType] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        is_forgot:1,
    });
    const [errors, setErrors] = useState({
        name:"",
        email:"",
    });

    const validation = () =>{
        let value = true;
        if(validateEmail(formData?.email)){
            value = false;
            errors.email = "Enter valid email";
        }
        if(formData?.email === ""){
            value = false;
            errors.email = "Enter email";
        }
        if(formData?.name === ""){
            value = false;
            errors.name = "Enter name";
        }
        setErrors({
            email:errors?.email,
            name:errors?.name
        })
        return value;
    }

    const onChangeHandler = (e) =>{
        setFormData((data)=>({...data, [e?.target?.name]:e.target.value}))
        setErrors({...errors, [e?.target?.name]:""})
    }

    const onChecked = (e) =>{
        setFormData((data)=>({...data, remember:e.target.checked}))
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(validation()){
            const response = await PostRequestAPI(USER_OTP, formData);
            console.log(response);
            if(response?.status === 200){
                navigate('/reset-password',{state:{type:'reset-password', formData:formData}})
                dispatch(ShowToast({
                    description:response?.data?.msg,
                    type:"success",
                }))
            }else{
                dispatch(ShowToast({
                    description:response?.data?.error,
                    type:"error",
                }))
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
                                <h1 className="auth-card__title">Reset Your Password</h1>
                                <p className="auth-card__text">Please enter your email address. You will receive a link to create a new password via email.</p>
                            </div>
                            <div className="auth-card__body">
                                <InputGroup
                                    label='Name'
                                    formClass='mb-2'
                                    placeholder='Enter name'
                                    name={"name"}
                                    onChange={onChangeHandler}
                                    value={formData?.name}
                                    require
                                    errors={errors?.name}
                                />
                                <InputGroup
                                    label='Email Address'
                                    leftIcon='userform'
                                    placeholder='Enter email'
                                    formClass='mb-4'
                                    name={"email"}
                                    onChange={onChangeHandler}
                                    value={formData?.email}
                                    require
                                    errors={errors?.email}
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
                                        <Button block={true} type={"submit"} btntype={"button--primary"}>
                                            Send Otp
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className='pt-4 text-center'>
                                Remember your password ? <Link to={"/login"} className="text-blue"> Sign in</Link>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}