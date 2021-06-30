import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StatesList from "./components/StatesList/StatesList";
import DistrictList from "./components/DistrictList/DistrictList";
import SlotDetails from "./components/SlotDetails/SlotDetails";
import Alert from "./components/Alert/Alert";

function App() {
  const [statesData, setStatesData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [savedDistrictState, setSavedDistrictState] = useState(false);

  const saveDistrict = () => {
    localStorage.setItem("selectedState", JSON.stringify(selectedState));
    localStorage.setItem("selectedDistrict", JSON.stringify(selectedDistrict));
    setSavedDistrictState(true);
  };
  const clearSavedData = () => {
    localStorage.removeItem("selectedState");
    localStorage.removeItem("selectedDistrict");
    setSelectedState(null);
    setSelectedDistrict(null);
    setSavedDistrictState(false);
  };

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
        if (localStorage.getItem("selectedDistrict")) {
          setSelectedState(JSON.parse(localStorage.getItem("selectedState")));
          setSelectedDistrict(
            JSON.parse(localStorage.getItem("selectedDistrict"))
          );
          setSavedDistrictState(true);
        }
      })
      .catch((err) => {
        setErrorMessage(
          "Cannot load the states information. Please try again later!"
        );
      });
  }, []);

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
      {!selectedState && <Alert />}
      <div style={{ marginTop: "20px" }}></div>
      <div className="container TextCenter">
        {statesData.length > 0 && (
          <div className="statesList">
            {!savedDistrictState && (
              <StatesList
                states={statesData}
                setSelectedState={setSelectedState}
              />
            )}
            <div style={{ marginTop: "20px" }}></div>
            {selectedState !== null && (
              <>
                <div className="alert alert-success" role="alert">
                  {selectedState.state_name}
                </div>
                {!savedDistrictState && (
                  <DistrictList
                    selectedState={selectedState}
                    setSelectedDistrict={setSelectedDistrict}
                  />
                )}
                <div style={{ marginTop: "20px" }}></div>
                {selectedDistrict && (
                  <div className="alert alert-success" role="alert">
                    {selectedDistrict.district_name}
                  </div>
                )}
              </>
            )}
            {selectedState && selectedDistrict ? (
              <>
                {savedDistrictState ? (
                  <div className="alert alert-info">
                    <p>The State and District details have been saved!</p>
                    <p>Clear the saved details to search for a new location</p>
                    <button
                      className="btn btn-danger"
                      onClick={saveDistrict}
                      onClick={clearSavedData}
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <>
                    <p>Save this District and State for next time?</p>
                    <button className="btn btn-primary" onClick={saveDistrict}>
                      Yes
                    </button>
                  </>
                )}
                <SlotDetails selectedDistrict={selectedDistrict} />
              </>
            ) : null}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
