/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import Breadcrumb from "../../common/Breadcrumb";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import TabBar from "../../common/TabBar";
import UsersItemlist from "./UsersItemlist"
export const Indexing = (item, index) =>{
    return index + 1 + ((item?.pagination?.current_page-1)*10)
}
export default function Userslistpage (props) {
    const [listType, setListType] = useState("all");
    const navigate = useNavigate();
    const list = [
        {
            title:"all",
            icon:"users_1"
        },
        {
            title:"active",
            icon:"users"
        },
        {
            title:"inactive",
            icon:"users"
        }
    ]
    return (
        <Row>
            <Breadcrumb title={"Users"} />
            <Col className=' mb-3'>
                <Card>
                    <Card.Header className=''>
                        <Row>
                            <Col sm={12} xl={6} >
                                <TabBar
                                    select={listType}
                                    onSelect={(e)=>setListType(e)}
                                    data={list}
                                />
                            </Col>
                            <Col sm={12} xl={6}>
                                <div className='right-card gap-3'>
                                    <Button onClick={()=>navigate("add")} btntype="button--primary btn-sm btn-x-lg">
                                        Add User
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card.Header>
                    <UsersItemlist listType={listType} />
                </Card>
            </Col>
        </Row>
    )
}