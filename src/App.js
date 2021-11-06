import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Button from "./components/Button";
import ControlPannel from "./components/ControlPannel";

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
const db = firebase.firestore();

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
      auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return "Loading ...";

  return (
    <div>
      {user ? (
        <>
          <ControlPannel user={user} db={db} />
          <br />
          <Button onClick={signOut}>Sign Out</Button>
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      )}
    </div>
  );
}

export default App;
