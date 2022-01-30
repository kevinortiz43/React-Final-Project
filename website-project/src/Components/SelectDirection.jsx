import React from "react";

function SelectDirection(props) {
  const handleOnChange = (event) => {
    props.directionSet(event.target.value);
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

export default SelectDirection;
