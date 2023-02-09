/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import IconButton from "../../common/IconButton";
import { useNavigate } from "react-router";
import Button from "../../common/Button";
import { ShowModalConfirm,  } from "../../../redux/actions";
import {useDispatch,useSelector} from "react-redux";
import {setSvglist} from "../../../redux/actions";
import Nodatafound from "../../common/Nodatafound";
import { CallGetUsersList } from "../../../redux/actions/utils";
import PaginationPage from "../../common/PaginationPage";
import PropTypes from 'prop-types';
import Icon from "../../common/Icon";
import { Indexing } from "./UsersListPage";
import { PostRequestAPI } from "../../../Api/PostRequest";
import { UPDATE_USER } from "../../../Api/constant";

export const ListItem = ({item, index, data, listType}) =>{
    const { access_token, currentUser } = useSelector((state)=>state?.allReducers);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleUpdateUser = async (e, id) =>{
        const payload = {
            is_active:e.target.checked?1:0,
            user_id:id
        }
        await PostRequestAPI( UPDATE_USER, payload, access_token);
        dispatch(await CallGetUsersList(listType, data?.pagination?.current_page));
    }
    return(
        <tr className={"position-relative "} >
            <th scope="row">
                {Indexing(data, index)}
            </th>
            <td>
                {item?.name}
            </td>
            <td>
                {item?.email}
            </td>
            <td>
                <Form.Check 
                    size={"sm"}
                    type="switch"
                    id="custom-switch"
                    checked={item?.is_active?true:false}
                    onClick={function(e){
                        e.stopPropagation()
                    }}
                    onChange={function(e){
                        if(currentUser.id !== item?.id){
                            handleUpdateUser(e, item?.id)
                        }
                    }}
                    disabled={currentUser.id === item?.id?true:false}
                    // label={item?.is_active?"Active":"InActive"}
                />
            </td>
            <td className=''>
                <IconButton
                    icon='edit' 
                    onClick={function(e){
                        e.stopPropagation();
                        if(currentUser.id !== item?.id){
                            navigate(`/Users/edit/${item?.id}`, {state:{...item, title:"edit"}})
                        }
                    }}
                    disabled={currentUser.id === item?.id?true:false}
                />
            </td>
        </tr>
    )
}
ListItem.propTypes = {
    item: PropTypes.any.isRequired,
    index: PropTypes.any.isRequired,
    data: PropTypes.any.isRequired,
    listType: PropTypes.any.isRequired,
};

export default function Userslistpage (props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userslist, record_limit } = useSelector((state)=>state?.allReducers)

    useEffect(()=>{
        callData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props?.listType, record_limit]);
    const callData = async (limit) =>{
        dispatch(await CallGetUsersList(props?.listType, limit));
    }
 return (
     <React.Fragment>
        <div className="table-responsive fade show">
            <table className="table commonlist table-responsive-sm table-hover">
                <thead>
                    <tr>
                        <th scope="col">Sr. No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userslist?.data?.map((item, index)=>(
                       <ListItem 
                            item={item}
                            key={index.toString()}
                            index={index}
                            data={userslist}
                            listType={props?.listType}
                       />
                    ))}
                    {userslist?.data?.length === 0 && (
                        <tr  >
                            <td align='center' colSpan={6}>
                                No Data Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <PaginationPage
            handleChange={callData}
            nopagination={false}
            pagination={userslist?.pagination}
            data={userslist?.data}
        />
    </React.Fragment>
 )
}