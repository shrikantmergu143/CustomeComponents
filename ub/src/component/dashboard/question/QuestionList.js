/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState} from 'react'
import { Col, FormSelect, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetDeleteQuestionAPI, GetQuesionListAPI } from '../../../api/GetRequest';
import { ShowModalConfirm, ShowToast, SetStoreQuestionLists, SetCurrentUserLogin } from '../../../redux/actions';
import { useNavigate } from "react-router";
import Icon, { IconButton } from '../../common/component/Icon';
import PaginationPage from '../../common/component/Pagination';
import { DDMMYYYYTIME } from '../../common/component/Datetimeformat';
import { Indexing } from '../users/UsersList';
import QuetionItemList from './QuetionItemList';
// import { PostUpdateModeAPI } from '../../../api/PostRequest';

export default function ModeList() {
    const {access_token, questionlist} = useSelector((state)=>state?.allReducers);
    const [listType, setListType] = useState("all");
    const [filter, setFilter] = useState("group")
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <React.Fragment>
        <div className='container-fluid'>
            <div className='page-title'>
                <Row>
                    <Col >
                        <h3>Question</h3>
                    </Col>
                    <Col >
                        <div className='breadcrumb'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={"dashboard"}>
                                        <Icon className={"home"} />
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active"> Question</li>
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
                        <div className="card-header py-2 ">
                            <Row>
                               <Col className='col-6 col-sm-6 p-0'>
                                    <ul className="nav nav-tabs border-tab" id="top-tab" role="tablist">
                                        <li className="nav-item">
                                            <button className={`btn nav-link ${listType === "all" && "active"}`} onClick={function(){setListType("all")}} id="all">
                                                {/* <Icon className='allusers' /> */}
                                                All
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button className={`btn nav-link ${listType === "system" && "active"}`} onClick={function(){setListType("system")}} id="system">
                                                {/* <Icon className={"userlist"}/> */}
                                                System
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button className={`btn nav-link ${listType === "user" && "active"}`} onClick={function(){setListType("user")}} id="user" >
                                                {/* <Icon className={"userlist"}/> */}
                                                User
                                            </button>
                                        </li>
                                    </ul>
                               </Col>
                               <Col className='col-6 col-sm-6 d-flex align-items-center gap-3  justify-content-end'>
                                   <div className={"d-flex align-items-center gap-1 ml-auto"}>
                                       <span>Filter</span> :
                                       <FormSelect onChange={(e)=>setFilter(e.target?.value)} value={filter} placeholder='Select d-inline '>
                                           <option value={"group"}>Group</option>
                                           <option value={"all"}>All</option>
                                           <option value={"bestfriend"}>Bestfriend</option>
                                           <option value={"partner"}>Partner</option>
                                           <option value={"favourite"}>Favourite</option>
                                       </FormSelect>
                                   </div>
                                   <button onClick={function(){navigate("/questions/add",{state:{title:"add"}})}} className='btn btn-primary px-4 d-flex align-items-center gap-1 '>
                                       <Icon className={"plus white"} />
                                       Add Question
                                   </button>
                                </Col>
                            </Row>
                        </div>
                        <div className="card-block  row">
                            <div className="col-sm-12 col-lg-12 col-xl-12">
                                <QuetionItemList listType={listType} filter={filter}/>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </React.Fragment>
  )
}
