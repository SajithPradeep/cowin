import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StatesList from "./components/StatesList/StatesList";
import DistrictList from "./components/DistrictList/DistrictList";
import SlotDetails from "./components/SlotDetails/SlotDetails";

function App() {
  const [statesData, setStatesData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  useEffect(() => {
    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStatesData(data.states);
      })
      .catch((err) => {
        setErrorMessage(
          "Cannot load the states information. Please try again later!"
        );
      });
  }, []);

  useEffect(() => {
    setSelectedDistrict(null);
  }, [selectedState]);

  if (errorMessage) {
    return (
      <div className="App">
        <Header />
        <div className="alert alert-warning">{errorMessage}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <div style={{ marginTop: "20px" }}></div>
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
      <div style={{ marginTop: "20px" }}></div>
      <div className="container TextCenter">
        {statesData.length > 0 && (
          <div className="statesList">
            <StatesList
              states={statesData}
              setSelectedState={setSelectedState}
            />
            <div style={{ marginTop: "20px" }}></div>
            {selectedState !== null && (
              <>
                <div className="alert alert-success" role="alert">
                  {selectedState.state_name}
                </div>
                <DistrictList
                  selectedState={selectedState}
                  setSelectedDistrict={setSelectedDistrict}
                />
                <div style={{ marginTop: "20px" }}></div>
                {selectedDistrict && (
                  <div className="alert alert-success" role="alert">
                    {selectedDistrict.district_name}
                  </div>
                )}
              </>
            )}
            {selectedState && selectedDistrict ? (
              <SlotDetails selectedDistrict={selectedDistrict} />
            ) : null}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
