/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import FileLibraryCard from "./FileLibraryCard";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import FileLibraryPager from "./FileLibraryPager";
import FilePreviewPopup from "./../../common/FilePreviewPopup";
import { useSelector, useDispatch } from "react-redux";
import { CallGetFilesList } from "../../../redux/actions/utils";
import PaginationPage from "./../../common/PaginationPage"

const FileLibrary = (props) => {
    const [selectedItem, setSelectedItem] = useState([]);
    const dispatch = useDispatch()
    const URL = window.location.href.substring(window.location.href.lastIndexOf('/') + 1).toString();
    const MediaModal =  useSelector((state)=>state?.allReducers?.MediaModal);
    const [page, setPage] = useState(1);
    const [ModalPreview, SetModalPreview] = useState({
        show:false,
        file_path:""
    });
    useEffect(()=>{
        if(MediaModal === true){
            callOpenModal()
        }
    },[MediaModal === true]);

    const callOpenModal = async () =>{
        dispatch(await CallGetFilesList("all", 1));
    }
    
    const itemsPerPage = 12;
    function sortArray(a, b) {
        try {
            const property = props.sortProperty;
            let valA = property !== undefined ? a[property] : 0;
            let valB = property !== undefined ? b[property] : 0;
            // If string, ignore upper and lowercase
            if (typeof valA === "string")
                valA = valA.toUpperCase();
            if (typeof valB === "string")
                valB = valB.toUpperCase();
            if (props.sortAscending) {
                return (valA < valB) ? -1 : 1;
            }
            else {
                return (valA > valB) ? -1 : 1;
            }
        }
        catch (_a) {
            return 0;
        }
    }
    const callSelectList = (element) =>{
        const oldData = [...selectedItem];
        const result = oldData?.filter((item)=>item.id === element?.id);
        if(result?.length === 0){
            oldData.push(element);
            setSelectedItem(oldData)
        }else{
            const data = oldData?.filter((item)=>item.id !== element?.id)
            setSelectedItem(oldData?.filter((item)=>item.id !== element?.id))
        }
        // if(element)
        // setSelectedItem(element)
    }
    const callDeleteFiles = async () =>{
        if(props.fileDeleteCallback){
            await props.fileDeleteCallback(selectedItem);
            setSelectedItem([]);
        }
    }
    function renderList() {
        if (!props.fileLibraryList)
            return [];
        // const arrayStart = (page - 1) * itemsPerPage;
        // let arrayEnd = arrayStart + itemsPerPage;
        // if (arrayEnd > props.fileLibraryList.length) {
        //     arrayEnd = props.fileLibraryList.length;
        // }
        return [...props.fileLibraryList]
            .sort(sortArray)
            // .slice(arrayStart, arrayEnd)
            .map((element, index) => {
                const data = selectedItem?.filter((item)=>item.id === element?.id);
                const itemss = data?.length === 0?undefined:data[0];
            return (
                <Col key={index} xs={12} sm={12} md={12} lg={12} className="mb-3" onClick={() =>
                    // URL !== "dashboard" && 
                    callSelectList(element)
                } >
                    <props.libraryCardComponent
                        callMediaFiles={props?.callMediaFiles}
                        data={props?.MediaFile}
                        SetModalPreview={SetModalPreview}
                        ModalPreview={ModalPreview}
                        selectedItem={itemss }
                        setSelectedItem={setSelectedItem}
                        {...element}
                    />
                </Col>
            );
        });
    }
    const SubmitRow = () => (
        selectedItem?.length > 0 && (
            <Row className="mt-1">
                <Col className="text-right ">
                    {(props.fileDeleteCallback !== undefined) && (
                        <Button
                            variant="danger"
                            onClick={callDeleteFiles}
                            className="mr-3"
                        >
                            {props.deleteButtonLabel}
                        </Button>
                    )}
                    <Button variant="primary" className="ml-2" onClick={() => props.fileSelectCallback&& props.fileSelectCallback(selectedItem)}>
                        { props.selectButtonLabel}
                    </Button>
                </Col>
            </Row>
        )
    );
    const onHide = () =>{
        SetModalPreview({
            show:false,
            file_path:""
        })
    }
    const PagerRow = () => ((props.fileLibraryList) && (props.fileLibraryList.length > itemsPerPage) && <Row>
       <Col className="d-flex justify-content-center">
           <FileLibraryPager
                count={props.fileLibraryList.length}
                page={page}
                pagerCallback={(number) => setPage(number)}
                itemsPerPage={itemsPerPage}
           />
        </Col>
    </Row>);

    return (
        <React.Fragment>
            <Row className="py-3 media-list-grid">
                {renderList()}
                <FilePreviewPopup show={ModalPreview?.show} onHide={onHide} file_path={ModalPreview?.file_path} />
                {/* <PagerRow/> */}
            </Row>
            <PaginationPage
                handleChange={props?.callMediaFiles}
                nopagination={false}
                pagination={props?.MediaFile?.pagination}
                data={props.fileLibraryList}
            />
            <SubmitRow/>
        </React.Fragment>
        )
};
FileLibrary.defaultProps = {
    sortProperty: "created_at",
    sortAscending: false,
    libraryCardComponent: FileLibraryCard
};
export default FileLibrary;
