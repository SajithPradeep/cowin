import React from "react";

const Details = (props) => {
  const { name, address, sessions } = props.slot;

  return (
    <>
      <div style={{ marginBottom: "70px" }}>
        <h4 style={{ fontWeight: "bold" }}>{name}</h4>
        <h5>{address}</h5>
        <hr />
        {sessions.map((session) => {
          return (
            <div key={session.session_id}>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                }}
              >
                <span className="badge badge-secondary">{session.date}</span>
                <span
                  style={{
                    fontWeight: "bold",
                    background: "#3f51b5",
                    color: "white",
                    padding: "0 0.5rem",
                  }}
                >
                  {session.vaccine}
                </span>
              </p>
              <p className="badge badge-secondary">
                {session.min_age_limit === 45
                  ? "45 years & above"
                  : "18 - 44 years"}
              </p>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                }}
                className="badge badge-pill badge-light"
              >
                <span>
                  Dose 1 available: {session.available_capacity_dose1}
                </span>
              </p>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                }}
                className="badge badge-pill badge-light"
              >
                <span>
                  Dose 2 available: {session.available_capacity_dose2}
                </span>
              </p>

              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Details;
