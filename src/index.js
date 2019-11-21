import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages";
import { initializeIcons } from "@uifabric/icons";

var firebase = require('firebase');
var firebaseui = require('firebaseui');

initializeIcons();

firebase.initializeApp({
  apiKey: "AIzaSyCSrn0Muuaaa7qElThUF4qSVz7ejh97jUE", // Auth / General Use
  authDomain: "", // Auth with popup/redirect
  databaseURL: "https://coso-computer.firebaseio.com", // Realtime Database
  messagingSenderId: "696394026294" // Cloud Messaging
});

setTimeout(() => {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        // Other config options...
      });


},5000);

ReactDOM.render(<App />, document.getElementById("root"));
