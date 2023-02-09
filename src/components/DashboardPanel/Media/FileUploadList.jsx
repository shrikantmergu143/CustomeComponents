/* eslint-disable default-case */
import React from "react";
import Badge from "react-bootstrap/Badge";
function RenderBadge({status}) {
    switch (status) {
        case -1:
            return <Badge variant="danger"  >Failed</Badge>;
        case 0:
            return  <Badge variant="secondary"  >Processing</Badge>;
        case 1:
            return <Badge variant="success"  >Success</Badge>
    }
    return;
}
const FileUploadList = (props) => {
    function RenderList() {
        return props.fileUploadList.map((element, index) => {
            return (
                <li key={index} className={"list-group-item d-flex justify-content-between align-items-center" }>
                    {element.file_name}
                    <RenderBadge status={element.status}/>
                </li>
            );
        });
    }
    return (
        <React.Fragment>
            {(props.fileUploadList.length > 0) && <h3>Uploaded Files</h3>}
            <ul className="list-groups p-0">
                <RenderList/>
            </ul>
        </React.Fragment>
    )
};
export default FileUploadList;
