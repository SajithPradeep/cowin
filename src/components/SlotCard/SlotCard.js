import React, { useContext } from "react";
//import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import vaccineContext from "../../context/vaccineContext";

const SlotCard = (props) => {
  const { handleCardClick } = useContext(vaccineContext);
  const cardSelectHandler = () => {
    handleCardClick(props.slot);
  };
  return (
    <div
      className="slot-card"
      key={props.slot.center_id}
      onClick={cardSelectHandler}
    >
      <p
        style={{
          padding: "0.5rem",
          fontWeight: "bold",
        }}
      >
        {props.slot.name}
      </p>
      <p
        style={{
          display: "flex",
          justifyContent: "space-around",
          fontSize: "12px",
        }}
      >
        <span
          style={{
            background: "teal",
            color: "white",
            padding: "0.3rem",
            borderRadius: "5px",
          }}
        >
          Fee Type: {props.slot.fee_type}
        </span>
        <span
          style={{
            background: "teal",
            color: "white",
            padding: "0.3rem",
            borderRadius: "5px",
          }}
        >
          {props.slot.from} to {props.slot.to}
        </span>
      </p>
      <Button size="large">View Details</Button>
    </div>
  );
};

export default SlotCard;
