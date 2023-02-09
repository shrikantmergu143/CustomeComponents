/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { GetUsersListAPI } from '../../../api/GetRequest';
import { PostUpdateUserAPI } from '../../../api/PostRequest';
import { SetCurrentUserLogin, SetStoreUserLists } from '../../../redux/actions';
import { CallGetUsersList } from '../../../redux/actions/utils';
import Icon from '../../common/component/Icon';
import PaginationPage from '../../common/component/Pagination';
import { Indexing } from './UsersList';

export const ListItem = ({item, index, data, listType}) =>{
    const { access_token, userslist } = useSelector((state)=>state?.allReducers);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleUpdateUser = async (e, id) =>{
        const payload = {
            is_active:e.target.checked?1:0,
            user_id:id
        }
        await PostUpdateUserAPI(payload, access_token);
        dispatch(await CallGetUsersList(listType, data?.pagination?.current_page));
    }
    return(
        <tr className={"position-relative cursor-pointer"} >
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
                {item?.position}
            </td>
            <td>
                {item?.profession}
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
                        handleUpdateUser(e, item?.id)
                    }}
                    // label={item?.is_active?"Active":"InActive"}
                />
            </td>
            <td>
                <div className='position-absolute table-editor'>
                    <Icon 
                        button={true}
                        className={"edit"}
                        rounded={true}
                        onClick={function(e){
                            e.stopPropagation();
                            navigate("/users/edit", {state:{...item, title:"edit"}})
                        }}
                    />
                </div>
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
export default function UsersItemlist(props) {
    const { access_token, userslist } = useSelector((state)=>state?.allReducers);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(function(){
        callData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props?.listType])
    const callData = async () =>{
        dispatch(await CallGetUsersList(props?.listType, 1));
    }

    const handlePagination = async ( e ) =>{
        dispatch(await CallGetUsersList(props?.listType, e));
    }
  return (
    <React.Fragment>
        <div className="table-responsive fade show">
            <table className="table table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">Sr.no</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Position</th>
                        <th scope="col">Profession</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
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
            handleChange={handlePagination}
            nopagination={false}
            pagination={userslist?.pagination}
        />
    </React.Fragment>
  )
}
UsersItemlist.propTypes = {
    listType: PropTypes.any.isRequired,
};