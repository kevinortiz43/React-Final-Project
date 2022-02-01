import React, { useState, useEffect, createContext, useReducer } from "react";
import axios from "axios";
import FreeSort from "./FreeSort";
import FreeCategory from "./FreeCategory";
import FreePlatform from "./FreePlatform";
import {GiSportMedal,GiRaceCar,GiBolterGun, GiTabletopPlayers, GiChessQueen,GiBattleGear } from "react-icons/gi"
export const ContextSetSortBy = createContext();
export const ContextSetCategory = createContext();
export const ContextSetPlatform = createContext();
function reducerSortBy(state,action)   {return action.payload;}
function reducerCategory(state,action) {return action.payload;}
function reducerPlatform(state,action) {return action.payload;}


export default function APIFree() {
  const [free, setFree] = useState([]);
  const [sortBy, dispatchSetSortBy] =    useReducer(reducerSortBy,"alphabetical");
  const [category, dispatchSetCategory] = useReducer(reducerCategory,"3d");
  const [platform, dispatchSetPlatform] = useReducer(reducerPlatform,"all");

  let setUpFree = {
    method: "GET",
    url: `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${sortBy}&category=${category}&platform=${platform}`,
    headers: {
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      "x-rapidapi-key": "67ab11fd54msh4efb98e8f929171p12a5c7jsn3604bc8c7753",
    },
  };

  function freeAPICall() {
    axios
      .request(setUpFree)
      .then(function (response) {
        setFree(response.data);
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function sortSet(sort) {
    dispatchSetSortBy({type:"switching sort", payload: sort});
  }

  function categorySet(categoryParams) {
    dispatchSetCategory({type:"switching categories", payload: categoryParams});
  }

  function platformSet(platformParams) {
    dispatchSetPlatform({type:"changing platform", payload: platformParams });
  }

  useEffect(() => {
    freeAPICall();
  }, [sortBy, category, platform]);

  return (
    <div>
      <div className="Free-Store-Category">
       
       <div className="freeSort">
        <ContextSetSortBy.Provider value={{ sortSet: sortSet }}>
          <h3>Sort By:</h3>
          <FreeSort />
        </ContextSetSortBy.Provider>
        </div>
          
        <div className="freeFilter">
        <ContextSetCategory.Provider value={{ settingCategory: categorySet }}>
          <h3>Filter: </h3>
          <FreeCategory />
        </ContextSetCategory.Provider>
        </div>

         <div className="freePlatforms"> 
        <ContextSetPlatform.Provider value={{ platformSet: platformSet }}>
          <h3>Platforms:</h3>
          <FreePlatform />
        </ContextSetPlatform.Provider>
        </div>

      </div>

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
              
              {free.genre === "Shooter"
              ?(<p>{free.genre} <GiBolterGun /></p>)
              :(free.genre === "MMORPG")
              
              ?(<p>{free.genre} <GiTabletopPlayers/></p>)
              :(free.genre ==="Strategy")
              
              ?(<p>{free.genre} <GiChessQueen/></p>)
              :( free.genre === "MOBA")
              
              ?(<p>{free.genre} <GiBattleGear/></p>)
              :(free.genre==="Racing")
              
              ? (<p>{free.genre} <GiRaceCar /></p>)
              : (free.genre === "Sports")
              
              ?(<p>{free.genre} <GiSportMedal /></p>)
              :(free.genre === "Social"
              
              
              )}

              <h3>Platform</h3>
              <p>{free.platform} </p>

              <h3>Description</h3>
              <p>{free.short_description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
