import React, { useState, useEffect, createContext, useReducer } from "react";
import axios from "axios";
import FreeSort from "./FreeSort";
import FreeCategory from "./FreeCategory";
import FreePlatform from "./FreePlatform";
import {
  GiJasonMask,
  GiStoneTower,
  GiLaptop,
  GiJetFighter,
  GiBrassKnuckles,
  GiMaterialsScience,
  GiCrocSword,
  GiPencilBrush,
  GiPerson,
  Gi3DMeeple,
  GiDungeonGate,
  GiBattleAxe,
  GiCardDraw,
  GiDeathZone,
  GiStrong,
  GiLaddersPlatform,
  GiSailboat,
  GiSpaceship,
  GiGreatWarTank,
  GiBullyMinion,
  GiPlayerTime,
  GiCrosshair,
  GiReturnArrow,
  GiRaiseZombie,
  GiVortex,
  GiWarPick,
  GiSwissArmyKnife,
  GiPlayerNext,
  GiBowieKnife,
  GiJetpack,
  GiEarthAmerica,
  GiPartyFlags,
  GiSportMedal,
  GiRaceCar,
  GiBolterGun,
  GiTabletopPlayers,
  GiChessQueen,
  GiBattleGear,
} from "react-icons/gi";
export const ContextSetSortBy = createContext();
export const ContextSetCategory = createContext();
export const ContextSetPlatform = createContext();
function reducerSortBy(state, action) {
  return action.payload;
}
function reducerCategory(state, action) {
  return action.payload;
}
function reducerPlatform(state, action) {
  return action.payload;
}

export default function APIFree() {
  const [free, setFree] = useState([]);
  const [sortBy, dispatchSetSortBy] = useReducer(reducerSortBy, "alphabetical");
  const [category, dispatchSetCategory] = useReducer(reducerCategory, "3d");
  const [platform, dispatchSetPlatform] = useReducer(reducerPlatform, "all");

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
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function sortSet(sort) {
    dispatchSetSortBy({ type: "switching sort", payload: sort });
  }

  function categorySet(categoryParams) {
    dispatchSetCategory({
      type: "switching categories",
      payload: categoryParams,
    });
  }

  function platformSet(platformParams) {
    dispatchSetPlatform({ type: "changing platform", payload: platformParams });
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

              {free.genre === "Shooter" ? (
                <p>
                  {free.genre} <GiBolterGun />
                </p>
              ) : free.genre === "MMORPG" ? (
                <p>
                  {free.genre} <GiTabletopPlayers />
                </p>
              ) : free.genre === "Strategy" ? (
                <p>
                  {free.genre} <GiChessQueen />
                </p>
              ) : free.genre === "MOBA" ? (
                <p>
                  {free.genre} <GiBattleGear />
                </p>
              ) : free.genre === "Racing" ? (
                <p>
                  {free.genre} <GiRaceCar />
                </p>
              ) : free.genre === "Sports" ? (
                <p>
                  {free.genre} <GiSportMedal />
                </p>
              ) : free.genre === "Social" ? (
                <p>
                  {free.genre} <GiPartyFlags />
                </p>
              ) : free.genre === "Sandbox" ? (
                <p>
                  {free.genre} <GiJetpack />
                </p>
              ) : free.genre === "Open-World" ? (
                <p>
                  {free.genre}
                  <GiEarthAmerica />
                </p>
              ) : free.genre === "Survival" ? (
                <p>
                  {free.genre}
                  <GiSwissArmyKnife />
                </p>
              ) : free.genre === "PVP" ? (
                <p>
                  {free.genre}
                  <GiPlayerNext />
                </p>
              ) : free.genre === "PVE" ? (
                <p>
                  {free.genre}
                  <GiBowieKnife />
                </p>
              ) : free.genre === "Pixel" ? (
                <p>
                  {free.genre} <GiWarPick />{" "}
                </p>
              ) : free.genre === "Voxel" ? (
                <p>
                  {free.genre} <GiVortex />{" "}
                </p>
              ) : free.genre === "Zombie" ? (
                <p>
                  {free.genre} <GiRaiseZombie />{" "}
                </p>
              ) : free.genre === "Turn-Based" ? (
                <p>
                  {free.genre} <GiReturnArrow />{" "}
                </p>
              ) : free.genre === "First-Person" ? (
                <p>
                  {free.genre} <GiCrosshair />{" "}
                </p>
              ) : free.genre === "Third-Person" ? (
                <p>
                  {free.genre} <GiPlayerTime />{" "}
                </p>
              ) : free.genre === "Top-Down" ? (
                <p>
                  {free.genre} <GiBullyMinion />{" "}
                </p>
              ) : free.genre === "Tank" ? (
                <p>
                  {free.genre} <GiGreatWarTank />{" "}
                </p>
              ) : free.genre === "Space" ? (
                <p>
                  {free.genre} <GiSpaceship />{" "}
                </p>
              ) : free.genre === "Sailing" ? (
                <p>
                  {free.genre} <GiSailboat />{" "}
                </p>
              ) : free.genre === "Side-Scroller" ? (
                <p>
                  {free.genre} <GiLaddersPlatform />{" "}
                </p>
              ) : free.genre === "Superhero" ? (
                <p>
                  {free.genre} <GiStrong />{" "}
                </p>
              ) : free.genre === "Permadeath" ? (
                <p>
                  {free.genre} <GiDeathZone />{" "}
                </p>
              ) : free.genre === "Card" || free.genre === "Card Game" ? (
                <p>
                  {free.genre} <GiCardDraw />{" "}
                </p>
              ) : free.genre === "Battle-Royale" ? (
                <p>
                  {free.genre} <GiBattleAxe />{" "}
                </p>
              ) : free.genre === "MMO" ||
                free.genre === "MMOFPS" ||
                free.genre === "MMOTPS" ||
                free.genre === "MMORTS" ? (
                <p>
                  {free.genre} <GiDungeonGate />{" "}
                </p>
              ) : free.genre === "3d" ? (
                <p>
                  {free.genre} <Gi3DMeeple />{" "}
                </p>
              ) : free.genre === "2d" ? (
                <p>
                  {free.genre} <GiPerson />{" "}
                </p>
              ) : free.genre === "Anime" ? (
                <p>
                  {free.genre} <GiPencilBrush />{" "}
                </p>
              ) : free.genre === "Fantasy" ? (
                <p>
                  {free.genre} <GiCrocSword />{" "}
                </p>
              ) : free.genre === "Sci-Fi" || free.genre === "Sci Fi" ? (
                <p>
                  {free.genre} <GiMaterialsScience />{" "}
                </p>
              ) : free.genre === "Fighting" ||
                free.genre === "Martial-Arts" ||
                free.genre === "Martial Arts" ? (
                <p>
                  {free.genre} <GiBrassKnuckles />{" "}
                </p>
              ) : free.genre === "Flight" ? (
                <p>
                  {free.genre} <GiJetFighter />{" "}
                </p>
              ) : free.genre === "Low-Spec" || free.genre === "Low Spec" ? (
                <p>
                  {free.genre} <GiLaptop />{" "}
                </p>
              ) : free.genre === "Tower-Defense" ||
                free.genre === "Tower Defense" ? (
                <p>
                  {free.genre} <GiStoneTower />{" "}
                </p>
              ) : free.genre === "Horror" ? (
                <p>
                  {free.genre} <GiJasonMask />{" "}
                </p>
              ) : (
                free.genre
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
