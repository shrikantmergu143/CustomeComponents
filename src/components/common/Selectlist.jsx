/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { SetShowMediaLibrary } from "../../redux/actions";
import { useDispatch } from "react-redux";

function Selectlist (props) {

    const dispatch = useDispatch();
    const randomId = Math.random().toString(16).slice(2);
    const [typing, setTyping] = useState("");
    const [cursor,setCursor] = useState(null);

    let dataList = [];
    if(props?.showlist && props?.list?.length > 0) {
      dataList = props?.list?.filter((item) => {
        const data =
           item?.value
            ?.toLowerCase()
            ?.includes(typing?.toLowerCase());
        return data;
      });
    }

    const onChangeHandler = (e) => {
     setTyping(e.target.value)
     props?.setShowlist(true);
    }

  const displaylist = (e) => {
     e.stopPropagation();
     e.preventDefault();
    if(props?.type === "media") {
      props?.setShowlist(false);
      dispatch(SetShowMediaLibrary(true))
    } else {
      setCursor(0);
      if(props?.showlist){
        props?.setShowlist(false);
     }else{
        props?.setShowlist(true);
      }
    }
  }

  const GotoMain = (value) => {
    if(props?.showlist && dataList?.length){
      const elses = document.getElementById(randomId+cursor);
      if(elses)
      document.getElementById('category-lists'+randomId).scrollTo({top: elses.offsetTop+ value, behavior: 'smooth' })
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      if(dataList?.length > 0 && props?.showlist){
        CallOnSelect(e, dataList[cursor], cursor)
      }
    }else if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor-1);
      GotoMain(-50);
    }else if (e.keyCode === 40 && cursor < dataList?.length - 1) {
      GotoMain(+10);
      setCursor(cursor+1);
    }
  }

  const CallOnSelect = (e, item, index) =>{
    e.preventDefault();
    e.stopPropagation();
    setCursor(0);
    setTyping("");
    props?.groupItemClick(e,item,index);
    props?.setShowlist(false);
 }

  return (
    <div className="position-relative multi-select-catlist">
        <label  className="custom-multi-select" onClick={(e)=>displaylist(e)}>
        <div className="first-area">
          {
            props?.selectedItem?.map((item,index) => item?.value && (
                <div key={index.toString()} className="parent-content">
                <div className="content-value">{item?.value}</div>
                <div role="button" className="cross-icon" onClick={(e)=>props?.removeItem(e,item)}>
                      <svg height="14" width="14" viewBox="0 0 20 20"  focusable="false" className="cross-icon-svg">
                      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z">
                      </path>
                      </svg>
                </div>
                </div>
            ))
           }
          <div className="input-area">
              <input
                id={randomId}
                onKeyDown={handleKeyDown}
                placeholder={props?.selectedItem?.length > 0 ? "" : props?.placeholder}
                value={typing}
                type="text"
                className="input-field"
                onChange={onChangeHandler}
              />
          </div>
        </div>
        <div className="second-area">
          {
             props?.sublist?.length > 0 && (
              <div className="cross-logo" onClick={(e)=> props?.clearSelected(e)}>
                <svg height="20" width="20" viewBox="0 0 20 20" focusable="false" className="cross-logo-svg">
                  <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                </svg>
              </div>
              )
          }
          <span className="vertical-line"></span>
          <div className="down-arrow-logo">
            <svg height="20" width="20" viewBox="0 0 20 20"  focusable="false" className="down-arrow-svg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
          </div>
        </div>
      </label>
        <React.Fragment>
        {
            props?.showlist && dataList?.length > 0 && (
                <ListGroup id={'category-lists'+randomId} className={"custom-category-list"}>
                {
                  dataList?.map((item,index)=> ( 
                        <ListGroup.Item className={cursor === index ? "actives" : "unactives"} id={randomId+index} key={index.toString()} onClick={e=> props?.groupItemClick(e, item, index)}>
                             {item?.value}
                        </ListGroup.Item>
                     ))
                }
                </ListGroup>
            )
        }
        </React.Fragment>
   </div>
  )
}
export default Selectlist;