import React, { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import SelectCategory from "./SelectCategory";
import DealsStore from "./DealsStore";
import SelectDirection from "./SelectDirection";
import SelectNumberOfPages from "./SelectNumberOfPages";
function reducerDirection(state, action) {
  console.log(action);
  return action.payload;
}
function reducerSetCount(state, action) {
  return action.payload;
}

export default function APIDeals() {
  const [deals, setDeals] = useState([]);
  const [sortCategory, setSortCategory] = useState("Reviews");
  const [count, setCount] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [sortDirection, dispatchSortDirection] = useReducer(
    reducerDirection,
    0
  );
  const [searchBar, setSearchBar] = useState("");

  function apiCall() {
    axios
      .request(setUpDeals)
      .then(function (response) {
        let tempArray = [];
        response.data.forEach((dataElement) => {
          if (
            tempArray.find((element) => element.title === dataElement.title)
          ) {
            tempArray[
              tempArray.findIndex(
                (individual) => individual.title === dataElement.title
              )
            ].sales.push({
              salePrice: dataElement.salePrice,
              savings: dataElement.savings,
              storeID: dataElement.storeID,
            });
          } else
            tempArray.push({
              title: dataElement.title,
              thumb: dataElement.thumb,
              normalPrice: dataElement.normalPrice,
              steam: dataElement.steam,
              steamRatingPercent: dataElement.steamRatingPercent,
              steamRatingCount: dataElement.steamRatingCount,
              steamRatingText: dataElement.steamRatingText,
              metacriticLink: dataElement.metacriticLink,
              metacriticScore: dataElement.metacriticScore,
              steamAppID: dataElement.steamAppID,
              sales: [
                {
                  salePrice: dataElement.salePrice,
                  savings: dataElement.savings,
                  storeID: dataElement.storeID,
                },
              ],
            });
        });

        setDeals(tempArray);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const firstPage = () => {
    setCount(1);
  };
  const nextPage = () => {
    setCount((count) => {
      if (count >= 50) return count;
      return count + 1;
    });
    console.log("nextPage");
  };
  const previousPage = () => {
    setCount((count) => {
      if (count <= 1) return count;
      return count - 1;
    });
  };
  const setUpDeals = {
    method: "get",
    url: `https://www.cheapshark.com/api/1.0/deals?sortBy=${sortCategory}&onSale=1&pageNumber=${
      count - 1
    }&desc=${sortDirection}&pageSize=${pageSize}&title=${searchBar}`,
    headers: {},
  };

  function categorySet(category) {
    setSortCategory(category);
    setCount(1);
  }
  function directionSet(direction) {
    dispatchSortDirection({ type: "switching-direction", payload: direction });
    setCount(1);
  }
  function pageSet(page) {
    setPageSize(page);
    setCount(1);
  }

  function Searching(anything) {
    setSearchBar(anything.target.value);
    setCount(1);
  }

  useEffect(() => {
    apiCall();
  }, [sortCategory, count, sortDirection, pageSize, searchBar]);

  return (
    <div>
      <div className="Deals-Category">
        <form className="searchBar">
          <h3>Searchbar:</h3>
          <input
            className="Deals-searchBar"
            type="text"
            placeholder="Search for a game here..."
            value={searchBar}
            onChange={(search) => Searching(search)}
          ></input>
        </form>

        <div className="category">
          <h3>Categories</h3>
          <SelectCategory categorySet={categorySet} />
        </div>

        <div className="direction">
          <h3>Direction</h3>
          <SelectDirection directionSet={directionSet} />
        </div>

        <div className="pageSize">
          <h3>Number items per page</h3>
          <SelectNumberOfPages pageSet={pageSet} />
        </div>

        <div className="pageButtons">
          <h3>Page: {count}</h3>

          <button className="Previous-Page" onClick={firstPage}>
            First Page
          </button>

          <button className="Previous-Page" onClick={previousPage}>
            {" "}
            {"Last"}
          </button>

          <button className="Next-Page" onClick={nextPage}>
            {" "}
            {"Next"}{" "}
          </button>
        </div>
      </div>
      <div className="Deals-Container">
        {deals.map((deals, index) => (
          <div className="Deals" key={index}>
            <h2> Title:</h2>
            <h4>{deals.title}</h4>
            <img
              className="Video-Game-Thumbnails"
              alt="Video Game Thumbnails"
              src={deals.thumb}
            />{" "}
            <br />
            <a href={`https://store.steampowered.com/app/${deals.steamAppID}`}>
              Steam Store page
            </a>
            <h3> Steam Rating:</h3>
            {deals.steamRatingPercent >= 50 ? (
              <p style={{ color: "green" }}>{deals.steamRatingPercent}%</p>
            ) : (
              <p style={{ color: "red" }}>{deals.steamRatingPercent}%</p>
            )}
            {deals.steamRatingText === "Overwhelmingly Positive" ? (
              <h4 style={{ color: "green" }}> {deals.steamRatingText} </h4>
            ) : (
              <h4> {deals.steamRatingText} </h4>
            )}
            <a href={`https://www.metacritic.com${deals.metacriticLink}`}>
              Metacritic review
            </a>
            <h3>Score:</h3>
            {deals.metacriticScore > 0 ? (
              <p style={{ color: "green" }} className="Rating-Percentage">
                {deals.metacriticScore}
              </p>
            ) : (
              <p style={{ color: "red" }}>No score available </p>
            )}
            <p>Normal Price: ${deals.normalPrice}</p>
            {deals.sales.map((deals, index) => {
              return <DealsStore deals={deals} key={index} />;
            })}{" "}
          </div>
        ))}
      </div>
      <div className="Deals-Category">
        <form className="searchBar">
          <h3>Searchbar:</h3>
          <input
            className="Deals-searchBar"
            type="text"
            placeholder="Search for a game here..."
            value={searchBar}
            onChange={(search) => Searching(search)}
          ></input>
        </form>

        <div className="category">
          <h3>Categories</h3>
          <SelectCategory categorySet={categorySet} />
        </div>

        <div className="direction">
          <h3>Direction</h3>
          <SelectDirection directionSet={directionSet} />
        </div>

        <div className="pageSize">
          <h3>Number items per page</h3>
          <SelectNumberOfPages pageSet={pageSet} />
        </div>

        <div className="pageButtons">
          <h3>Page: {count}</h3>
          <button className="Previous-Page" onClick={firstPage}>
            First Page
          </button>

          <button className="Previous-Page" onClick={previousPage}>
            {" "}
            {"Last"}
          </button>
          <button className="Next-Page" onClick={nextPage}>
            {" "}
            {"Next"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
