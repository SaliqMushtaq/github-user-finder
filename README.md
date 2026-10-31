# GitHub User Finder

A lightweight web app for looking up public GitHub profiles by username.

## Features

- Displays a user's avatar, name, bio, follower and following counts, and public repository count.
- Links directly to the user's GitHub profile.
- Shows a helpful message when the username is missing, the user is not found, or GitHub cannot be reached.
- Uses the public GitHub Users API; no API key or build step is required.

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a browser.
3. Enter a GitHub username and select **Search**.

The app needs an internet connection to contact `api.github.com`.

## Project files

- `index.html` — page structure and search form.
- `style.css` — layout and styling.
- `script.js` — GitHub API request and profile rendering.

## API

Profile data is fetched from the GitHub REST API endpoint:

`https://api.github.com/users/{username}`
