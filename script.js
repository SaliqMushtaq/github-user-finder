
// =====================================
// 1. SELECT HTML ELEMENTS
// =====================================

const usernameInput = document.getElementById("username");
const searchForm = document.getElementById("searchForm");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const profile = document.getElementById("profile");
const avatar = document.getElementById("avatar");
const repoList = document.getElementById("repo-list");

// Search history elements
const searchHistory = document.getElementById("search-history");
const historyMessage = document.getElementById("history-message");

// Retrieve saved search history
let history = [];
let isSearching = false;

try {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (!Array.isArray(parsedHistory)) {
            throw new TypeError("Saved search history is not a list.");
        }
        history = parsedHistory.filter(
            (username) => typeof username === "string"
        );
    }
} catch (error) {
    console.error("Could not load saved search history.", error);
    historyMessage.textContent =
        "Saved search history is unavailable. New searches will only be saved for this session.";
}

// Clear history button
const clearHistoryBtn = document.getElementById("clear-history");
// =====================================
// 2. SEARCH HISTORY FUNCTIONS
// =====================================

// Display previous searches

function displayHistory() {
    searchHistory.replaceChildren();

    history.forEach((username) => {

        const li = document.createElement("li");

        const button = document.createElement("button");

        button.textContent = username;

        button.type = "button";

        button.classList.add("history-btn");

        button.addEventListener("click", () => {

            usernameInput.value = username;

            searchUser();

        });

        li.appendChild(button);

        searchHistory.appendChild(li);

    });
}


// Save a successful search
function saveSearch(username) {

    // Remove duplicate usernames
    history = history.filter(
        (item) => item.toLowerCase() !== username.toLowerCase()
    );

    // Add latest search at the beginning
    history.unshift(username);

    // Keep only the latest five searches
    history = history.slice(0, 5);

    // Save history in localStorage
    try {
        localStorage.setItem("searchHistory", JSON.stringify(history));
        historyMessage.textContent = "";
    } catch (error) {
        console.error("Could not save search history.", error);
        historyMessage.textContent =
            "Search history could not be saved in this browser.";
    }

    // Update history on webpage
    displayHistory();
}


// Display history when page loads
displayHistory();

// Clear history button event listener
clearHistoryBtn.addEventListener("click", () => {

    history = [];

    try {
        localStorage.removeItem("searchHistory");
        historyMessage.textContent = "";
    } catch (error) {
        console.error("Could not clear saved search history.", error);
        historyMessage.textContent =
            "Saved search history could not be cleared from this browser.";
    }

    displayHistory();

});

// =====================================
// 3. SEARCH USER FUNCTION
// =====================================

async function searchUser() {
    if (isSearching) {
        return;
    }

    const username = usernameInput.value.trim();

    // Empty username validation
    if (!username) {
        message.textContent = "Please enter a GitHub username.";
        profile.classList.add("hidden");
        return;
    }


    // GitHub username validation
    const usernamePattern =
        /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

    if (!usernamePattern.test(username)) {
        message.textContent = "Please enter a valid GitHub username.";
        profile.classList.add("hidden");
        return;
    }


    try {
        isSearching = true;

        // =====================================
        // LOADING STATE
        // =====================================

        searchBtn.disabled = true;
        usernameInput.disabled = true;
        searchBtn.textContent = "Searching...";

        message.innerHTML = `
            <span class="loader"></span>
            Searching GitHub...
        `;

        profile.classList.add("hidden");
        repoList.replaceChildren();


        // =====================================
        // PART 1: FETCH USER INFORMATION
        // =====================================

        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}`
        );

        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("GitHub user not found.");
            }

            if (response.status === 403 || response.status === 429) {
                throw new Error(
                    "GitHub API rate limit reached. Try again later."
                );
            }

            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();


        // Save successful profile search
        saveSearch(data.login);


        // =====================================
        // DISPLAY PROFILE INFORMATION
        // =====================================

        avatar.src = data.avatar_url;
        avatar.alt = `${data.login}'s GitHub avatar`;

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

        document.getElementById("profile-link").href =
            data.html_url;

        profile.classList.remove("hidden");

        // =====================================
        // PART 2: FETCH MULTIPLE REPOSITORIES
        // =====================================

        const repoResponse = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=5`
        );

        if (!repoResponse.ok) {

            if (
                repoResponse.status === 403 ||
                repoResponse.status === 429
            ) {
                throw new Error(
                    "GitHub API rate limit reached while loading repositories."
                );
            }

            throw new Error("Failed to fetch repositories.");
        }

        const repositories = await repoResponse.json();


        // Clear previous repositories
        repoList.replaceChildren();


        if (repositories.length === 0) {

            const li = document.createElement("li");

            li.textContent = "No public repositories found.";

            repoList.appendChild(li);

        } else {

            // Loop through repository records
            repositories.forEach((repo) => {

                const li = document.createElement("li");

                const title = document.createElement("h4");

                title.textContent = repo.name;


                const details = document.createElement("p");

                details.textContent =
                    `Language: ${repo.language || "Not specified"} | Stars: ${repo.stargazers_count}`;


                const link = document.createElement("a");

                link.href = repo.html_url;
                link.textContent = "View Repository";
                link.target = "_blank";
                link.rel = "noopener noreferrer";


                // Add elements to list item
                li.appendChild(title);
                li.appendChild(details);
                li.appendChild(link);


                // Add list item to webpage
                repoList.appendChild(li);

            });

        }

        message.textContent = "";

    } catch (error) {

        if (profile.classList.contains("hidden")) {
            message.textContent = error instanceof Error
                ? error.message
                : "Something went wrong. Please try again.";
        } else {
            console.error("Could not load repositories.", error);
            const li = document.createElement("li");
            li.textContent = error instanceof Error
                ? error.message
                : "Could not load repositories. Please try again.";
            repoList.replaceChildren(li);
            message.textContent = "";
        }

    } finally {

        // Stop loading state
        isSearching = false;
        searchBtn.disabled = false;
        usernameInput.disabled = false;
        searchBtn.textContent = "Search";

    }

}


// =====================================
// 4. FORM SUBMISSION EVENT
// =====================================

searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    searchUser();

});
