import React, { useState, useEffect } from "react";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  User,
  GoogleAuthProvider,
  onAuthStateChanged,
  getAuth,
  signOut,
} from "firebase/auth";
import FirebaseAuth from "react-firebaseui/FirebaseAuth";

const firebaseConfig = {
  // put firebase config in here.
  // You can find the config in Project Settings > General
  // and choose the Config option in Firebase SDK snippet
  apiKey: "AIzaSyAkavadHTIKpx3oUw3rtKZ6vxamYlBKLWg",
  authDomain: "pmatch-d3e0a.firebaseapp.com",
  projectId: "pmatch-d3e0a",
  storageBucket: "pmatch-d3e0a.appspot.com",
  messagingSenderId: "468592365832",
  appId: "1:468592365832:web:27ee35513aed8d76395cbd",
  measurementId: "G-ZF740DN661",
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);

type Props = {
  readonly children: React.ReactNode;
};

const Authenticated = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  };

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <>
      {user ? (
        <>
          <h3>Hi, {user.displayName}!</h3>
          <button onClick={() => signOut(auth)}>Sign Out</button>
          {children}
        </>
      ) : (
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      )}
    </>
  );
};

export default Authenticated;