# GitHub User Finder

Search for public GitHub profiles and explore a user's latest repositories from a responsive, browser-based app.

## Project overview

GitHub User Finder uses GitHub's public REST API to retrieve profile details and up to five recently updated public repositories. It also keeps a short list of recent successful searches in the browser so you can quickly look up those users again.

## Features

- Search by GitHub username using the Search button or Enter key.
- View a user's avatar, name, bio, follower and following counts, and public repository count.
- Browse up to five of the user's most recently updated public repositories, including language and star count.
- Open the user's GitHub profile or an individual repository.
- Reuse the five most recent successful searches, stored in browser `localStorage`, or clear the search history.
- Receive feedback for empty or invalid usernames, missing users, API rate limits, and failed requests.
- Use the app without an API key, dependencies, or a build step.

## Technologies used

- **HTML5** — page structure and accessible form elements.
- **CSS3** — responsive layout, profile and repository styling, and loading animation.
- **JavaScript (ES6+)** — form handling, API requests, rendering, error states, and search history.
- **GitHub REST API** — public profile and repository data.
- **Browser `localStorage`** — persistence of recent searches.

## Screenshots

No screenshots are currently included in the repository. To add one, save an image in a `screenshots/` directory and embed it here, for example:

```markdown
![GitHub User Finder showing a profile and recent repositories](screenshots/github-user-finder.png)
```

## Installation and running locally

1. Clone the repository:

   ```sh
   git clone https://github.com/SaliqMushtaq/github-user-finder.git
   ```

2. Open the project folder:

   ```sh
   cd github-user-finder
   ```

3. Open `index.html` in a modern web browser.
4. Enter a GitHub username and select **Search**.

No package installation or compilation is needed. An internet connection is required to contact `api.github.com`. Recent searches are saved in the current browser and device.

## Live demo

The project does not currently have a published live demo. Once deployed, add the URL here.

## Learning outcomes

- Building and validating an interactive search form with JavaScript.
- Fetching and rendering JSON from multiple public REST API endpoints.
- Handling loading, empty, not-found, rate-limit, network, and partial-result states.
- Safely creating dynamic page content with DOM methods and `textContent`.
- Persisting and managing recent searches with `localStorage`, including handling malformed or unavailable storage.
- Improving accessibility with labels, keyboard support, focus indicators, and live status messages.
