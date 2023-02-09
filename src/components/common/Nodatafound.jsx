import React from "react";
import no_data from "../../assets/img/no_data_found.svg";

export default function Nodatafound (props) {

   return (
    <div className="no-data-found">
    <img src={no_data} alt="" className="no-data-svg"></img>
     <h5>{props?.title}</h5>
    </div>
   )

}
