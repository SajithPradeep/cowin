import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const DistrictList = (props) => {
  const [districtData, setDistrictData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${props.selectedState.state_id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setErrorMessage(null);
        setDistrictData(data.districts);
      })
      .catch((err) => {
        setErrorMessage(
          "Cannot load the District information. Please try again later!"
        );
      });
  }, [props.selectedState]);

  const districtSelectionHandler = (e, option) => {
    props.setSelectedDistrict(option);
  };
  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={districtData}
        loading={districtData ? false : true}
        getOptionLabel={(option) => option.district_name}
        style={{ minWidth: 300 }}
        size="medium"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select District"
            variant="outlined"
            id="outlined-size-normal"
          />
        )}
        clearText="Clear"
        onChange={(e, option) => districtSelectionHandler(e, option)}
      />
      {errorMessage && (
        <div className="alert alert-warning">{errorMessage}</div>
      )}
    </>
  );
};

export default DistrictList;
