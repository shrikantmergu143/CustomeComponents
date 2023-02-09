import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import Icon from './Icon'

export default function Breadcrumb(props) {
    const location = window.location.pathname.split("/").filter((item)=>item!=="");
  return (
    <React.Fragment>
        <Row className={"m-0"}>
            <Col className='col-6 page-title'>
                <h4 className=" title text-capitalize breadcrumb-title">{props?.title}</h4>
            </Col>
            <Col className='col-6 page-title' >
                <div className='breadcrumb'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/dashboard"}>
                                <Icon className={"home"} />
                            </Link>
                        </li>
                        {location?.map((item, index)=>(
                            <React.Fragment key={index?.toString()}>
                                {
                                    
                                    location?.length-1 === index?(
                                        <li className="breadcrumb-item active text-capitalize"> {item}</li>
                                    ):(
                                        <li className="breadcrumb-item active text-capitalize">
                                            <Link to={`/${item}`}>
                                                {item}
                                            </Link>
                                        </li>
                                    )
                                }
                            </React.Fragment>
                        ))}
                    </ol>
                </div>
            </Col>
        </Row>
    </React.Fragment>
  )
}