/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-mixed-operators */
import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import PropTypes from 'prop-types';
import { UUID4 } from "./InputGroup";

function ReactSelect (props) {
    const { isMulti, value } = props
    const [typing, setTyping] = useState("");
    const [changeValue, setChangeValue] = useState("")
    const [cursor,setCursor] = useState(null);
    const [ListState, setListState] = useState(false);
    const [readState, setreadState] = useState(false)
    const uuid = UUID4();
    let FilterList = [];
    if(changeValue){
        const CheckFilter = props?.options?.filter((label) => {
            const data =
                label?.label
                ?.toLowerCase()
                ?.includes(changeValue?.toLowerCase());
            return data;
        })
        if(isMulti){
            FilterList = CheckFilter?.filter((item)=>{
                const res = props?.value?.filter((item1)=>item1.value === item?.value);
                if(res?.length === 0){
                    return item;
                }
            })
        }else{
            FilterList = CheckFilter?.map((label) => {
                return label;
            })
        }
    }else{
        const CheckFilter = props?.options?.map((label) => {
            return label;
        })
        if(isMulti){
            FilterList = CheckFilter?.filter((item)=>{
                const res = props?.value?.filter((item1)=>item1.value === item?.value);
                if(res?.length === 0){
                    return item;
                }
            })
        }else{
            FilterList = CheckFilter?.map((label) => {
                return label;
            })
        }
    }
    const onSelect = (e) =>{
        if(e){
            if(props?.isMulti){
                const list = props?.value?.filter((item)=>item?.value!== e.value);
                list?.push(e)
                setChangeValue("")
                CloseListState()
                props?.onChange(list);
            }else{
                props?.onChange(e);
                CloseListState()
                setChangeValue("")
            }
        }else{
            props?.onChange([]);
        }
    }
    const GotoMain = (value) => {
        if(ListState){
        const elses = document.getElementById(uuid+cursor);
        if(elses)
            document.getElementById('category-lists'+uuid).scrollTo({top: elses.offsetTop+ value, behavior: 'smooth' })
        }
    }


    const handleKeyDown = (e) => {
        if( FilterList?.length>0 && ListState !== true){
            setCursor(0);
            setListState(true);
        }
        if(e.key === 'Enter'){
            e.preventDefault();
            if( FilterList?.length>0){
                if(FilterList[cursor]){
                    onSelect( FilterList[cursor])
                    CloseListState()
                }
            }
        }else if (e.keyCode === 38 && cursor > 0) {
            setCursor(cursor-1);
            GotoMain(-50)
        }else if (e.keyCode === 40 && cursor < FilterList.length - 1) {
            GotoMain(+10)
            setCursor(cursor+1);
        }
    }

    const CloseListState = () =>{
        setListState(false)
        setCursor(null)
        setreadState(false);
    }
    const onClickSelectInput = (e) =>{
        setListState(true);
        if(FilterList?.length && value?.label){
            FilterList?.forEach((item, index)=>{
                if(item?.value === value?.value)
                setCursor(index);
            })
        }else{
            setCursor(0)
        }
    }
    const RemoveSelect = (e)=>{
        const list = props?.value?.filter((item)=>item?.value!== e.value);
        props?.onChange(list);
    }
    const ReactSelectValue = () =>{
        return (
            props?.value?.map((item,index) => item?.value && (
                <div key={index.toString()} className="parent-content">
                    <div className="content-value">{item?.label}</div>
                    <div role="button" className="cross-icon" onClick={(e)=>RemoveSelect(item)}>
                        <svg height="14" width="14" viewBox="0 0 20 20"  focusable="false" className="cross-icon-svg">
                            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z">
                            </path>
                        </svg>
                    </div>
                </div>
            ))
        )
    }
    const ReactOptionsMultiple = () =>{
        if(FilterList?.length === 0){
            return(
                <ListGroup.Item disabled >
                    No data found
                </ListGroup.Item>
            )
        }
        return(
            FilterList.map((item,index)=> ( 
                <ListGroup.Item
                    key={index.toString()}
                    onClick={()=>onSelect(item)}
                    id={uuid+index}
                    className={`${value?.value === item?.value ? "active" : "unactives"} ${ cursor === index ? "cursor" : ""}`}
                >
                        {item?.label}
                </ListGroup.Item>
            ))
        )
    }
    const ReactOptions = () =>{
        if(FilterList?.length === 0){
            return(
                <ListGroup.Item disabled >
                    No data found
                </ListGroup.Item>
            )
        }
        return(
            FilterList?.map((item,index)=> ( 
                <ListGroup.Item
                    key={index.toString()}
                    onClick={()=>onSelect(item)}
                    id={uuid+index}
                    className={`${value?.value === item?.value ? "active" : "unactives"} ${ cursor === index ? "cursor" : ""}`}
                >
                        {item?.label}
                </ListGroup.Item>
            ))
        )
    }
    const ReactClearButton = () =>{
        return(
            props?.value?.length > 0 && (
                <div className="cross-logo" onClick={(e)=> onSelect()}>
                  <svg height="20" width="20" viewBox="0 0 20 20" focusable="false" className="cross-logo-svg">
                    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                  </svg>
                </div>
            )
        )
    }
    const ReactPlaceHolder = () =>{
        if(props?.isMulti === true){
            if(value?.length !== 0 ){
                return "";
            }else{
                return props?.placeholder;
            }
        }else{
            if(value !== null){
                return value?.label;
            }else{
                return  props?.placeholder;
            }
        }
        // !readState ?( value !== null ?value?.label:  props?.placeholder ):""
    }
    const ReactValue = () =>{
        if(changeValue){
            return changeValue;
        }else if(!changeValue){
            if(value?.label && !isMulti){
                return value?.label;
            }
            return "";
        }else if(!isMulti){
            return value?.label
        }
        // readState ? changeValue :  value !== null ?value?.label:  '' 
    }
    const onChangeHandler = (e) =>{
        if(ListState === false){
            setListState(true)
        }
        if(!isMulti){
            setreadState(true)
        }
        setCursor(0);
        setChangeValue(e.target.value)
    }
  return (
    <div className={`${props?.formClass} ${props?.errors ?"form_danger":''} position-relative multi-select-catlist react-select common-form form-group animate__fadeIn`}>
        {props?.label && 
            <label htmlFor={uuid} className='form-label' >
                {props?.label} {props?.require && <span className='text-danger'> *</span>}
            </label>
        }
        <label htmlFor={uuid} className={`custom-multi-select ${ListState?"active":""}`}  onClick={onClickSelectInput}>
            <div className="first-area">
                {props?.isMulti && (
                    <ReactSelectValue  />
                )}
                <div className="input-area">
                    <input
                        id={uuid}
                        type="text"
                        name={props.name}
                        className={`input-field `}
                        placeholder={ReactPlaceHolder()}
                        value={readState? changeValue :ReactValue()}
                        onKeyDown={handleKeyDown}
                        onChange={onChangeHandler}
                    />
                </div>
            </div>
            <div className="second-area">
                {props?.isMulti &&(
                    <ReactClearButton />
                )}
                <div className="down-arrow-logo">
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-1636szt" height={24} width={24} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon"><path d="M7 10l5 5 5-5z"></path></svg>
                </div>
            </div>
        </label>
        <React.Fragment>
            {ListState && props?.options?.length > 0 && (
                <ListGroup id={'category-lists'+uuid} className={"custom-category-list"}>
                    {props?.isMulti && (
                        <ReactOptionsMultiple  />
                    )}
                    {!props?.isMulti &&(
                        <ReactOptions/>
                    )}
                </ListGroup>
            )}
            {
                ListState && <div className="Backgrop" onClick={CloseListState} />
            }
        </React.Fragment>
   </div>
  );

}
ReactSelect.propTypes = {
    name:PropTypes?.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    isMulti:PropTypes?.bool,
    label:PropTypes?.any,
    formClass:PropTypes?.any,
    errors:PropTypes?.any,
};
ReactSelect.defaultProps = {
    name:"",
    placeholder:"",
    value:null,
    isMulti:false,
    label:"",
    formClass:"",
    errors:""
}
export default ReactSelect;