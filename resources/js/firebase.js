// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmarFSgYVDydWHxdrHA7FsZTa7dD6YYFk",
    authDomain: "orderappfood.firebaseapp.com",
    databaseURL: "https://orderappfood.firebaseio.com",
    projectId: "orderappfood",
    storageBucket: "orderappfood.appspot.com",
    messagingSenderId: "510018963086",
    appId: "1:510018963086:web:3bb49a796d2b21bbabebdf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Initialize Firebase");

const messaging = getMessaging();
getToken(messaging, {
    vapidKey:
        "BGY0rn0Jen-V3xDDO-LykzDZ53T8WwmwC2MLl-B9YtP0R9UzqqeJ8_g7ZMn1td8BihQGmtjtaEA0qLRdwjqdQGs",
})
    .then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);
            $.post("/api/device-tokens", {
                token: currentToken,
                device: "chrome",
                _token: $('[name="csrf-token"]').attr("content"),
            });
        } else {
            // Show permission request UI
            console.log(
                "No registration token available. Request permission to generate one."
            );
            // ...
        }
    })
    .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
    });

onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    alert(payload.notification.body);
});
