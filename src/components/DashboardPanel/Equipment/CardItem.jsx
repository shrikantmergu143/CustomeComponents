/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Card, Col } from 'react-bootstrap'
import IconButton from '../../common/IconButton'
import InputGroup from '../../common/InputGroup'
import PropTypes from 'prop-types';

export default function CardItem(props) {
  const {item, onChange, index} = props
  const CallDelete = (e) =>{
    e.preventDefault();
    props?.onDelete(index)
  }
  const callOnChange = (e) =>{
    // onChange(e, index)
  }
  return (
    <div className='col-12 mb-2'>
        <Card className='shadow-0 card-primary primary active card-item'>
            <Card.Body>
                <Col>
                  <InputGroup
                    name="key"
                    placeholder='Key'
                    value={item?.key}
                    formClass={"mb-0"}
                    errors={item?.keyerrors}
                    onChange={callOnChange}
                    readOnly
                  />
                </Col>
                <Col>
                  <InputGroup
                    name="value"
                    placeholder='Value'
                    value={item?.value}
                    formClass={"mb-0"}
                    onChange={callOnChange}
                    errors={item?.valueerrors}
                    readOnly
                  />
                </Col>
                <div className='action-item ml-2'>
                    <IconButton
                      onClick={CallDelete}
                      icon="trash"
                      className={"primary "}
                    />
                </div>
            </Card.Body>
        </Card>
    </div>
  )
}
CardItem.propTypes = {
  item:PropTypes?.any,
  onChange:PropTypes?.func,
  index:PropTypes?.any,
  data:PropTypes?.array,
};
CardItem.defaultProps = {
  data:[]
};