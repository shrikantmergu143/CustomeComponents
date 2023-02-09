/* eslint-disable react/jsx-no-bind */
import React,  {useState} from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { SetDeleteEquipments, SetShowMediaLibrary, ShowModalConfirm } from '../../../redux/actions'
import Breadcrumb from '../../common/Breadcrumb'
import Button from '../../common/Button'
import IconButton from '../../common/IconButton'
import TabBar from '../../common/TabBar'
import Equipmenttablelist from './EquipmentTableList'

export default function EquipmentPage() {
    const [listType, setListType] = useState("all");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const callDelete = (item) =>{
        dispatch(ShowModalConfirm({
            Title:"Are you Sure?",
            show:true,
            Description:" Are you want to delete Equipment?",
            id:"",
            callBackModal:()=>callDeleteItemData(item.id),
            ButtonSuccess:"Delete Equipment"
        }))
    }
    const callDeleteItemData = (id)=>{
        dispatch(SetDeleteEquipments(id))
    }
    const list = [
        {
            title:"all",
        },
        {
            title:"active",
        },
        {
            title:"inactive",
        }
    ]
  return (
    <Row>
        <Breadcrumb title={"Equipment"} />
        <Col className='mb-4'>
            <Card>
                <Card.Header className='  '>
                    <Row>
                        <Col sm={12} xl={6} className={"mb-2"} >
                            <TabBar
                                select={listType}
                                onSelect={(e)=>setListType(e)}
                                data={list}
                            />
                        </Col>
                        <Col sm={12} xl={6} className={"mb-2"}>
                            <div className='right-card'>
                                <Button onClick={()=>navigate("add")} btntype="button--primary btn-sm btn-x-lg ">
                                    Add
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card.Header>
                <Equipmenttablelist  listType={listType} setListType={setListType} />
            </Card>
        </Col>
    </Row>
  )
}
