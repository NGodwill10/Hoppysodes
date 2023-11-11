document.addEventListener("DOMContentLoaded", function () {
    try {
        const editprofilebtn = document.getElementById("editProfileButton");
        const username = document.getElementById("username");
        const name = document.getElementById("name");

        function editProfile() {
            username.removeAttribute("readonly");
            name.removeAttribute("readonly");
            editprofilebtn.innerHTML = "Save";
        }

        function saveProfile() {
            username.setAttribute("readonly", "readonly");
            name.setAttribute("readonly", "readonly");
            editprofilebtn.innerHTML = "Edit Profile";
        }

        editprofilebtn.addEventListener("click", () => {
            if (editprofilebtn.innerHTML === "Edit Profile") {
                editProfile();
            } else {
                saveProfile();
            }
        });

        console.log("Works!");
    } catch (error) {
        console.error("An error occurred:", error);
    }
    console.log("profile.js loaded")
});


