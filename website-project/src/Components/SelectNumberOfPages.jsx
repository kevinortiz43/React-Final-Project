import React from "react";

export default function SelectNumberOfPages(props) {
  const handleOnChange = (event) => {
    props.pageSet(event.target.value);
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
