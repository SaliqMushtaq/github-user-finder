# GitHub User Finder

## Project description

GitHub User Finder is a lightweight web app that looks up public GitHub profiles by username. It retrieves profile information from GitHub and presents it in a simple, responsive interface.

## Technologies used

- HTML5 for the page structure.
- CSS3 for styling and responsive layout.
- JavaScript (ES6+) for form handling and rendering profile data.
- GitHub REST API for public user profile data.

## Features

- Search for a GitHub user by username.
- View the user's avatar, name, bio, followers, following, and public repository count.
- Browse the user's five most recently updated public repositories.
- Reuse the five most recent successful searches, saved in the browser.
- Open the user's GitHub profile directly.
- Get feedback for empty input, users that are not found, and network errors.
- Submit searches using either the button or the Enter key.
- No API key, dependencies, or build step required.

## Screenshots

Screenshots are not included in the repository yet. Add an image of the app to a `screenshots/` folder and embed it here, for example:

```markdown
![GitHub User Finder](screenshots/github-user-finder.png)
```

## How to run the project

1. Clone or download this repository.
2. Open `index.html` in a modern web browser.
3. Enter a GitHub username and select **Search**.

An internet connection is required to fetch profile data from `api.github.com`.

## What I learned

- How to submit and validate a search form with JavaScript.
- How to request and display JSON data from a public REST API using `fetch`.
- How to handle loading states, missing users, and network errors.
- How to update the page safely with `textContent` and make status messages accessible.
