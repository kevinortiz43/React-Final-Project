import React,{useContext} from "react";
import {ContextSetSortBy} from "./APIFree"


export default function SelectSort() {
  const value= useContext(ContextSetSortBy)
  const handleOnChange = (event) => {
   value.sortSet(event.target.value);
  };


  return (
    <div>
      <select onClick={handleOnChange}>
        <option value={"alphabetical"}>alphabetical</option>
        <option value={"popularity"}>popularity</option>
        <option value={"release-date"}>release-date</option>
      </select>
    </div>
  );
}
