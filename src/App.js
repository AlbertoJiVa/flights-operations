import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import ClientPannel from "./pages/ClientPannel";
import SelectRole from "./pages/SelectRole";
import CreateFlight from "./pages/CreateFlight";
import SignIn from "./pages/SignIn";

const firebaseConfig = {
  apiKey: "AIzaSyALUg__W8Lj02ODBwOR3x9bWhCsxW7q-vg",
  authDomain: "flights-operations.firebaseapp.com",
  projectId: "flights-operations",
  storageBucket: "flights-operations.appspot.com",
  messagingSenderId: "84245229187",
  appId: "1:84245229187:web:48aef10089925a7b0bb5b6",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      if (initializing) {
        setInitializing(false);
      }
    });

    return unsuscribe;
  }, [initializing]);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return "Loading ...";

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <SelectRole signOut={signOut} />
            ) : (
              <SignIn signInWithGoogle={signInWithGoogle} />
            )
          }
        />
        <Route
          path="client"
          element={<ClientPannel user={user} signOut={signOut} />}
        />
        <Route
          path="operator"
          element={<CreateFlight user={user} signOut={signOut} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
