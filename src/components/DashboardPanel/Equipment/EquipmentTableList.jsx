/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { EQUIPMENT_UPDATE, EQUIPMENT_DELETE } from '../../../Api/constant';
import { PostRequestAPI } from '../../../Api/PostRequest';
import { setCallLogout, SetDeleteEquipments, ShowModalConfirm } from '../../../redux/actions';
import { CallGetEquipmentList } from '../../../redux/actions/utils';
import IconButton from '../../common/IconButton';

export const EquipmentTableItem = (props) =>{
    const { index, item, handleUpdate } = props;
    const access_token =  useSelector((state)=>state?.allReducers?.access_token);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const callDeleteItemData =async (id)=>{
        // dispatch(SetDeleteEquipments(id))
        const payload = {
            equipment_id:id
        }
        const response =await PostRequestAPI(EQUIPMENT_DELETE, payload, access_token);
        if(response?.status === 403){
            dispatch(setCallLogout())
        }
        props?.callData(props?.data?.pagination?.current_page);
    }

    return(
        <tr >
            <th scope="row">{index +1}</th>
            <td>{item?.equipment_title}</td>
            <td >
            <Form.Check 
                size={"sm"}
                type="switch"
                id="custom-switch"
                checked={item?.is_active?true:false}
                onClick={function(e){
                    e.stopPropagation()
                }}
                onChange={function(e){
                        handleUpdate(e, item)
                }}
            />
            </td>
            <td className='gap-2'>
                <IconButton onClick={()=>navigate("/equipment/edit/"+item.id, {state:{title:"edit", item:item}})} icon='edit'/>
                <IconButton onClick={()=>callDelete(item)} icon='trash'/>
            </td>
        </tr>
    )
}

const Equipmenttablelist = (props) => {
    const equipmentList =  useSelector((state)=>state?.allReducers?.equipment);
    const access_token =  useSelector((state)=>state?.allReducers?.access_token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        callData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props?.listType]);

    const callData = async (limit) =>{
        dispatch(await CallGetEquipmentList(props?.listType, limit));
    }
    const handleUpdate = async (e, item) =>{
        const payload = {
            equipment_description:item?.equipment_description,
            equipment_title:item?.equipment_title,
            equipment_meta:JSON.stringify(item?.equipment_meta),
            is_active:e.target.checked?1:0,
            equipment_id:item?.id
        }
        await PostRequestAPI(EQUIPMENT_UPDATE, payload, access_token);
        callData(equipmentList?.pagination?.current_page);
    }

    return (
        <div className="table-responsive fade show">
            <table className="table table-responsive-sm table-hover commonlist">
                <thead>
                    <tr>
                        <th scope="col">Sr.No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {equipmentList?.data?.map((item, index)=>(
                        <EquipmentTableItem callData={callData} data={equipmentList} item={item} index={index} handleUpdate={handleUpdate} key={index?.toString()}/>
                    ))}
                    {equipmentList?.data?.length === 0 &&(
                        <tr>
                            <td colSpan={4} align={"center"}>No Data found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Equipmenttablelist;
