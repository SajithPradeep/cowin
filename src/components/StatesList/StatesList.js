import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const StatesList = (props) => {
  const stateSelectionHandler = (e, option) => {
    props.setSelectedState(option);
    localStorage.removeItem("selectedState");
    localStorage.removeItem("selectedDistrict");
  };
  return (
    <Autocomplete
      autoSelect={true}
      disableCloseOnSelect={false}
      id="combo-box-demo"
      options={props.states}
      getOptionLabel={(option) => option.state_name}
      style={{ minWidth: 300 }}
      size="medium"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select State / Union Territory"
          variant="outlined"
          id="outlined-size-normal"
        />
      )}
      onChange={(e, option) => stateSelectionHandler(e, option)}
    />
  );
};

export default StatesList;
