import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const SlotCard = (props) => {
  return (
    <div className="slot-card" key={props.slot.center_id}>
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
      <Button size="large">
        <Link to={{ pathname: "/details", state: props.slot }}>
          View Details
        </Link>
      </Button>
    </div>
  );
};

export default SlotCard;
