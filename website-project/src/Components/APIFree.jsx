import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import FreeSort from "./FreeSort";
import FreeCategory from "./FreeCategory";
import FreePlatform from "./FreePlatform";
export const ContextSetSortBy = createContext();

export default function APIFree() {
  const [free, setFree] = useState([]);
  const [sortBy, setSortBy] = useState("alphabetical");
  const [category, setCategory] = useState("3d");
  const [platform, setPlatform] = useState("all");

  let setUpFree = {
    method: "GET",
    url: `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${sortBy}&category=${category}&platform=${platform}`,
    headers: {
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      "x-rapidapi-key": "67ab11fd54msh4efb98e8f929171p12a5c7jsn3604bc8c7753",
    },
  };

  function apiCall() {
    axios
      .request(setUpFree)
      .then(function (response) {
        console.log(response.data);
        setFree(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function sortSet(sort) {
    setSortBy(sort);
  }

  function categorySet(categoryParams) {
    setCategory(categoryParams);
  }

  function platformSet(platformParams) {
    setPlatform(platformParams);
  }

  useEffect(() => {
    apiCall();
  }, [sortBy, category, platform]);

  return (
    // .find()
    //  let numbers  =[3,10,15]
    // const newNumber =numbers.find(function(num){
    // return num>10
    // })
    <div className="Free-Store-Category">
      <ContextSetSortBy.Provider value={{ sortBy: sortSet }}>
        <h3>Sort By:</h3>
        <FreeSort />

        <h3>Platforms:</h3>
        <FreePlatform platformSet={platformSet} />

        <h3>Filter: </h3>
        <FreeCategory categorySet={categorySet} />

        <div className="Free-Container">
          {free.map((free, index) => (
            <div className="Free" key={index}>
              <h2>Title: </h2>
              <p>{free.title}</p>
              <a
                style={{ textDecoration: "none" }}
                href={free.freetogame_profile_url}
              >
                {" "}
                Review{" "}
              </a>{" "}
              <br /> <br />
              <a style={{ textDecoration: "none" }} href={free.game_url}>
                Download page
              </a>{" "}
              <br /> <br />
              <img
                className="Free-Videogame-Thumbnails"
                alt="Video Game Thumbnails"
                src={free.thumbnail}
              />
              <div className="Categories">
                <h3>Release date</h3>
                <p>{free.release_date}</p>

                <h3>Genre</h3>
                <p>{free.genre}</p>

                <h3>Platform</h3>
                <p>{free.platform}</p>

                <h3>Description</h3>
                <p>{free.short_description}</p>
              </div>
            </div>
          ))}
        </div>
      </ContextSetSortBy.Provider>
    </div>
  );
}
