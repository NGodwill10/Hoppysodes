// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7wZjtt7NNYVQzXQIyD9tYG2XMY0uvzeM",
    authDomain: "hoppysodes.firebaseapp.com",
    projectId: "hoppysodes",
    storageBucket: "hoppysodes.appspot.com",
    messagingSenderId: "517456007725",
    appId: "1:517456007725:web:4026dd34764a77a2449ea4",
    measurementId: "G-P0ME9EK0FN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

document.addEventListener("DOMContentLoaded", function () {
    const popupbtn = document.getElementById("popup");
    const redirectbtn = document.getElementById("redirect");
    const logoutbtn = document.getElementById("logout");

    // listen to pupup / redirect
    popupbtn.addEventListener("click", popup);
    redirectbtn.addEventListener("click", redirect);
    logoutbtn.addEventListener("click", logout);

    // Sign in options
    // #1 pop up
    function popup() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                // window.location.href = "index.html";
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    // #2 Redirect
    function redirect() {
        signInWithRedirect(auth, provider);
        const userCred = getRedirectResult(auth);

        // Get redirect results
        // getRedirectResult(auth)
        //     .then((result) => {
        //         // This gives you a Google Access Token. You can use it to access Google APIs.
        //         const credential = GoogleAuthProvider.credentialFromResult(result);
        //         const token = credential.accessToken;
        //         alert("done");

        //         // The signed-in user info.
        //         const user = result.user;
        //         window.location.href == "index.html"
        //         // IdP data available using getAdditionalUserInfo(result)
        //         // ...
        //     }).catch((error) => {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.customData.email;
        //         // The AuthCredential type that was used.
        //         const credential = GoogleAuthProvider.credentialFromError(error);
        //         // ...
        //         console.log(email);
        //         console.log(credential);
        //         alert(email + " " + errorMessage);
        //     });
    }

    // Logout
    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Logging out");

        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    // Get current User
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log("logged in");

            window.location.href = "index.html";
            // ...
        } else {
            // User is signed out
            // ...
            console.log("logged out");
        }
    });
});
