/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ADMIN_COUNTS } from '../../../Api/constant'
import { getRequestcall } from '../../../Api/GetRequest'
import { setCallLogout, SetShowMediaLibrary } from '../../../redux/actions'
import Breadcrumb from '../../common/Breadcrumb'
import Icon from '../../common/Icon'
import Equipmenttablelist from '../Equipment/EquipmentTableList'
import CountCard from './CountCard'

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [CountsData, setCountsData] = useState({
        users_count: {active: "", in_active: ""},
        equipment_count: {active: "", in_active: ""},
        file_count: {active: "", in_active: ""},
        design_count: {active: "", in_active: ""}
    })
    const access_token =  useSelector((state)=>state?.allReducers?.access_token)
    useEffect(()=>{
        callGetDashboardCounts();
    },[]);
    const callGetDashboardCounts = async () =>{
        const response = await getRequestcall(ADMIN_COUNTS, access_token);
        if(response?.status === 200){
            setCountsData({
                ...response?.data
            })
        }else if(response?.status === 403){
            dispatch(setCallLogout());
        }
        // console.log("response", response)
    }
  return (
    <Row>
        <Breadcrumb title={"Dashboard"} />
        <Col lg={3} md={4} sm={6} className={"mb-5"}>
            <CountCard
                title={"TOTAL SVG"}
                counts={CountsData?.design_count?.active + CountsData?.design_count?.in_active}
                onClick={()=>navigate("/svg")}
                icon={"card1 info"}
                // badge={"33%"}
                // badgeIcon={"arrowdown"}
                // badgeBg={"info"}
            />
        </Col>
        <Col lg={3} md={4} sm={6} className={"mb-5"}>
            <CountCard
                title={"TOTAL EQUIPMENT"}
                counts={CountsData?.equipment_count?.active + CountsData?.equipment_count?.in_active}
                onClick={()=>navigate("/equipment")}
                icon={"card2 danger"}
                // badge={"33%"}
                // badgeIcon={"arrow-top"}
                // badgeBg={"danger"}
            />
        </Col>
        <Col lg={3} md={4} sm={6} className={"mb-5"}>
            <CountCard
                title={"TOTAL USER"}
                counts={CountsData?.users_count?.active + CountsData?.users_count?.in_active}
                onClick={()=>navigate("/Users")}
                icon={"usermenu primary"}
            />
        </Col>
        <Col lg={3} md={4} sm={6} className={"mb-5"}>
            <CountCard
                title={"TOTAL MEDIA"}
                counts={CountsData?.file_count?.active + CountsData?.file_count?.in_active}
                onClick={()=>dispatch(SetShowMediaLibrary(true))}
                icon={"card3 primary"}
            />
        </Col>
    </Row>
  )
}
