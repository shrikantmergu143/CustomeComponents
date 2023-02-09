/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Col, Form, FormControl, Row } from 'react-bootstrap'
import { useDispatch, useSelector,  } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GetModeListAPI } from '../../../api/GetRequest';
import { PostAddQuestionAPI, PostUpdateQuestionAPI } from '../../../api/PostRequest';
import { ShowToast, SetStoreModeListAll, SetCurrentUserLogin } from '../../../redux/actions';
import Icon from '../../common/component/Icon';

export default function AddUsers(props) {
    const { access_token, AllModeList } = useSelector((state)=>state?.allReducers);
    const dispatch = useDispatch();
    const {state} = useLocation();
    const navigate = useNavigate();
    const [type, setType] = useState(state?.title)
    const [formData, setFormData] = useState({
        question:"",
        question_type:"system",
        mode_id:"",
    });

    const [errors, setErrors] = useState({
        question:"",
        question_type:"",
        mode_id:"",
    });

    useEffect(() => {
        if(state?.title === "edit"){
            CallSetStatusCall();
        }
        if(state?.title === "add" || props?.breadcrumb=== "Add"){
            setType("add")
        }
        if(!state?.title && props?.breadcrumb!== "Add"){
            navigate("/questions")
        }
        return() =>{
            window.history.replaceState({}, document.title)
        }
    }, [state?.title]);

    useEffect(()=>{
        callGetAllModeList();
    }, []);

    const callGetAllModeList = async ( ) =>{
        const response = await GetModeListAPI(access_token, 0);
        if(response?.status){
            dispatch(SetStoreModeListAll(response?.data?.data))
        }else{
            dispatch(SetStoreModeListAll([]));
        }
    }

    const CallSetStatusCall = () =>{
        setType(state?.title);
        const payload = {
        }
        if(state?.mode_id!==""){
            payload.mode_id = state?.mode_id
        }
        if(state?.question!==""){
            payload.question = state?.question
        }
        if(state?.question_type!==""){
            payload.question_type = state?.question_type
        }
        setFormData({
          ...payload
        })
    }
    const validate = () =>{
        let value = true;
        if(formData?.question === ""){
            value = false;
            errors.question = "Enter question"
        }
        if(formData?.mode_id === ""){
            value = false;
            errors.mode_id = "Select mode"
        }
        setErrors({
            ...errors,
            question:errors?.question,
            mode_id:errors?.mode_id,
        })
        return value;
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(validate()){
            const payload = {
                mode_id:formData?.mode_id,
                question:formData?.question,
                question_type:formData?.question_type,
            }
            const response = await PostAddQuestionAPI(payload, access_token);
            if(response?.status === 200){
                dispatch(ShowToast({
                    description:"Question added successfull",
                    type:"success",
                }))
                navigate("../")
            }else{
                console.log("response",response)
                // if(response?.response?.status === 400){
                //     dispatch(ShowToast({
                //         description:"Email already exist!",
                //         type:"error",
                //     }))
                // }
                if(response?.response?.status === 403){
                    dispatch(SetCurrentUserLogin({access_token:""}))
                }
            }
        }
    }
    const onChangeHandler = (e) =>{
        setFormData((data)=>({...data, [e?.target?.name]:e.target.value}))
        setErrors({...errors, [e?.target?.name]:""})
    }
    const UpDatePayload = () =>{
        const payload = {
            id:state?.id
        }
        if(formData?.question !==""){
            payload.question = formData?.question.replace(/\n/g, " ");
        }
        if(formData?.question_type!==""){
            payload.question_type = formData?.question_type
        }
        // if(formData?.mode_id!==""){
        //     payload.mode_id = formData?.mode_id
        // }
        return payload;
    }
    const handleUpdate = async (e) =>{
        e.preventDefault();
        if(validate()){
            const payload = UpDatePayload();
            const response = await PostUpdateQuestionAPI(payload, access_token);
            if(response?.status === 200){
                dispatch(ShowToast({
                    description:"Question updated successfull",
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
                                        <Link to={"../"}> Question</Link>
                                    </li>
                                    <li className="breadcrumb-item active">{props?.breadcrumb}</li>
                                </ol>
                            </div>
                        </Col>
                    </Row>
                    <form id="formAuthentication" className="mb-3 row" onSubmit={type === "add"  ? handleSubmit : handleUpdate}>
                            <Col className='col-sm-12 mb-3 form-div'>
                                <label htmlFor="mode_id" className="form-label">Select Mode</label>
                                <Form.Select id={"mode_id"}
                                    value={formData?.mode_id}
                                    onChange={onChangeHandler}
                                    placeholder={"mode_id"}
                                    name={"mode_id"}
                                    disabled={type === "edit" ? true : false}
                                >
                                        <option value={""} disabled>Select Mode</option>
                                    {AllModeList?.map((item, index)=>(
                                        <option key={index?.toString()} value={item?.id}>{item?.mode_name}</option>
                                    ))}
                                </Form.Select>
                                <span className='text-danger'>{errors?.mode_id}</span>
                            </Col>
                            <Col className='col-sm-12 mb-3 form-div'>
                                <label htmlFor="question" className="form-label">Question 
                                    {type === "add" && <span className='text-danger'>*</span>}
                                </label>
                                <FormControl
                                    as={"textarea"}
                                    maxLength={300}
                                    type="text"
                                    id="question"
                                    name="question"
                                    value={formData?.question}
                                    placeholder="Enter Question"
                                    onChange={onChangeHandler}
                                />
                                <span className='text-danger'>{errors?.question}</span>
                            </Col>
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
