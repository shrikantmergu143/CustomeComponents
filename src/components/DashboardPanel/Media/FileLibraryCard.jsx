/* eslint-disable no-undef */
import React from "react";
import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
// import ListGroupItem from "react-bootstrap/ListGroupItem";
import Icon from "./../../common/Icon"
import Image from "../../common/Image";
import formatBytes from "./../../../utils/formatBytes";
import formatDate from "./../../../utils/formatDate";
import { getExtension } from "./ReactMediaLibraryWrapper";
import FileMenu from "./FileMenu";
export function start_and_end(str) {
    if (str.length > 31) {
      return str.substr(0, 10) + '...' + str.substr(str.length-15, str.length);
    }
    return str;
}
const FileLibraryCard = (props) => {

    return (
    <React.Fragment>
        <Card className={`mediacard ${(props.selectedItem !== undefined && props.selectedItem.id === props.id) ? "primary" : undefined}`}>
            <FileMenu {...props} />
            {(props.file_name && getExtension(props?.file_name) === "pdf") && (
                <div className="pdf_file">
                    <Image className={getExtension(props.file_name)} />
                </div>
            )}
            {(props.file_name && (getExtension(props?.file_name) === "png" || getExtension(props?.file_name) === "svg")) && 
                <div className="pdf_file">
                    <Card.Img  src={process.env.REACT_APP_BASE_URL +"/media/" + props?.file_path} />
                </div>
            }
            {(props.file_real_name) &&
                <Card.Body>
                    <Card.Title>
                        <Icon className={props.file_real_name && getExtension(props?.file_real_name) === "pdf"?"pdf_icon primary": "images danger"} /> <span>{start_and_end(props.file_real_name)} </span>
                    </Card.Title>
                    <span>
                        {(props.file_size) && <span className="file_size">{formatBytes(props.file_size)}</span>}
                        {(props.created_at) && <span className="file_date">{formatDate(new Date(props.created_at))}</span>}
                    </span>
                </Card.Body>
            }
            {/* <ListGroup className="list-group-flush small">
                {(props.title) && <ListGroupItem>{props.title}</ListGroupItem>}
                {(props.size) && <ListGroupItem>{formatBytes(props.size)}</ListGroupItem>}
                {(props.created_at) && <ListGroupItem>{formatDate(new Date(props.created_at))}</ListGroupItem>}            
            </ListGroup> */}
        </Card>
    </React.Fragment>
    );
};
FileLibraryCard.defaultProps = {
    id:"",
    file_name:"",
    title:"",
    description:"",
    size:'',
    created_at:"",
    file_url:""
}
export default FileLibraryCard;
