import React, { useContext } from "react";
import { ContextSetCategories } from "./APIDeals";

export default function SelectCategory() {
  const value = useContext(ContextSetCategories);
  const handleOnChange = (event) => {
    value.categorySet(event.target.value);
  };

  return (
    <div>
      <select onClick={handleOnChange}>
        <option value={"Reviews"}>By Reviews</option>
        <option value={"Deal Rating"}>By best deal</option>
        <option value={"Savings"}>By Savings</option>
        <option value={"Metacritic"}>By Metacritic reviews</option>
        <option value={"recent"}>Most Recent</option>
        <option value={"Store"}>Store</option>
        <option value={"Title"}>By Title</option>
        <option value={"Price"}>By Price</option>
      </select>
    </div>
  );
}

