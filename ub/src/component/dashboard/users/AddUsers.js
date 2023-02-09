/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react'
import { Col, Form, FormControl, Row } from 'react-bootstrap'
import { useDispatch, useSelector,  } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PostAddUserAPI, PostUpdateUserAPI } from '../../../api/PostRequest';
import { SetCurrentUserLogin, ShowToast } from '../../../redux/actions';
import Icon from '../../common/component/Icon';
import { validateEmail, validatePassword } from '../../login/LoginPage';

export default function AddUsers(props) {
    const { access_token } = useSelector((state)=>state?.allReducers);
    const dispatch = useDispatch();
    const {state} = useLocation();
    const navigate = useNavigate();
    const [type, setType] = useState(state?.title)
    const [formData, setFormData] = useState({
        email:"",
        password:"",
        name:"",
        is_admin:0,
        address:"",
        age:"",
        hobbies:"",
        interests:"",
        position:"",
        profession:""
    });
    const [errors, setErrors] = useState({
        email:"",
        password:"",
        name:"",
        is_admin:"",
        address:"",
        age:"",
        hobbies:"",
        interests:"",
        position:"",
        profession:""
    });
    useEffect(() => {
        if(state?.title === "edit"){
            CallSetStatusCall();
        }
        if(state?.title === "add" || props?.breadcrumb=== "Add"){
            setType("add")
        }
        if(!state?.title && props?.breadcrumb!== "Add"){
            navigate("/users")
        }
        return() =>{
            window.history.replaceState({}, document.title)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state?.title]);

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
        if(state?.age!==""){
            payload.age = state?.age
        }
        if(state?.address!==""){
            payload.address = state?.address
        }
        if(state?.hobbies!==""){
            payload.hobbies = state?.hobbies
        }
        if(state?.interests!==""){
            payload.interests = state?.interests
        }
        if(state?.position!==""){
            payload.position = state?.position
        }
        if(state?.profession!==""){
            payload.profession = state?.profession
        }
        setFormData({
          ...payload
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
            if(validatePassword(formData?.password)){
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
                is_admin:formData?.is_admin
            }
            const response = await PostAddUserAPI(payload, access_token);
            if(response?.status === 200){
                dispatch(ShowToast({
                    description:"User added successfull",
                    type:"success",
                }))
                navigate("../")
            }else{
                console.log("response",response)
                if(response?.response?.status === 400){
                    dispatch(ShowToast({
                        description:"Email already exist!",
                        type:"error",
                    }))
                }
                if(response?.response?.status === 403){
                    dispatch(SetCurrentUserLogin({access_token:""}))
                }
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
    const UpDatePayload = () =>{
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
    const handleUpdate = async (e) =>{
        e.preventDefault();
        if(validate()){
            const payload = UpDatePayload()
            const response = await PostUpdateUserAPI(payload, access_token);
            if(response?.status === 200){
                dispatch(ShowToast({
                    description:"User updated successfull",
                    type:"success",
                }))
                navigate("../")
            }else{
                console.log("response",response)
                if(response?.response?.status === 400){
                    // dispatch(ShowToast({
                    //     description:response?.response?.data?.error,
                    //     type:"error",
                    // }))
                }
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
                                <Col className='col-sm-6 mb-3 form-div'>
                                    <label htmlFor="name" className="form-label">Name 
                                    {type === "add" && <span className='text-danger'>*</span>}
                                    </label>
                                    <FormControl
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter name"
                                        value={formData?.name}
                                        onChange={onChangeHandler}
                                    />
                                    <span className='text-danger'>{errors?.name}</span>
                                </Col>
                                <Col className='col-sm-6 mb-3 form-div'>
                                    <label htmlFor="email" className="form-label">Email 
                                        {type === "add" && <span className='text-danger'>*</span>}
                                    </label>
                                    <FormControl
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={formData?.email}
                                        placeholder="Enter email"
                                        onChange={onChangeHandler}
                                    />
                                    <span className='text-danger'>{errors?.email}</span>
                                </Col>
                                <Col className='col-sm-6 mb-3 form-div'>
                                    <label htmlFor="password" className="form-label">Password 
                                        {type === "add" && <span className='text-danger'>*</span>}
                                    </label>
                                    <FormControl
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter password"
                                        value={formData?.password}
                                        onChange={onChangeHandler}
                                    />
                                    <span className='text-danger'>{errors?.password}</span>
                                </Col>
                                <Col className='col-sm-6 mb-3 form-div'>
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
                                {type !== "add" &&
                                <React.Fragment>
                                    <Col className='col-sm-6 mb-3 form-div'>
                                        <label htmlFor="address" className="form-label">Address 
                                        </label>
                                        <FormControl
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData?.address}
                                            placeholder="Enter address"
                                            onChange={onChangeHandler}
                                        />
                                        <span className='text-danger'>{errors?.address}</span>
                                    </Col>
                                    <Col className='col-sm-6 mb-3 form-div'>
                                        <label htmlFor="age" className="form-label">age 
                                        </label>
                                        <FormControl
                                            type="number"
                                            id="age"
                                            name="age"
                                            value={formData?.age}
                                            placeholder="Enter age"
                                            onWheel={e=>e.target.blur()}
                                            onChange={onChangeHandler}
                                        />
                                        <span className='text-danger'>{errors?.age}</span>
                                    </Col>
                                    <Col className='col-sm-6 mb-3 form-div'>
                                        <label htmlFor="hobbies" className="form-label">Hobbies 
                                        </label>
                                        <FormControl
                                            type="text"
                                            id="hobbies"
                                            name="hobbies"
                                            value={formData?.hobbies}
                                            placeholder="Enter hobbies"
                                            onChange={onChangeHandler}
                                        />
                                        <span className='text-danger'>{errors?.hobbies}</span>
                                    </Col>
                                    <Col className='col-sm-6 mb-3 form-div'>
                                        <label htmlFor="interests" className="form-label">Interests 
                                        </label>
                                        <FormControl
                                            type="text"
                                            id="interests"
                                            name="interests"
                                            value={formData?.interests}
                                            placeholder="Enter interests"
                                            onChange={onChangeHandler}
                                        />
                                        <span className='text-danger'>{errors?.interests}</span>
                                    </Col>
                                    <Col className='col-sm-6 mb-3 form-div'>
                                        <label htmlFor="position" className="form-label">Position 
                                        </label>
                                        <FormControl
                                            type="text"
                                            id="position"
                                            name="position"
                                            value={formData?.position}
                                            placeholder="Enter position"
                                            onChange={onChangeHandler}
                                        />
                                        <span className='text-danger'>{errors?.position}</span>
                                    </Col>
                                    <Col className='col-sm-6 mb-3 form-div'>
                                        <label htmlFor="profession" className="form-label">profession 
                                        </label>
                                        <FormControl
                                            type="text"
                                            id="profession"
                                            name="profession"
                                            value={formData?.profession}
                                            placeholder="Enter profession"
                                            onChange={onChangeHandler}
                                        />
                                        <span className='text-danger'>{errors?.profession}</span>
                                    </Col>
                                </React.Fragment>}
                                <div className='ml-auto d-flex'>
                                    <button type={"submit"} className='ml-auto btn btn-primary'>
                                    {props?.title}
                                    </button>
                                </div>
                        </form>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}
