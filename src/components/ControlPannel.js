import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";

const ControlPannel = ({ user, ...props }) => {
  const db = firebase.firestore();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    if (db) {
      const unsuscribe = db
        .collection("flights")
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setFlights(data);
        });

      return unsuscribe;
    }
  }, [db]);

  return (
    <ul>
      {flights.map((flight) => (
        <li key={flight.id}>{flight.status}</li>
      ))}
    </ul>
  );
};

export default ControlPannel;
