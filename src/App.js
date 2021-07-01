import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StatesList from "./components/StatesList/StatesList";
import DistrictList from "./components/DistrictList/DistrictList";
import SlotDetails from "./components/SlotDetails/SlotDetails";
import Alert from "./components/Alert/Alert";
import Details from "./components/Details/Details";
import Modal from "react-modal";
import vaccineContext from "./context/vaccineContext";
import Checkbox from "@material-ui/core/Checkbox";

Modal.setAppElement("#root");

function App() {
  const [statesData, setStatesData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [savedDistrictState, setSavedDistrictState] = useState(false);
  const [slotInfo, setSlotInfo] = useState(null);
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleCardClick = (slotInfo) => {
    setSlotInfo(slotInfo);
    openModal();
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#3f51b5";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const saveDistrict = (e) => {
    if (e.target.checked) {
      localStorage.setItem("selectedState", JSON.stringify(selectedState));
      localStorage.setItem(
        "selectedDistrict",
        JSON.stringify(selectedDistrict)
      );
      setSavedDistrictState(true);
    } else {
      clearSavedData();
    }
  };
  const clearSavedData = () => {
    localStorage.removeItem("selectedState");
    localStorage.removeItem("selectedDistrict");
    setSavedDistrictState(false);
    setSelectedDistrict(null);
    setSelectedState(null);
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
    <vaccineContext.Provider value={{ handleCardClick: handleCardClick }}>
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
                  {/* <div className="alert alert-success" role="alert">
                    {selectedState.state_name}
                  </div> */}
                  {!savedDistrictState && (
                    <DistrictList
                      selectedState={selectedState}
                      setSelectedDistrict={setSelectedDistrict}
                    />
                  )}
                  <div style={{ marginTop: "20px" }}></div>
                  {/* {selectedDistrict && (
                    <div className="alert alert-success" role="alert">
                      {selectedDistrict.district_name}
                    </div>
                  )} */}
                </>
              )}
              {selectedState && selectedDistrict ? (
                <>
                  {/* {savedDistrictState ? (
                    <div className="alert alert-info">
                      <p>The State and District details have been saved!</p>
                      <p>
                        Clear the saved details to search for a new location
                      </p>
                      <button
                        className="btn btn-danger"
                        onClick={clearSavedData}
                      >
                        Clear
                      </button>
                    </div>
                  ) : (
                    <> */}
                  <p>
                    {savedDistrictState
                      ? `${selectedDistrict.district_name} (district) & ${selectedState.state_name}(state) Saved`
                      : "Save this District and State for next time?"}
                    <span>
                      {/* <input
                            type="checkbox"
                            onChange={saveDistrict}
                            style={{ marginTop: "5px" }}
                          /> */}
                      <Checkbox
                        color="primary"
                        checked={savedDistrictState}
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        size="medium"
                        onChange={(e) => saveDistrict(e)}
                      />
                    </span>
                  </p>
                  {/* </>
                  )} */}
                  <SlotDetails selectedDistrict={selectedDistrict} />
                </>
              ) : null}
            </div>
          )}
          <div className="container TextCenter">
            <Modal
              scrollable={true}
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <h3
                style={{ color: "#3f51b5" }}
                ref={(_subtitle) => (subtitle = _subtitle)}
              >
                Find the available slots below
              </h3>
              <Details slot={slotInfo} />
              <button onClick={closeModal}>close</button>
            </Modal>
          </div>
        </div>
        <Footer />
      </div>
    </vaccineContext.Provider>
  );
}

export default App;
