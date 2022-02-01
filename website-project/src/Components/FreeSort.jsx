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
        <option value={"alphabetical"}>Alphabetical</option>
        <option value={"popularity"}>Popularity</option>
        <option value={"release-date"}>Release-date</option>
      </select>
    </div>
  );
}
