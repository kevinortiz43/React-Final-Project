import React from "react";

function SelectCategory(props) {
  const handleOnChange = (event) => {
    props.categorySet(event.target.value);
  };

  return (
    <div>
      <select onClick={handleOnChange}>
        <option value={"3d"}>3D games</option>
        <option value={"2d"}>2D games</option>
        <option value={"action"}>Action</option>
        <option value={"action-rpg"}>Action-rpg</option>
        <option value={"anime"}>Anime</option>
        <option value={"battle-royale"}>Battle-royale</option>
        <option value={"card"}>Deck building</option>
        <option value={"fantasy"}>Fantasy</option>
        <option value={"flight"}>Flight</option>
        <option value={"first-person"}>First Person</option>
        <option value={"fighting"}>Fighting</option>
        <option value={"horror"}>Horror</option>
        <option value={"low-spec"}>Low-Graphics</option>
        <option value={"martial-arts"}>Martial-arts</option>
        <option value={"military"}>Military</option>
        <option value={"moba"}>massive online battle arena</option>
        <option value={"mmo"}>Massive Multiplayer Online </option>
        <option value={"mmofps"}>Massive Multiplayer Online FPS</option>
        <option value={"mmotps"}>Massive Multiplayer Online Two Shooting</option>
        <option value={"mmorpg"}>Massive Multiplayer Online RPG</option>
        <option value={"mmorts"}>Massive Multiplayer Online RTS</option>
        <option value={"open-world"}>Open-world</option>
        <option value={"permadeath"}>Permadeath</option>
        <option value={"pixel"}>Pixel</option>
        <option value={"pve"}>Pve</option>
        <option value={"pvp"}>Pvp</option>
        <option value={"sailing"}>Sailing</option>
        <option value={"sandbox"}>Sandbox</option>
        <option value={"side-scroller"}>Side-scroller</option>
        <option value={"sci-fi"}>Science-Fiction</option>
        <option value={"shooter"}>Shooter</option>
        <option value={"side-scroller"}>Side-scroller</option>
        <option value={"social"}>Social</option>
        <option value={"space"}>Space</option>
        <option value={"sports"}>Sports</option>
        <option value={"strategy"}>Strategy</option>
        <option value={"superhero"}>Superhero</option>
        <option value={"survival"}>survival</option>
        <option value={"racing"}>Racing</option>
        <option value={"tank"}>Tank</option>
        <option value={"third-Person"}>Third-person</option>
        <option value={"tower-defense"}>Tower defense</option>
        <option value={"top-down"}>Top-down</option>
        <option value={"turn-based"}>Turn-based</option>
        <option value={"voxel"}>Voxel</option>
        <option value={"zombie"}>Zombie</option>
      </select>
    </div>
  );
}

export default SelectCategory;
