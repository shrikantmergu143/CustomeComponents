/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from "react";
import { Dropdown, FormSelect, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setStoreRecoredLimit } from "../../redux/actions";

const PageListInfo = (props) =>{
  const { record_limit } = props
  const dispatch = useDispatch();
  useEffect(()=>{
    if(record_limit === undefined){
      dispatch(setStoreRecoredLimit(10));
    }
  },[]);
  const onSelect = (e)=>{
    dispatch(setStoreRecoredLimit(e.target.value));
  }
  return (
    <div className="pages-list"> 
        List Per Page
        <FormSelect value={record_limit} onChange={onSelect}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </FormSelect>
      <span>
      {1 + ((props?.pagination?.current_page-1)*record_limit)} - { props?.data?.length + ((props?.pagination?.current_page-1)*record_limit)} of {props?.pagination?.total_records}
      </span>
    </div>
  )
}

function PaginationPage(props) {
  let active = props?.pagination?.current_page;
  const record_limit = useSelector((state)=>state?.allReducers?.record_limit);
  const length = Math.ceil((props?.pagination?.total_records)  / props?.pagination?.record_limit)
  let items = [];
  for (let number = 1; number <= length ; number++) {
    items.push(
      <Pagination.Item onClick={function(){
        if(number === active){
          return null;
        }else{
          props?.handleChange(number)
        }
      }} key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  return props?.data?.length > 0 && props?.pagination?.total_records > 10 && (
    <div className="CommonPagination">
        <PageListInfo {...props} record_limit={record_limit} />
        <Pagination size="lg">
            <Pagination.Prev onClick={function(){
              if(active === 1){
                return null;
              }else{
                props?.handleChange(active - 1)
              }
            }}  />
                {items}
            <Pagination.Next onClick={function(){
                if(active === length){
                  return null;
                }else{
                  props?.handleChange(active + 1)
                }
            }}  />
        </Pagination>
    </div>
  );
}
export default PaginationPage;
