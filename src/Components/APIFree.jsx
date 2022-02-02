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
  GiAncientSword,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <h2>Release date: </h2>
              <p>{free.release_date}</p>

              <div className="Genre-Container"></div>
              <h2>Genre:</h2>
              
              {free.genre === "Shooter" ? (
                <h4>
                  {free.genre} <GiBolterGun />
                </h4>
              ) : free.genre === "MMORPG" ? (
                <h4>
                  {free.genre} <GiTabletopPlayers />
                </h4>
              ) : free.genre === "Strategy" ? (
                <h4>
                  {free.genre} <GiChessQueen />
                </h4>
              ) : free.genre === "MOBA" ? (
                <h4>
                  {free.genre} <GiBattleGear />
                </h4>
              ) : free.genre === "Racing" ? (
                <h4>
                  {free.genre} <GiRaceCar />
                </h4>
              ) : free.genre === "Sports" ? (
                <h4>
                  {free.genre} <GiSportMedal />
                </h4>
              ) : free.genre === "Social" ? (
                <h4>
                  {free.genre} <GiPartyFlags />
                </h4>
              ) : free.genre === "Sandbox" ? (
                <h4>
                  {free.genre} <GiJetpack />
                </h4>
              ) : free.genre === "Open-World" ? (
                <h4>
                  {free.genre}
                  <GiEarthAmerica />
                </h4>
              ) : free.genre === "Survival" ? (
                <h4>
                  {free.genre}
                  <GiSwissArmyKnife />
                </h4>
              ) : free.genre === "PVP" ? (
                <h4>
                  {free.genre}
                  <GiPlayerNext />
                </h4>
              ) : free.genre === "PVE" ? (
                <h4>
                  {free.genre}
                  <GiBowieKnife />
                </h4>
              ) : free.genre === "Pixel" ? (
                <h4>
                  {free.genre} <GiWarPick />{" "}
                </h4>
              ) : free.genre === "Voxel" ? (
                <h4>
                  {free.genre} <GiVortex />{" "}
                </h4>
              ) : free.genre === "Zombie" ? (
                <h4>
                  {free.genre} <GiRaiseZombie />{" "}
                </h4>
              ) : free.genre === "Turn-Based" ? (
                <h4>
                  {free.genre} <GiReturnArrow />{" "}
                </h4>
              ) : free.genre === "First-Person" ? (
                <h4>
                  {free.genre} <GiCrosshair />{" "}
                </h4>
              ) : free.genre === "Third-Person" ? (
                <h4>
                  {free.genre} <GiPlayerTime />{" "}
                </h4>
              ) : free.genre === "Top-Down" ? (
                <h4>
                  {free.genre} <GiBullyMinion />{" "}
                </h4>
              ) : free.genre === "Tank" ? (
                <h4>
                  {free.genre} <GiGreatWarTank />{" "}
                </h4>
              ) : free.genre === "Space" ? (
                <h4>
                  {free.genre} <GiSpaceship />{" "}
                </h4>
              ) : free.genre === "Sailing" ? (
                <h4>
                  {free.genre} <GiSailboat />{" "}
                </h4>
              ) : free.genre === "Side-Scroller" ? (
                <h4>
                  {free.genre} <GiLaddersPlatform />{" "}
                </h4>
              ) : free.genre === "Superhero" ? (
                <h4>
                  {free.genre} <GiStrong />{" "}
                </h4>
              ) : free.genre === "Permadeath" ? (
                <h4>
                  {free.genre} <GiDeathZone />{" "}
                </h4>
              ) : free.genre === "Card" || free.genre === "Card Game" ? (
                <h4>
                  {free.genre} <GiCardDraw />{" "}
                </h4>
              ) : free.genre === "Battle Royale" ? (
                <h4>
                  {free.genre} <GiBattleAxe />{" "}
                </h4>
              ) : free.genre === "MMO" ||
                free.genre === "MMOFPS" ||
                free.genre === "MMOTPS" ||
                free.genre === "MMORTS" ? (
                <h4>
                  {free.genre} <GiDungeonGate />{" "}
                </h4>
              ) : free.genre === "3d" ? (
                <h4>
                  {free.genre} <Gi3DMeeple />{" "}
                </h4>
              ) : free.genre === "2d" ? (
                <h4>
                  {free.genre} <GiPerson />{" "}
                </h4>
              ) : free.genre === "Anime" ? (
                <h4>
                  {free.genre} <GiPencilBrush />{" "}
                </h4>
              ) : free.genre === "Fantasy" ? (
                <h4>
                  {free.genre} <GiCrocSword />{" "}
                </h4>
              ) : free.genre === "Sci-Fi" || free.genre === "Sci Fi" ? (
                <h4>
                  {free.genre} <GiMaterialsScience />{" "}
                </h4>
              ) : free.genre === "Fighting" ||
                free.genre === "Martial-Arts" ||
                free.genre === "Martial Arts" ? (
                <h4>
                  {free.genre} <GiBrassKnuckles />{" "}
                </h4>
              ) : free.genre === "Flight" ? (
                <h4>
                  {free.genre} <GiJetFighter />{" "}
                </h4>
              ) : free.genre === "Low-Spec" || free.genre === "Low Spec" ? (
                <h4>
                  {free.genre} <GiLaptop />{" "}
                </h4>
              ) : free.genre === "Tower-Defense" ||
                free.genre === "Tower Defense" ? (
                <h4>
                  {free.genre} <GiStoneTower />{" "}
                </h4>
              ) : free.genre === "Horror" ? (
                <h4>
                  {free.genre} <GiJasonMask />{" "}
                </h4>
              ) : free.genre === "Action-RPG" ||
                free.genre === "Action RPG" ||
                free.genre === "ARPG" ? (
                <h4>
                  {free.genre} <GiAncientSword />
                </h4>
              ) : (
                free.genre
              )}

              <h2>Platform:</h2>
              <p>{free.platform} </p>

              <h2>Description: </h2>
              <p>{free.short_description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
