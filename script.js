const usernameInput = document.getElementById("username");
const searchForm = document.getElementById("searchForm");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const profile = document.getElementById("profile");
const avatar = document.getElementById("avatar");

let isSearching = false;

async function searchUser() {
    if (isSearching) {
        return;
    }

    const username = usernameInput.value.trim();

    if (!username) {
        message.textContent = "Please enter a username.";
        profile.classList.add("hidden");
        return;
    }

    try {
        isSearching = true;
        searchBtn.disabled = true;
        usernameInput.disabled = true;
        message.textContent = "Searching...";
        profile.classList.add("hidden");

        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}`
        );

        if (!response.ok) {
            throw new Error(
                response.status === 404
                    ? "GitHub user not found."
                    : `Request failed: ${response.status}`
            );
        }

        const data = await response.json();

        avatar.src = data.avatar_url;
        avatar.alt = `${data.login}'s profile picture`;

        document.getElementById("name").textContent =
            data.name || data.login;

        document.getElementById("bio").textContent =
            data.bio || "No bio available.";

        document.getElementById("followers").textContent =
            data.followers;

        document.getElementById("following").textContent =
            data.following;

        document.getElementById("repos").textContent =
            data.public_repos;

        document.getElementById("profile-link").href = data.html_url;

        profile.classList.remove("hidden");
        message.textContent = "";

    } catch (error) {
        message.textContent = error instanceof TypeError
            ? "Unable to connect to GitHub. Check your internet connection and try again."
            : error instanceof Error
                ? error.message
                : "Something went wrong. Please try again.";

    } finally {
        isSearching = false;
        searchBtn.disabled = false;
        usernameInput.disabled = false;
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchUser();
});