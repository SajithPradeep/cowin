import React from "react";

const Alert = () => {
  return (
    <div className="alert alert-warning" role="alert">
      <p>
        Please note that this application only displays the available slots in
        the selected districts.
      </p>
      <p>
        For booking the slots please use the
        <a href="https://www.cowin.gov.in/home"> CoWin application!</a>
      </p>
    </div>
  );
};

export default Alert;
