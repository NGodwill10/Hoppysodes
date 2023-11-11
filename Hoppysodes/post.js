// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, query, where, setDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Your web app's Firebase configuration
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

// -----------------        Load Data       ---------------
const data = [];

// Function to create a series card
function createSeriesCard(title, description) {
    const grid = document.getElementById("cardsGrid");
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="instruction-text">
            <h3 id="cardTitle">${title}</h3>
            <p>${description}</p>
        </div>
    `;
    card.addEventListener("click", () => listEpisodes(title));
    grid.appendChild(card);
}

// Function to create an episode card
function createEpisodeCard(title, description, content) {
    const grid = document.getElementById("cardsGrid");
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="instruction-text">
            <h3 id="cardTitle">${title}</h3>
            <p>${description}</p>
        </div>
    `;
    card.addEventListener("click", () => showEditPopup("ep"));
    grid.appendChild(card);
}

// Function to create the "Add +" card
function createAddCard(type) {
    const grid = document.getElementById("cardsGrid");
    const addCard = document.createElement("div");
    addCard.className = "card";
    addCard.innerHTML = `
        <div class="instruction-text">
            <h3 id="cardTitle">Add +</h3>
        </div>
    `;
    addCard.addEventListener("click", showEditPopup(type));
    grid.appendChild(addCard);
}

// Function to list series
function listSeries() {
    const grid = document.getElementById("cardsGrid");
    grid.innerHTML = ""; // Clear existing content

    for (const item of data) {
        if (item.epNo === 1) {
            createSeriesCard(item.seriesTitle, item.seriesDescription);
        }
    }

    const addSeriesCard = createAddCard("series");
    // grid.appendChild(addSeriesCard);
}

// Function to list episodes for a selected series
function listEpisodes(seriesTitle) {
    const grid = document.getElementById("cardsGrid");
    grid.innerHTML = ""; // Clear existing content

    for (const item of data) {
        if (item.seriesTitle === seriesTitle) {
            createEpisodeCard(item.epNo, item.epTitle, item.content);
        }
    }

    const addEpisodeCard = createAddCard("edit");
    // grid.appendChild(addEpisodeCard);
}

// Function to add a new series
function addSeries() {
    console.log("Add new series");
}

// Function to add a new episode
function addEp() {
    console.log("Add new episode");
}

// Function to edit Episode
function editEp(epNo) {
    console.log("Edit " + epNo);
    showEditPopup();
}

// Load data and list initial series
const q = query(collection(db, "series"));

getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });

    listSeries(); // Initial load of series
});

const popup = document.getElementById("popupPanel");
const epTitleInput = document.getElementById("epTitle");
const epNoInput = document.getElementById("epNo");
const contentInput = document.getElementById("textContent");
const saveButton = document.getElementById("saveButton");
const resetButton = document.getElementById("resetButton");

// Function to show the popup and populate fields
function showEditPopup(type) {
    const checkSeries=document.getElementById("checkSeries")
    if(type=="series"){
        let seriesTitle=document.getElementById("seriesTitle");
        seriesTitle.addEventListener("focusout",()=>{
            seriesTitle=document.getElementById("seriesTitle");
            for (const item of data) {
                console.error(item.seriesTitle)
                console.log(seriesTitle.textContent)
                if (item.seriesTitle==seriesTitle.textContent) {
                    console.error(" matched")
                    checkSeries.textContent="Series already exists"
                    checkSeries.style.display="block";
                }
            }
        })
    }
    else if(type=="ep"){
        for (const item of data) {
            if (item.seriesTitle === seriesTitle) {
                createEpisodeCard(item.epNo, item.epTitle, item.content);
            }
        }
    }
    else{
        for (const item of data) {
            if (item.seriesTitle === seriesTitle) {
                createEpisodeCard(item.epNo, item.epTitle, item.content);
            }
        }
    }

    // epTitleInput.value = title1;
    // epNoInput.value = title2;
    // contentInput.value = story;
    popup.style.display = "block";
}

async function saveEP() {
    // Add or update a document in collection "series"
    await setDoc(doc(db, "series", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    });
}

// Event listener for the "Edit" button
// editButton.addEventListener("click", () => {
//     const selectedEpisode = /* get the selected episode data */;
//     showEditPopup(selectedEpisode.epTitle, selectedEpisode.epNo, selectedEpisode.content);
// });
