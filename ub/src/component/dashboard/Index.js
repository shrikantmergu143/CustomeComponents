/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Col, FormSelect, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { GetDashboardCountAPI } from '../../api/GetRequest';
import Icon from '../common/component/Icon'
import Tooltip from '../common/component/Tooltip';
import QuetionItemList, { QListItem } from './question/QuetionItemList';
import UsersItemlist from './users/UsersItemlist';


export default function Index() {
  const { access_token } = useSelector((state)=>state?.allReducers);
  const [filter, setFilter] = useState("all")
  const [Dashboard, setDashboard] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listType, setListType] = useState("")
  const [Question, setQuestion] = useState("")
  useEffect(()=>{
    callDashboardCounts()
  }, []);
  const callDashboardCounts = async () =>{
    const response = await GetDashboardCountAPI(access_token)
    // console.log("response", response)
    if(response?.status === 200){
      setDashboard({
        ...response?.data
      })
    }
  }
  const onClickCard = (e) =>{
    e.preventDefault();
    setListType("all");
    setQuestion("")
  }
  const clickActiveUser = (e) =>{
    setListType("active");
    setQuestion("")
  }
  const clickInActiveUser = ()=>{
    setListType("inactive")
    setQuestion("")
  }
  const clickSystem = (e) =>{
    setQuestion("system");
    setListType("")
  }
  const clickUsers = ()=>{
    setListType("")
    setQuestion("user")
  }
  const onClickQuestionCard = () =>{
    setListType("")
    setQuestion("all")
  }
  return (
    <div className='container-fluid page-outlet'>
      <div className=" basic_table">
        <h3> Dashboard</h3>
        <Row className='dashboard-cards'>
          <Col hidden xl={4} >
            <div onClick={()=>navigate("/questions")} className='card small-widget'>
              <div className="card-body primary">
                <div className='course-widget'>
                  <div className="course-icon danger"> 
                    <Icon className='fav card_icon' />
                  </div>
                  <div>
                      <span className="f-light">Most Favorite</span>
                      <div className="d-flex align-items-end gap-1">
                        <h4>4</h4>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={4} md={6} >
            <div class="card sass-widgets o-hidden cursor-pointer" onClick={onClickCard}>
              <div class="card-body p-0">
                <div class="media">
                  <div class="media-body">
                    <p class="f-w-600">Total Users</p>
                    <h2 class="f-w-600 mb-0">{Dashboard?.users_count?.active + Dashboard?.users_count?.in_active}</h2>
                  </div>
                </div>
                <div class="bg-gradient-primary footer-shape">
                  <div class="sass-footer">
                      <Tooltip title={"Active Users"} className={"cursor-pointer"} onClick={clickActiveUser}>
                          <p class="mb-0 d-inline-block mr-3">{Dashboard?.users_count?.active }</p>
                          <span>
                            <span class="d-inline-block">
                              <i class="fa fa-sort-up mr-4"></i>
                            </span>
                          </span>
                      </Tooltip>
                      <Tooltip title={"InActive Users"}  className={"cursor-pointer"} onClick={clickInActiveUser} >
                          <p class="mb-0 d-inline-block b-l-primary pl-4 mr-3">{Dashboard?.users_count?.in_active}</p>
                          <span class="down-arrow-align">
                            <span class="d-inline-block">
                              <i class="fa fa-sort-down"></i>
                            </span>
                          </span>
                      </Tooltip>
                    <div class="small-sass">
                      <div class="small-sasschart flot-chart-container">
                        <div className="course-icon "> 
                          <Icon className='activeusers card_icon white' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={4}  md={6} >
            <div class="card sass-widgets o-hidden cursor-pointer" onClick={onClickQuestionCard}>
              <div class="card-body p-0">
                <div class="media">
                  <div class="media-body">
                    <p class="f-w-600">Total Questions</p>
                    <h2 class="f-w-600 mb-0">{Dashboard?.questions_count?.total_questions}</h2>
                  </div>
                </div>
                <div class="bg-gradient-secondary footer-shape">
                  <div class="sass-footer">
                    <Tooltip title={"System Question"} className={"cursor-pointer"} onClick={clickSystem}>
                        <p class="mb-0 d-inline-block mr-3">{Dashboard?.questions_count?.system_questions }</p>
                        <span>
                          <span class="d-inline-block">
                          <Icon className='qsystem card_icon white mr-4' />
                          </span>
                        </span>
                    </Tooltip>
                    <Tooltip title={"Users Question"} className={"cursor-pointer"} onClick={clickUsers}>
                        <p class="mb-0 d-inline-block b-l-secondary pl-4 mr-3">{Dashboard?.questions_count?.users_questions}</p>
                        <span class="down-arrow-align">
                          <span class="d-inline-block">
                            <Icon className='activeusers card_icon white mr-4' />
                          </span>
                        </span>
                    </Tooltip>
                    <div class="small-sass">
                      <div class="small-sasschart flot-chart-container">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col hidden xl={4} >
            <div class="card sass-widgets o-hidden cursor-pointer">
              <div class="card-body p-0">
                <div class="media">
                  <div class="media-body">
                    <p class="f-w-600">Top Fav Questions</p>
                    <h2 class="f-w-600 mb-0">{Dashboard?.questions_count?.total_questions}</h2>
                  </div>
                </div>
                <div class="bg-gradient-info footer-shape">
                  <div class="sass-footer">
                    <Tooltip title={"System Question"} className={"cursor-pointer"}>
                        <p class="mb-0 d-inline-block mr-3">{Dashboard?.questions_count?.system_questions }</p>
                        <span>
                          <span class="d-inline-block">
                          <Icon className='qsystem card_icon white mr-4' />
                          </span>
                        </span>
                    </Tooltip>
                    <Tooltip title={"Users Question"} className={"cursor-pointer"}>
                        <p class="mb-0 d-inline-block b-l-info pl-4 mr-3">{Dashboard?.questions_count?.users_questions}</p>
                        <span class="down-arrow-align">
                          <span class="d-inline-block">
                            <Icon className='activeusers card_icon white mr-4' />
                          </span>
                        </span>
                    </Tooltip>
                    <div class="small-sass">
                      <div class="small-sasschart flot-chart-container">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {(listType !== "" || Question!=="") && 
          <Col xl={12}>
            <div className="card">
              <div className="card-header py-2  ">
                <Row>
                  <Col>
                    <ul className="nav nav-tabs border-tab" id="top-tab" role="tablist">
                      <li className="nav-item">
                          <button className={`btn nav-link active`} id="top-home-tab" data-bs-toggle="tab" href="#top-home" role="tab" aria-controls="top-home" aria-selected="true">
                              {listType ? 
                              `${listType} Users` :
                              `${Question} Question` 
                              }
                          </button>
                      </li>
                    </ul>
                  </Col>
                  {Question && <Col className='col-6 col-sm-6 d-flex align-items-center gap-3  justify-content-end'>
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
                  </Col>}
                </Row>
              </div>
              <div className="card-block  row">
                <div className="col-sm-12 col-lg-12 col-xl-12">
                  {listType && <UsersItemlist listType={listType} />}
                  {Question && <QuetionItemList listType={Question} filter={filter} />}
                </div>
              </div>
            </div>
          </Col>}
         {Dashboard?.avg_favourite_questions&&
          <Col xl={12}>
            <div className="card">
              <div className="card-header py-2 ">
                <ul className="nav nav-tabs border-tab" id="top-tab" role="tablist">
                  <li className="nav-item py-2">
                      <p className='text-primary mb-0 title'>Top Favorite Question</p>
                  </li>
                </ul>
              </div>
              <div className="card-block  row">
                <div className="col-sm-12 col-lg-12 col-xl-12">
                  <div className="table-responsive fade show">
                    <table className="table table-responsive-sm">
                      <thead>
                        <tr>
                            <th scope="col">Sr.no</th>
                            <th scope="col">Question</th>
                        </tr>
                      </thead>
                      {Dashboard?.avg_favourite_questions?.map((item, index)=>(
                        <QListItem
                          item={item}
                          IsFav={true}
                          index={index}
                        />
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Col>}
        </Row>
      </div>
    </div>
  )
}
