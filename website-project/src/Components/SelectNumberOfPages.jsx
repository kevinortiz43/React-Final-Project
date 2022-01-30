import React, { useContext } from "react";
import { ContextSetPages } from "./APIDeals";
export default function SelectNumberOfPages() {
  const value = useContext(ContextSetPages);
  const handleOnChange = (event) => {
    value.pageSet(event.target.value);
  };

  return (
    <div>
      <select onClick={handleOnChange}>
        <option value={15}>Default number of items </option>
        <option value={30}>More items </option>
        <option value={60}>Max items </option>
      </select>
    </div>
  );
}
