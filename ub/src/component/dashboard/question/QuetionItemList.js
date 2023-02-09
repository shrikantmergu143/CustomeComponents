/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { GetDeleteQuestionAPI } from '../../../api/GetRequest'
import { SetCurrentUserLogin, ShowModalConfirm, ShowToast } from '../../../redux/actions'
import { CallQuestionList } from '../../../redux/actions/utils'
import { DDMMYYYYTIME } from '../../common/component/Datetimeformat'
import Icon, { IconButton } from '../../common/component/Icon'
import PaginationPage from '../../common/component/Pagination'
import { Indexing } from '../users/UsersList'

export const QListItem = (props) =>{
    const {index, item, data,  callData } = props
    const { access_token } = useSelector((state)=>state?.allReducers);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onDeleteModal = (e, item) =>{
        dispatch(ShowModalConfirm({
            Title:"Are you Sure?",
            show:true,
            Description:" Are you want to delete Question?",
            id:"",
            callBackModal:()=>CallDeleteConfirm(item?.question_type, item?.id),
            ButtonSuccess:"Delete Question"
        }))
    }

    const CallDeleteConfirm = async (question_type, id) =>{
        const response = await GetDeleteQuestionAPI(access_token, question_type, id);
        if(response?.status === 200){
            dispatch(ShowToast({
                description:"Question deleted successfully",
                type:"success",
            }))
            if(data?.data?.length === 1 ){
                callData(data?.pagination?.current_page - 1);
            }else{
                callData(data?.pagination?.current_page);
            }
        }else{
            callData(1);
            if(response?.response?.status === 403){
                dispatch(SetCurrentUserLogin({access_token:""}))
            }
        }
    }
    return props?.IsFav?(
        <tr key={index?.toString()} className={"position-relative cursor-pointer"} >
            <th scope="row">{index+1}</th>
            <td>
                {item?.question}
            </td>

        </tr>
    ):(
        <tr key={index?.toString()} className={"position-relative cursor-pointer"} >
            <th scope="row">{Indexing(data, index)}</th>
            <td>
                {item?.question}
            </td>
            <td className='text-capitalize'>
                {item?.question_type}
            </td>
            <td>
                {DDMMYYYYTIME(item?.created_at)}
            </td>
            <td>
                <IconButton hidden={item?.question_type === "user" ?true:false} onClick={function(){
                    navigate("/questions/edit", {state:{...item, title:"edit"}})
                }} >
                    <Icon className="pencil" />
                </IconButton>
                <IconButton hidden={item?.question_type === "user" ?true:false} onClick={function(e){onDeleteModal(e, item)}}>
                    <Icon className="trash" />
                </IconButton>
            </td>
        </tr>
    )
}

export default function QuetionItemList(props) {
    const dispatch = useDispatch();
    const { questionlist } = useSelector((state)=>state?.allReducers);
    useEffect(function(){
        callData(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props?.listType, props?.filter]);

    const callData = async (current_page) =>{
        dispatch(await CallQuestionList(props?.listType, props?.filter, current_page));
    }
  return (
    <React.Fragment>
        <div className="table-responsive fade show">
        <table className="table table-responsive-sm">
            <thead>
                <tr>
                    <th scope="col">Sr.no</th>
                    <th scope="col">Question</th>
                    <th scope="col">Question Type</th>
                    <th scope="col" >Created At</th>
                    <th scope="col" style={{width:"105px"}}>Action</th>
                </tr>
            </thead>
            <tbody>
            {questionlist?.data?.map((item, index)=>(
                <QListItem
                    item={item}
                    data={questionlist}
                    index={index}
                    key={index.toString()}
                    callData={callData}
                />
            ))}
                {questionlist?.data?.length === 0 && (
                    <tr  >
                        <td align='center' colSpan={5}>
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
        pagination={questionlist?.pagination}
    />
    </React.Fragment>
  )
}
