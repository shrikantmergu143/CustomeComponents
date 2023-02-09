import React from 'react'
import PropTypes from 'prop-types';
import { Badge, Card } from 'react-bootstrap';
import Icon from '../../common/Icon';

export default function CountCard(props) {
  return (
    <Card className='card_cnt' onClick={props?.onClick}>
        <Card.Body className='p-4' >
            {props?.badge && 
                <Badge className='position-end-top' bg={props?.badgeBg}> {props?.badge} <Icon className={`${props?.badgeIcon} white`} /></Badge>
            }
            <Icon className={props?.icon} />
            <div className="row align-items-center gx-2 mb-1 ">
                <div className="col-6" style={{lineHeight: "3rem"}}>
                    <h2 className="card-title text-inherit" >{props?.counts}</h2>
                </div>
            </div>
            <h6 className='card-subtitle'>{props?.title}</h6>
        </Card.Body>
    </Card>
  )
}
CountCard.propTypes = {
    counts:PropTypes?.any,
    title:PropTypes?.any,
    icon:PropTypes?.any,
    badge:PropTypes?.any,
    onClick:PropTypes?.func,
    badgeIcon:PropTypes?.any,
    badgeBg:PropTypes?.any
};
CountCard.defaultProps = {
    counts:"",
    title:"",
    icon:"",
    badgeIcon:"",
    badgeBg:"info"
}