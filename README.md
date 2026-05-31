# APIDemo Playwright Tests

This repository contains a Playwright Test-based API testing sample that demonstrates:

- Navigating to a web page (`https://automationexercise.com/api_list`) as a smoke/navigation check.
- Making API requests using Playwright's `request` fixture (GET, POST, PUT, DELETE).
- Examples of query-parameter tests, basic-auth tests, and negative-status checks.

Project layout
- `package.json` — project metadata and test scripts.
- `playwright.config.js` — Playwright Test configuration.
- `tests/api.spec.js` — navigation + JSONPlaceholder CRUD examples.
- `tests/api.more.spec.js` — query-param, basic-auth (httpbin.org), and negative-status tests.
- `.github/workflows/playwright.yml` — GitHub Actions workflow to run tests on push/PR.

How the tests work
- Tests use Playwright Test and its `request` fixture to perform HTTP requests directly (no browser required for API calls).
- We use `https://jsonplaceholder.typicode.com` for example CRUD operations and `https://httpbin.org` for auth and status endpoints.
- Each test asserts the HTTP status and inspects JSON responses when applicable.

Run locally

```powershell
npm install
npx playwright install
npm test
```

Run a single test file or test title:

```powershell
npx playwright test tests/api.more.spec.js
npx playwright test -g "Auth success - basic auth"
```

CI

- The repository includes a GitHub Actions workflow at `.github/workflows/playwright.yml` which installs Node, installs Playwright browsers, and runs `npm test` on push and pull requests to `master`/`main`.

Design notes and rationale
- Using Playwright's `request` fixture keeps API tests fast and straightforward while still allowing browser navigation tests in the same test runner.
- JSONPlaceholder is a reliable free service for CRUD examples; httpbin is used for testing status codes and authentication behavior.

Using GitHub Copilot to generate similar tests

You can use GitHub Copilot (VS Code extension) to help scaffold or expand API tests quickly. Recommended workflow:

1. Open the `tests/` folder and create a new file, e.g. `tests/api.generated.spec.js`.
2. Add a short comment describing the test you want; Copilot will usually suggest the test body.
	- Example comment prompt:

```js
// Create a Playwright Test that sends a GET request to https://jsonplaceholder.typicode.com/comments?postId=1
// Assert the response status is 200 and each item has 'postId' and 'email' fields.
```

3. Accept or iterate on Copilot's suggestion. Verify and run the generated test with `npx playwright test`.

Tips for prompt quality with Copilot
- Be explicit: include the URL, HTTP method, expected status, and at least one response field to assert.
- Ask for a descriptive test title and to use Playwright's `request` fixture.
- If you need negative tests, prompt for specific status codes (404, 500) and expected error handling.

Example Copilot prompt (short):

"Generate a Playwright Test named 'GET comments for postId=1' that uses the request fixture to GET https://jsonplaceholder.typicode.com/comments?postId=1 and asserts status 200 and each item has postId===1."

Contributing
- Add tests under `tests/` and keep test names descriptive.
- Run `npm test` locally before creating PRs. The workflow will run tests automatically on push/PR.

License
- This sample contains example test code; add a license file if you plan to publish.

Questions or next steps
- I can add example generated tests using Copilot prompts, expand CI (matrix, caching, report artifacts), or add guidelines for mocking external APIs — tell me which you'd like next.

