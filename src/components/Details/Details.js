import React from "react";

const Details = (props) => {
  const { name, address, sessions } = props.slot;

  return (
    <>
      <div className="container" style={{ marginBottom: "70px" }}>
        <h4>{name}</h4>
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
                <span style={{ fontWeight: "bold" }}>{session.vaccine}</span>
                <span className="badge badge-secondary">
                  {session.min_age_limit === 45
                    ? "45 years & above"
                    : "18 - 44 years"}
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
                  Dose 1 available: {session.available_capacity_dose1}
                </span>
                <span>|</span>
                <span>
                  Dose 2 available: {session.available_capacity_dose2}
                </span>
              </p>
              <p></p>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Details;
