// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, query } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
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
const auth = getAuth();

//other variables
let userEmail = null;

const logoutbtn = document.getElementById("logoutbtn")
const postbtn = document.getElementById("postButton");

// get User details
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // console.log(user);
    // console.log(auth.currentUser)

    // User's Google data
    user = auth.currentUser;
    if (user !== null) {
      user.providerData.forEach((profile) => {
        // console.log("Sign-in provider: " + profile.providerId);
        // console.log("  Provider-specific UID: " + profile.uid);
        // console.log("  Name: " + profile.displayName);
        // console.log("  Email: " + profile.email);
        // console.log("  Photo URL: " + profile.photoURL);
        userEmail=profile.email;
      });
    }

  } else {
    // User is signed out
    // ...
    window.location.href("signin.html");
  }
});

    // Check if User is admin (email should be in firestore isAdmin document)
    const q = query(collection(db, "test"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
    
      // show post button if admin
      if (doc.data().email == userEmail) {
        postbtn.parentElement.style.visibility = "visible";
      }
    });



// Logout
function logout() {
  signOut(auth).then(() => {
    // Sign-out successful.
    window.location.href = "signin.html";
  }).catch((error) => {
    // An error happened.
  });
}

// Test function
function test() {
  alert();
}

// logout call
logoutbtn.addEventListener("click", logout);


console.log("firebase script loaded ")

//
//
//
//                  ********** Dymanic content **********
//
//
//

