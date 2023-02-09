/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react'
import { Col, Form, FormControl, Row } from 'react-bootstrap'
import { useDispatch, useSelector,  } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ADD_USER, DESIGN_LIST, UPDATE_USER } from '../../../Api/constant';
import { getRequestcall } from '../../../Api/GetRequest';
import { PostRequestAPI } from '../../../Api/PostRequest';
import { setCallLogout, ShowToast } from '../../../redux/actions';
import Button from '../../common/Button';
import Icon from '../../common/Icon';
import InputGroup from '../../common/InputGroup';
import ReactSelect from '../../common/ReactSelect';
import { checkPasswordValidity, validateEmail } from '../../LoginScreen/LoginPage';

export default function AddUsers(props) {
    const { access_token } = useSelector((state)=>state?.allReducers);
    const [PassType, setPassType] = useState(true)
    const dispatch = useDispatch();
    const {state} = useLocation();
    const location = useLocation();
    const [options, setOptions] = useState([])
    const navigate = useNavigate();
    
    const [type, setType] = useState(state?.title)
    const [formData, setFormData] = useState({
        email:"",
        password:"",
        name:"",
        designs:"",
        is_admin:0,
    });
    const [designs, setDesigns] = useState([])
    const [errors, setErrors] = useState({
        email:"",
        password:"",
        name:"",
        designs:"",
        is_admin:"",
    });
    useEffect(() => {
        if(state?.title === "edit"){
            CallSetStatusCall();
        }
        if(state?.title === "add" || props?.type=== "add"){
            setType("add")
        }
        if(!state?.title && props?.type!== "add"){
            navigate("/Users")
        }
    }, [state?.title]);

    useEffect(()=>{
        callGetDesignList()
    },[]);

    const callGetDesignList = async () =>{
        const URL = `${DESIGN_LIST}/all/${10}/${1}`;
        const response = await getRequestcall(URL, access_token);
        if(response?.status === 200){
            const data = response?.data?.data?.map((item)=>({label:item?.design_title, value:item?.id}));
            //console.log("data", data)
            setOptions(data);
            if(state?.title === "edit" && state?.designs !== null){
                const res = data?.filter((item)=>{
                    const filter = state?.designs?.split(",")?.filter((item1)=>item.value=== item1);
                    if(filter?.length !== 0){
                        return item;
                    }
                });
                setDesigns(res)
            }
        }
    }

    const CallSetStatusCall = () =>{
        setType(state?.title);
        const payload = {
            is_admin:0,
        }
        if(state?.name!==""){
            payload.name = state?.name
        }
        if(state?.email!==""){
            payload.email = state?.email
        }
        if(state?.is_admin!==""){
            payload.is_admin = state?.is_admin
        }
        if(state?.password!==""){
            payload.password = state?.password
        }
        setFormData({
          ...payload,
          is_admin:0,
          password:""
        })
    }
    const validate = () =>{
        let value = true;
        if(validateEmail(formData?.email)){
            value = false;
            errors.email = "Enter valid email"
        }
        if(formData?.email === ""){
            value = false;
            errors.email = "Enter email"
        }
        if(formData?.name === ""){
            value = false;
            errors.name = "Enter name"
        }
        if(type === "add"){
            if(checkPasswordValidity(formData?.password)){
                value = false
                errors.password = "Enter password should contain at least one number and one special character"
            }
            if(formData?.password === ""){
                value = false
                errors.password = "Enter password"
            }
        }
        setErrors({
            ...errors,
            email:errors?.email,
            is_admin:errors?.is_admin,
            name:errors?.name,
            password:errors?.password,
        })
        return value;
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(validate()){
            const payload = {
                name:formData?.name,
                email:formData?.email,
                password:formData?.password,
                is_admin:formData?.is_admin,
            }
            if(designs?.length !== 0 ){
                const list = designs?.map(item=>item.value).toString();
                payload.designs = list;
            }
            const response = await PostRequestAPI( ADD_USER, payload, access_token);
            if(response?.status === 200){
                dispatch(ShowToast({
                    description:"User added successfull",
                    type:"success",
                }))
                navigate("/Users");
            }else{
                console.log("response",response)
                if(response?.status === 400){
                    dispatch(ShowToast({
                        description:"Email already exist!",
                        type:"error",
                    }))
                }
                if(response?.status === 403){
                    dispatch(setCallLogout())
                }
            }
        }
    }
    const onChangeHandler = (e) =>{
        setFormData((data)=>({...data, [e?.target?.name]:e.target.value}))
        setErrors({...errors, [e?.target?.name]:""})
    }
    const UpdatePayload = () =>{
        const payload = {
            user_id:state?.id
        }
        if(formData?.name!==""){
            payload.name = formData?.name
        }
        if(formData?.email!==""){
            payload.email = formData?.email
        }
        if(formData?.is_admin!==""){
            payload.is_admin = formData?.is_admin
        }
        if(formData?.password!==""){
            payload.password = formData?.password
        }
        if(designs?.length !== 0 ){
            const list = designs?.map(item=>item.value).toString();
            payload.designs = list;
        }
        return payload;
    }
    const handleUpdate = async (e) =>{
        e.preventDefault();
        if(validate()){
            const payload = UpdatePayload();
            const response = await PostRequestAPI( UPDATE_USER, payload, access_token);
            if(response?.status === 200){
                dispatch(ShowToast({
                    description:"User updated successfull",
                    type:"success",
                }))
                navigate(location.pathname, {}); 
            }else{
                if(response?.response?.status === 400){
                    // dispatch(ShowToast({
                    //     description:response?.response?.data?.error,
                    //     type:"error",
                    // }))
                }
                if(response?.response?.status === 403){
                    dispatch(setCallLogout())
                }
            }
        }
    }
  return (
    <React.Fragment>
        <Row>
            <Col className='mt-3 mb-4'>
                <div className="card">
                    <div className="card-body  ">
                        <Row>
                            <Col >
                                <h5>{props?.title}</h5>
                            </Col>
                            <Col >
                                <div className='breadcrumb'>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to={"dashboard"}>
                                                <Icon className={"home"} />
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link to={"../"}> Users</Link>
                                        </li>
                                        <li className="breadcrumb-item active">{props?.breadcrumb}</li>
                                    </ol>
                                </div>
                            </Col>
                        </Row>
                        <form id="formAuthentication" className="mb-3 row" onSubmit={type === "add"  ? handleSubmit : handleUpdate}>
                                <Col className='col-sm-6'>
                                    <InputGroup
                                        label='Name'
                                        require={type === "edit"?false:true }
                                        placeholder='Enter name'
                                        name={"name"}
                                        onChange={onChangeHandler}
                                        value={formData?.name}
                                        errors={errors?.name}
                                    />
                                </Col>
                                <Col className='col-sm-6'>
                                    <InputGroup
                                        label='Email'
                                        require={type === "edit"?false:true }
                                        placeholder='Enter email'
                                        name={"email"}
                                        onChange={onChangeHandler}
                                        value={formData?.email}
                                        errors={errors?.email}
                                    />
                                </Col>
                                <Col className='col-sm-6'>
                                    <InputGroup
                                        label='Password'
                                        require={type === "edit"?false:true }
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
                                </Col>
                                <Col className='col-sm-6 common-form'>
                                    <label htmlFor="is_admin" className="form-label">User Type</label>
                                    <Form.Select id={"is_admin"}
                                        value={formData?.is_admin}
                                        onChange={onChangeHandler}
                                        placeholder={"is_admin"}
                                        name={"is_admin"}
                                    >
                                        <option value={0}>User</option>
                                        <option value={1}>Admin</option>
                                    </Form.Select>
                                    <span className='text-danger'>{errors?.is_admin}</span>
                                </Col>
                                <Col className='col-sm-6 common-form'>
                                    <ReactSelect
                                        label={"Design"}
                                        isMulti={true}
                                        placeholder={"Select Design"}
                                        options={options}
                                        value={designs}
                                        onChange={(e)=>setDesigns(e)}
                                    />
                                    <span className='text-danger'>{errors?.is_admin}</span>
                                </Col>
                                <div className='ml-auto d-flex'>
                                    <Button type='submit' className={"button--primary ml-auto"} >
                                        {props?.title}
                                    </Button>
                                </div>
                        </form>
                    </div>
                </div>
            </Col>
        </Row>
    </React.Fragment>
  )
}
