/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { UUID4 } from './InputGroup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike', 'image'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge',] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
const Texteditor = (props) => {
    const id = UUID4()

    return (
        <div className={`${props?.formClass} form-group animate__fadeIn`}>
            {props?.label && <label htmlFor={id} className='form-label' >
                {props?.label} {props?.require && <span className='text-danger'> *</span>}
            </label>}
            <ReactQuill
                theme="snow"
                value={props?.value}
                onChange={props?.onChange}
                modules={{toolbar: toolbarOptions}}
                className={"TextEditor"}
                placeholder={props?.placeholder}
                id={id}
            />
            {/* 
                <div className='ql-container ql-snow border-0'>
                    <div className='ql-editor ' dangerouslySetInnerHTML={{__html:description}}></div>
                </div>
            */}
            {props?.errors && <span className='text-danger animate__fadeIn'>{props?.errors}</span>}
        </div>
    );
}

export default Texteditor;

