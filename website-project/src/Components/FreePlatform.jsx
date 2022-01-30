import React, {useContext} from "react";
import { ContextSetPlatform } from "./APIFree";

export default function SelectCategory() {
  const value = useContext(ContextSetPlatform)
    const handleOnChange = (event) => {
    value.platformSet(event.target.value);
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