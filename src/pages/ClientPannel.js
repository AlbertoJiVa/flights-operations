import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import FlightsTable from "../components/FlightsTable";
import NewFlightModal from "../components/NewFlightModal";
import LoadingSpinner from "../components/LoadingSpinner";

const ClientPannel = ({ user, signOut, ...props }) => {
  const db = firebase.firestore();
  const [flights, setFlights] = useState([]);
  const [newFlihgt, setNewFlight] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (db) {
      const unsuscribe = db
        .collection("flights")
        .orderBy("arrival_eta", "asc")
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          let loadedFlights = JSON.parse(localStorage.getItem("flights"));

          if (loadedFlights) {
            let prevFlightIds = loadedFlights.map((f) => f.id);
            let nextFlightIds = data.map((f) => f.id);
            let newFlightId = nextFlightIds.filter(
              (nF) => !prevFlightIds.includes(nF)
            );

            let flight = data.find((f) => f.id === newFlightId[0]);

            if (flight) {
              setNewFlight(flight);
              setOpen(true);
            }
          }

          setFlights(data);
          localStorage.setItem("flights", JSON.stringify(data));
        });

      return unsuscribe;
    }
  }, [db]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!user) return <Navigate to="/" />;

  if (flights.length < 1) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <FlightsTable
          flights={flights}
          newFlihgt={newFlihgt}
          signOut={signOut}
          blinkAllowed={open}
        />
        <NewFlightModal
          newFlihgt={newFlihgt}
          open={open}
          handleClose={handleClose}
        />
      </>
    );
  }
};

export default ClientPannel;
