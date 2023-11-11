document.addEventListener("DOMContentLoaded", function () {
    const contentContainer = document.querySelector('.content'); // Get the content container
    let currentPage = "home"; // Initialize currentPage with the default value

    // Function to load content from a specific HTML file
    function loadContent(pageName) {
        fetch(`${pageName}.html`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch ${pageName}.html`);
                }
                return res.text();
            })
            .then((data) => {
                contentContainer.innerHTML = data;
    
                // Create a script element for the corresponding JavaScript file
                const scriptElement = document.createElement('script');
                scriptElement.src = `${pageName}.js`;
                scriptElement.type = "module";
                document.body.appendChild(scriptElement);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    

    // Load the "Home" page by default when the page loads
    loadContent(currentPage);

    // Attach click event listeners to sidebar links
    const profileLink = document.querySelector('.menu-items a[href*="profile"]');
    const homeLink = document.querySelector('.menu-items a[href*="home"]');
    const exploreLink = document.querySelector('.menu-items a[href*="explore"]');
    const postLink = document.querySelector('.menu-items a[href*="post"]');
    const dynamicJs = document.getElementById('dynamicJs');

    profileLink.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = "profile"; // Update currentPage when the profile link is clicked
        loadContent(currentPage);
        // Store the current page in localStorage
        localStorage.setItem('currentPage', currentPage);
    });

    homeLink.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = "home"; // Update currentPage when the home link is clicked
        loadContent(currentPage);
        // Store the current page in localStorage
        localStorage.setItem('currentPage', currentPage);
    });

    exploreLink.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = "explore"; // Update currentPage when the explore link is clicked
        loadContent(currentPage);
        // Store the current page in localStorage
        localStorage.setItem('currentPage', currentPage);
    });

    postLink.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = "post"; // Update currentPage when the explore link is clicked
        loadContent(currentPage);
        // Store the current page in localStorage
        localStorage.setItem('currentPage', currentPage);
    });

    // After loading the sidebar HTML, you can access its elements here
    const nav = document.querySelector('.navbar');
    const menuButton = document.getElementById("menuButton");
    const sidebar = document.getElementById("sidebar");
    const lightModeButton = document.getElementById("lightModeButton");
    const body = document.body;
    const menuItems = document.querySelectorAll(".menu-items a");
    const logoutButton = document.querySelector(".logout-button");
    const homeIcon = document.querySelector(".menu-items a[href*='home'] .menu-icon img");
    const exploreIcon = document.querySelector(".menu-items a[href*='explore'] .menu-icon img");
    const postIcon = document.querySelector(".menu-items a[href*='post'] .menu-icon img");
    const logoutIcon = document.querySelector(".logout-button img[src*='logout']");
    const lightModeIcon = lightModeButton.querySelector("img");
    const modeCss = document.getElementById("modeCss");
    const contentCss = document.getElementById("contentCss");
    const logo = document.getElementById("logoImg");
    const cnv = document.querySelector('.canvas');


    let isLightMode = true;
    let isSidebarSemiOpen = false;
    let isSidebarOpen = false;

    function toggleSemiOpenMode() {
        if (isSidebarOpen) {
            sidebar.classList.remove("semi-show-sidebar"); //closed
            sidebar.classList.remove("show-sidebar");
            isSidebarSemiOpen = false;
            isSidebarOpen = false;
            // Add code to expand the canvas when closing the sidebar
        } else if (isSidebarSemiOpen) {
            sidebar.classList.add("show-sidebar");
            sidebar.classList.remove("semi-show-sidebar"); // open
            logoutIcon.style.marginLeft = "10px";
            isSidebarOpen = true;
            // Add code to shrink the canvas when opening the sidebar
            // console.log(cnv+" here");
            // cnv.style.marginLeft = "57px";
        } else {
            sidebar.classList.add("semi-show-sidebar");
            logoutIcon.style.marginLeft = "-2px"; // semi open
            isSidebarSemiOpen = true;
            // Add code to shrink the canvas when opening the sidebar
        }
    }

    function toggleLightMode() {
        if (!isLightMode) {
            // Light Mode
            modeCss.setAttribute('href', "styleLight.css");
            homeIcon.src = "../Images/home(light).png";
            exploreIcon.src = "../Images/compass(light).png";
            postIcon.src = "../Images/add(light).png";
            logoutIcon.src = "../Images/logout(light).png";
            lightModeIcon.src = "../Images/dark.png";
            logo.src = "../Images/logo.png";
            isLightMode = true;
        } else {
            // Dark Mode
            modeCss.setAttribute('href', "styleDark.css");
            homeIcon.src = "../Images/home(dark).png";
            exploreIcon.src = "../Images/compass(dark).png";
            postIcon.src = "../Images/add(dark).png";
            logoutIcon.src = "../Images/logout(dark).png";
            lightModeIcon.src = "../Images/light.png";
            logo.src = "../Images/logo(green).png";
            isLightMode = false;
        }
        
        // Store the current mode in localStorage
        localStorage.setItem('mode', isLightMode ? 'light' : 'dark');
    }

    menuButton.addEventListener("click", toggleSemiOpenMode);

    lightModeButton.addEventListener("click", toggleLightMode);

    // Add event listener to close sidebar when clicking outside
    document.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && event.target !== menuButton) {
            sidebar.classList.remove("show-sidebar");
            sidebar.classList.remove("semi-show-sidebar"); //closed
            isSidebarSemiOpen = false;
            isSidebarOpen = false;
        }
    });
    
    // Check the stored mode when the page loads
    const storedMode = localStorage.getItem('mode');
    if (storedMode === 'dark') {
        toggleLightMode();
    }

    // Check the stored current page when the page loads
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
        loadContent(storedPage);
        currentPage=storedPage;
    }

    console.log("Script loaded!");
});


// profile.js        ---------------------->

function editProfileOnClick(){
    const editProfileButton = document.getElementById("editProfileButton");
    const usernameInput = document.getElementById("username");
    const nameInput = document.getElementById("name");
    const uid = document.getElementById("uid");
    const email = document.getElementById("email");

    function editProfile() {
        usernameInput.removeAttribute("readonly");
        usernameInput.style.backgroundColor="rgba(0,128,0,0.1";
        nameInput.removeAttribute("readonly");
        nameInput.style.backgroundColor="rgba(0,128,0,0.1";
        editProfileButton.innerHTML = "Save";
    }

    function saveProfile() {
        usernameInput.setAttribute("readonly", "readonly");
        usernameInput.style.backgroundColor="transparent";
        nameInput.setAttribute("readonly", "readonly");
        nameInput.style.backgroundColor="transparent";
        editProfileButton.innerHTML = "Edit Profile";
    }

    // editProfileButton.addEventListener("click", () => {
        if (editProfileButton.innerHTML === "Edit Profile") {
            editProfile();
        } else {
            saveProfile();
        }
    // });
}


// post.js        ----------------------->
// function OpenEditPannelOnClick(obj){
//     // console.log("OpenEditPannelOnClick")
//     console.log(obj.children[1].children[0].textContent)

//     //open edit pannel
//     document.getElementById("wrapper").style.visibility="visible";
// }

// if(document.getElementById("content").innerhtml==undefined){
//     console.log("working")
// }