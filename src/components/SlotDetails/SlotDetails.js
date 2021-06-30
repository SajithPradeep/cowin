import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import SlotCard from "../SlotCard/SlotCard";

const selectedDate = moment().format("DD-MM-YYYY");

const SlotDetails = (props) => {
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${props.selectedDistrict.district_id}&date=${selectedDate}`
      )
      .then((data) => {
        console.log(data.data.centers);
        setSlots(data.data.centers);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        setError("Cannot load the data. Please try again later");
      });
  }, [props.selectedDistrict]);
  if (error) {
    return <div className="alert alert-warning">{error}</div>;
  }
  return (
    <div>
      {slots.length === 0 ? (
        <>
          <div className="alert alert-danger">
            No Available slots for this Location at this moment
          </div>
          <p>
            Please don't worry. The slots will open up soon. Keep checking this
            space!
          </p>
        </>
      ) : (
        <div>
          <h4>Slots are available in the following centers</h4>
          {slots.map((slot) => {
            return <SlotCard slot={slot} key={slot.center_id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SlotDetails;
