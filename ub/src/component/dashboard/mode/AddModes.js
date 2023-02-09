/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Card, Col, Form, FormControl, Row } from 'react-bootstrap'
import { useDispatch, useSelector,  } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PostAddModeAPI, PostUpdateModeAPI } from '../../../api/PostRequest';
import { SetCurrentUserLogin, ShowToast } from '../../../redux/actions';
import Icon from '../../common/component/Icon';

export default function AddModes(props) {
  const { access_token } = useSelector((state)=>state?.allReducers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation();
  const [type, setType] = useState(state?.title);
  const [SelectColor] = useState([
    {
        background_colour:"#FFDDF1",
        text_colour:"#750000"
    },
    {
        background_colour:"#FDA5E4",
        text_colour:"#750000"
    },
    {
        background_colour:"#E87CCA",
        text_colour:"#750000"
    },
    {
        background_colour:"#FFEFFB",
        text_colour:"#750000"
    },
  ]);
  const [formData, setFormData] = useState({
    mode_name:"",
    text_colour:SelectColor[0]?.text_colour,
    background_colour:SelectColor[0]?.background_colour,
    selected:0
  });
  const [errors, setErrors] = useState({
    mode_name:"",
  });
  useEffect(()=>{
    if(state?.title === "edit"){
      CallSetStatusCall();
    }
    if(state?.title === "add"){
        setType(state?.title)
    }
    if(!state?.title && props?.breadcrumb!== "Add"){
        navigate("../")
    }
    return() =>{
      window.history.replaceState({}, document.title)
    }
  },[]);

  const CallSetStatusCall = () =>{
    setType(state?.title);
    setFormData({
      mode_name:state?.mode_name,
      text_colour:state?.text_colour,
      background_colour:state?.background_colour,
    })
  }
  const onChangeHandler = (e) =>{
    setFormData((data)=>({...data, [e?.target?.name]:e.target.value}))
    setErrors({...errors, [e?.target?.name]:""})
  }
  const validate = () =>{
    let value = true;
    if(formData?.mode_name === ""){
        value = false;
        errors.mode_name = "Enter mode name"
    }
    setErrors({
        ...errors,
        mode_name:errors?.mode_name,
    })
    return value;
  }
  const handleSubmit = async ( e ) =>{
    e.preventDefault();
    if(validate()){
        const response = await PostAddModeAPI(formData, access_token);
        if(response?.status === 200){
            dispatch(ShowToast({
                description:"Mode added successfull",
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
  const handleUpdate = async (e) =>{
    e.preventDefault();
    if(validate()){
        const payload = {
            mode_id:state?.id
        }
        if(formData?.mode_name){
            payload.mode_name = formData?.mode_name
        }
        if(formData?.background_colour){
            payload.background_colour = formData?.background_colour
        }
        if(formData?.text_colour){
            payload.text_colour = formData?.text_colour
        }

        const response = await PostUpdateModeAPI(payload, access_token);
        if(response?.status === 200){
            dispatch(ShowToast({
                description:"Mode updated successfull",
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
  const SelectItemColor = (item, index) =>{
    setFormData({
        mode_name:formData?.mode_name,
        text_colour:item?.text_colour,
        background_colour:item?.background_colour,
        selected:index
    });
  }
  return (
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
                                  <Link to={"../"}> Mode</Link>
                              </li>
                              <li className="breadcrumb-item active">{props?.breadcrumb}</li>
                          </ol>
                      </div>
                  </Col>
              </Row>
                  <Form id="formAuthentication" className="mb-3 row" onSubmit={type === "add" ? handleSubmit : handleUpdate}>
                          <Col hidden className='col-sm-12 mb-3 form-div'>
                              <label htmlFor="name" className="form-label">Mode Name 
                              {type === "add" && <span className='text-danger'>*</span>}
                              </label>
                              <FormControl
                                  type="text"
                                  id="name"
                                  name="mode_name"
                                  placeholder="Enter mode name"
                                  value={formData?.mode_name}
                                  onChange={onChangeHandler}
                                  autoFocus={true}
                              />
                              <span className='text-danger'>{errors?.mode_name}</span>
                          </Col>
                          <Col className=' mb-3'>
                            <Card className='box-mode mb-3' style={{backgroundColor:formData?.background_colour}}>
                                <Card.Body>
                                    <FormControl
                                        type="text"
                                        id="name"
                                        name="mode_name"
                                        placeholder="Enter mode name"
                                        value={formData?.mode_name}
                                        onChange={onChangeHandler}
                                        autoFocus={true}
                                        style={{color:formData?.text_colour, textAlign:"center"}}
                                    />
                                    <span className='text-danger '>{errors?.mode_name}</span>
                                </Card.Body>
                            </Card>
                            <div className='d-flex justify-content-center'>
                                {SelectColor?.map((item, index)=>(
                                    <button type='button' key={index?.toString()} onClick={()=>SelectItemColor(item, index)} style={{backgroundColor:item?.background_colour}} className={"btn colorSelection"}>
                                        {formData?.selected === index && (<Icon className="check" style={{backgroundColor:item?.text_colour}} />)}
                                    </button>
                                ))}
                            </div>
                          </Col>
                          <div className='ml-auto d-flex'>
                              <button type={"submit"} className='ml-auto btn btn-primary'>
                              {props?.title}
                              </button>
                          </div>
                  </Form>
          </div>
      </div>
    </div>
  )
}
