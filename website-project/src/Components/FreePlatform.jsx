import React from "react";

export default function SelectCategory(props) {
    const handleOnChange = (event) => {
    props.platformSet(event.target.value);
  };

  return (
    <div>
      <select onClick={handleOnChange}>
        <option value={"all"}>all</option>
        <option value={"browser"}>Browser</option>
        <option value={"pc"}>Pc</option>
      </select>
    </div>
  );
}

/*
SPECIFIC PLATFORMS FOR GAMING
params: {platform: 'pc'},
params: {platform:'xbox'}
params:{platform: 'ps4'}
params:{platform: 'browser'}
params:{platform: 'all'}
 */