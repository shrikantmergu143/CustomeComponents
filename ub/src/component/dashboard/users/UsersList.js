/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../../common/component/Icon';
import { useNavigate } from "react-router";
import UsersItemlist from './UsersItemlist';

export const Indexing = (item, index) =>{
    return index + 1 + ((item?.pagination?.current_page-1)*10)
}

export default function UsersList() {
    const [listType, setListType] = useState("all");
    const navigate = useNavigate();
    // const dispatch = useDispatch();
  return (
    <React.Fragment>
        <div className='container-fluid'>
            <div className='page-title'>
                <Row>
                    <Col >
                        <h3>Users</h3>
                    </Col>
                    <Col >
                        <div className='breadcrumb'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={"dashboard"}>
                                        <Icon className={"home"} />
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active"> Users</li>
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
                                            <button className={`btn nav-link ${listType === "all" && "active"}`} onClick={function(){setListType("all")}} id="top-home-tab" data-bs-toggle="tab" href="#top-home" role="tab" aria-controls="top-home" aria-selected="true">
                                                <Icon className='allusers' />
                                                All
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button className={`btn nav-link ${listType === "active" && "active"}`} onClick={function(){setListType("active")}} id="top-home-tab" data-bs-toggle="tab" href="#top-home" role="tab" aria-controls="top-home" aria-selected="true">
                                                <Icon className={"userlist"}/>
                                                Active
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button className={`btn nav-link ${listType === "inactive" && "active"}`} onClick={function(){setListType("inactive")}} id="top-home-tab" data-bs-toggle="tab" href="#top-home" role="tab" aria-controls="top-home" aria-selected="true">
                                                <Icon className={"userlist"}/>
                                                InActive
                                            </button>
                                        </li>
                                    </ul>
                               </Col>
                               <Col className='col-6 col-sm-6'>
                                   <button onClick={function(){navigate("add",{state:{title:"add"}})}} className='btn btn-primary px-4 d-flex align-items-center gap-1 ml-auto'>
                                       <Icon className={"plus white"} />
                                       Add User
                                   </button>
                                </Col>
                            </Row>
                        </div>
                        <div className="card-block  row">
                            <div className="col-sm-12 col-lg-12 col-xl-12">
                                {/* UsersList Commmon */}
                                <UsersItemlist listType={listType} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </React.Fragment>
  )
}
