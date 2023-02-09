/* eslint-disable react/jsx-no-bind */
import React from "react";
import { Pagination } from "react-bootstrap";

function PaginationPage(props) {
    let active = props?.pagination?.current_page;
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
  return length > 1 && (
    <div className="CommonPagination">
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
