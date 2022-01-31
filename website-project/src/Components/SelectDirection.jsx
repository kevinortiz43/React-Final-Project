import React, { useContext } from "react";
import { ContextSetDirection } from "./APIDeals";

export default function SelectDirection() {
  const value = useContext(ContextSetDirection);
  const handleOnChange = (event) => {
    value.directionSet(event.target.value);
  };

  return (
    <div>
      <select onClick={handleOnChange}>
        <option value={0}>By High to low</option>
        <option value={1}>By Low to high</option>
      </select>
    </div>
  );
}

