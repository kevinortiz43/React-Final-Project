import React, { useState, useEffect, useReducer, createContext } from "react";
import axios from "axios";
import SelectCategory from "./SelectCategory";
import DealsStore from "./DealsStore";
import SelectDirection from "./SelectDirection";
import SelectNumberOfPages from "./SelectNumberOfPages";
export const ContextSetCategories = createContext();
export const ContextSetDirection = createContext();
export const ContextSetPages = createContext();
function reducerDirection(state, action) {return action.payload;}
function reducerCategory(state, action) {return action.payload;}
function reducerPage(state,action) {return action.payload}

export default function APIDeals() {
  const [deals, setDeals] = useState([]);
  const [sortCategory, dispatchSortCategory] = useReducer(reducerCategory,"Reviews");
  const [count, setCount] = useState(1);
  const [pageSize, dispatchSetPageSize] = useReducer(reducerPage, 15);
  const [sortDirection, dispatchSortDirection] = useReducer(reducerDirection,0);
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
        console.log(tempArray);
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
    dispatchSortCategory({ type: "sorting-the-category", payload: category });
    setCount(1);
  }
  function directionSet(direction) {
    dispatchSortDirection({ type: "switching-direction", payload: direction });
    setCount(1);
  }
  function pageSet(page) {
    dispatchSetPageSize({type:"setting number", payload: page});
    setCount(1);
  }

  function Searching(anything) {
    setSearchBar(anything.target.value);
    setCount(1);
  }

  useEffect(() => {
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <ContextSetCategories.Provider value={{ categorySet: categorySet }}>
            <h3>Categories</h3>
            <SelectCategory />
          </ContextSetCategories.Provider>
        </div>

        <div className="direction">
          <ContextSetDirection.Provider value={{ directionSet: directionSet }}>
            <h3>Direction</h3>
            <SelectDirection />
          </ContextSetDirection.Provider>
        </div>

        <div className="pageSize">
          <ContextSetPages.Provider value={{ pageSet: pageSet }}>
            <h3>Number items per page</h3>
            <SelectNumberOfPages />
          </ContextSetPages.Provider>
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
              style={{border:"solid"}}
              />{" "}
            <br />
            <p>Normal Price: ${deals.normalPrice}</p>
            <div className="Deals-Containers">
            {deals.sales.map((deals, index) => {
              return <DealsStore deals={deals} key={index} />;
            })}{" "}
            </div>
            {deals.steamAppID === null ? (
              <p> Steam page not available </p>
              ) : (
              <a
                href={`https://store.steampowered.com/app/${deals.steamAppID}`}
              >
                Steam Store page
              </a>
            )}
            <h3> Steam Rating:</h3>
            {deals.steamAppID === null ? (
              <p style={{ color: "red" }}> No score available</p>
            ) : deals.steamRatingPercent > 70 ? (
              <p style={{ color: "green" }}>{deals.steamRatingPercent}%</p>
            ) : deals.steamRatingPercent >= 50 &&
              deals.steamRatingPercent < 70 ? (
              <p style={{ color: "yellow" }}>{deals.steamRatingPercent}%</p>
            ) : (
              <p style={{ color: "red" }}>{deals.steamRatingPercent}%</p>
            )}


            {deals.steamAppID === null ? (
              <p style={{ color: "red" }}></p>
            ) : deals.steamRatingPercent > 70 ? (
              <p style={{ color: "green" }}>{deals.steamRatingText}</p>
            ) : deals.steamRatingPercent >= 50 &&
              deals.steamRatingPercent < 70 ? (
              <p style={{ color: "yellow" }}>{deals.steamRatingText}</p>
            ) : (
              <p style={{ color: "red" }}>{deals.steamRatingText}</p>
            )}

            <a href={`https://www.metacritic.com${deals.metacriticLink}`}>
              Metacritic review
            </a>
            <h3>Metacritic Rating:</h3>
            {deals.metacriticScore > 0 ? (
              <p style={{ color: "green" }} className="Rating-Percentage">
                {" "}
                {deals.metacriticScore}%
              </p>
            ) : (
              <p style={{ color: "red" }}>No score available </p>
            )}
  
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
          <ContextSetCategories.Provider value={{ categorySet: categorySet }}>
            <h3>Categories</h3>
            <SelectCategory />
          </ContextSetCategories.Provider>
        </div>

        <div className="direction">
          <ContextSetDirection.Provider value={{ directionSet: directionSet }}>
            <h3>Direction</h3>
            <SelectDirection />
          </ContextSetDirection.Provider>
        </div>

        <div className="pageSize">
          <ContextSetPages.Provider value={{ pageSet: pageSet }}>
            <h3>Number items per page</h3>
            <SelectNumberOfPages />
          </ContextSetPages.Provider>
        </div>

        <div className="pageButtons">
          <h3>Page: {count}</h3>
          <button className="Previous-Page" onClick={firstPage}>
            First Page
          </button>

          <button className="Previous-Page" onClick={previousPage}>
            {"Last"}
          </button>
          <button className="Next-Page" onClick={nextPage}>
            {"Next"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
