/* eslint-disable react/jsx-no-bind */
import React, { useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetDeleteModeAPI, GetModeListAPI } from '../../../api/GetRequest';
import { SetCurrentUserLogin, SetStoreModeLists, ShowModalConfirm, ShowToast } from '../../../redux/actions';
import { useNavigate } from "react-router";
import Icon, { IconButton } from '../../common/component/Icon';
import PaginationPage from '../../common/component/Pagination';
import { Indexing } from '../users/UsersList';
// import { PostUpdateModeAPI } from '../../../api/PostRequest';

export default function ModeList() {
    const { access_token, modelist } = useSelector((state)=>state?.allReducers);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        CallModeList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const CallModeList = async (current_page) =>{
        const response = await GetModeListAPI(access_token, current_page);
        if(response?.status === 200){
            dispatch(SetStoreModeLists({
                data:response?.data?.data,
                pagination:{
                    current_page:1,
                    record_limit:10,
                    total_records:response?.data?.data?.length
                }
            }))
        }else{
            if(response?.response?.status === 403){
                dispatch(SetCurrentUserLogin({access_token:""}))
            }
            dispatch(SetStoreModeLists({
                data:[],
                pagination:{
                    current_page:1,
                    record_limit:10,
                    total_records:0
                }
            }))
        }
    }

    const onDeleteModal = (e, item) =>{
        dispatch(ShowModalConfirm({
            Title:"Are you Sure?",
            show:true,
            Description:" Are you want to delete Mode?",
            id:"",
            callBackModal:()=>CallDeleteConfirm(item?.id),
            ButtonSuccess:"Delete Mode"
        }))
    }

    const CallDeleteConfirm = async (id) =>{
        const response = await GetDeleteModeAPI(access_token, id);
        if(response?.status === 200){
            dispatch(ShowToast({
                description:"Mode deleted successfully",
                type:"success",
            }))
            if(modelist?.data?.length === 1 ){
                CallModeList(modelist?.pagination?.current_page - 1);
            }
        }else{
            if(response?.response?.status === 403){
                dispatch(SetCurrentUserLogin({access_token:""}))
            }
            CallModeList(1);
        }
    }

  return (
    <React.Fragment>
        <div className='container-fluid'>
            <div className='page-title'>
                <Row>
                    <Col >
                        <h3>Mode</h3>
                    </Col>
                    <Col >
                        <div className='breadcrumb'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={"dashboard"}>
                                        <Icon className={"home"} />
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active"> Mode</li>
                            </ol>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div className='container-fluid basic_table'>
            <Row>
                <Col xl={12} >
                    <div className="card">
                        <div hidden={true} className="card-header py-2 ">
                            <Row>
                               <Col className='col-6 col-sm-6 p-0'>
                                   
                               </Col>
                               <Col className='col-6 col-sm-6'>
                                   <button onClick={function(){
                                       navigate("add", {state:{title:"add"}})
                                    }} className='btn btn-primary px-4 d-flex align-items-center gap-1 ml-auto'>
                                       <Icon className={"plus white"} />
                                       Add Mode
                                   </button>
                                </Col>
                            </Row>
                        </div>
                        <div className="card-block  row">
                            <div className="col-sm-12 col-lg-12 col-xl-12">
                                <div className="table-responsive fade show">
                                    <table className="table table-responsive-sm">
                                        <thead>
                                            <tr>
                                                <th scope="col">Sr.no</th>
                                                <th scope="col">Mode Name</th>
                                                <th hidden={true} scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {modelist?.data?.map((item, index)=>(
                                                <tr key={index?.toString()} className={"position-relative cursor-pointer"} >
                                                    <th scope="row">{Indexing(modelist, index)}</th>
                                                    <td>
                                                        {item?.mode_name}
                                                    </td>
                                                    <td hidden={true}>
                                                        <IconButton onClick={function(){
                                                            navigate("edit", {state:{...item, title:"edit"}})
                                                        }} >
                                                            <Icon className="pencil" />
                                                        </IconButton>
                                                        <IconButton onClick={function(e) {
                                                            onDeleteModal(e, item)
                                                        }}>
                                                            <Icon className="trash" />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            ))}
                                            {modelist?.data?.length === 0 && (
                                                <tr  >
                                                    <td align='center' colSpan={5}>
                                                        No Data Found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <PaginationPage
                                    handleChange={(e)=>CallModeList(e)}
                                    nopagination={false}
                                    pagination={modelist?.pagination}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </React.Fragment>
  )
}
