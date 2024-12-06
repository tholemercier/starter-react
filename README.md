# Main Stack
Please note thatt for maintainability and security, the number of external library should be kept at bare minimum for the needs of the project.
We don't want to reinvent the wheel, but we don't want to be exposed to abandonned tools.
**Regularly check the dependencies for security issues and upgrade. Replace if necessary.**

| **Dependency** | **Version**  | **Latest Version** | **Description** |
|--------------------------|--------------|--|---------------------------------------------------------------------------------------------------|
| `@tanstack/react-query` | ^5.62.0      | 5.62.0 | Powerful library for managing server-state in React applications with caching and synchronization.|
| `husky`                 | ^9.1.6       | 9.1.6 | Tool for managing Git hooks to automate tasks like linting, testing, or formatting before commits.|
| `lodash`                | ^4.17.21     | 4.17.21 | Utility library offering functions for common tasks like manipulation, comparison, and more. |
| `react`                 | ^19.0.0      | 19.0.0 | Core library for building user interfaces in React. |
| `react-dom`             | ^19.0.0      | 19.0.0 | Package for DOM-specific methods in React applications. |
| `react-swipeable`       | ^7.0.2       | 7.0.2 | Component for handling touch swipe gestures in React. |
| `react-use`             | ^17.5.1      | 17.5.1 | Collection of React hooks for state and lifecycle management, effects, and utilities.|

Recommended Additional Packages: Chakra-ui, react-router.

# Development Environment
Preferred Tool is Vscode.

## Host & Port
In the **.env** file, there is 2 ENV VARIABLES, VITE_HOST & VITE_PORT.
In Vite, the configuration for the development server is defined in the **vite.config.js** file, where you can specify various settings for the server, including the port and host.

### Port
If the project requires HTTPS on local development, the port can be set to **443**.
Note that MacOs will require you to run it using sudo
```
// In the .env file
VITE_PORT=443

// In your terminal
sudo pnpm dev
```

### Host
If the project requires a specific host, regarding CORS limitations for example, the host can be changed.
```
// In the .env file
VITE_HOST=mydomain.com
```
#### MacOs
Update the file /etc/hosts with a new entry for 
```
// In your terminal
vi /etc/hosts

// in vi edit mode, add
127.0.0.1 mydomain.com
```
#### Windows
Update the file C:/Windows/System32/drivers/etc/hosts with a new entry for 
```
// Open as administrator C:/Windows/System32/drivers/etc/hosts and add
127.0.0.1 mydomain.com
```

## Husky
Husky is a popular tool in frontend development for managing Git hooks. Git hooks are scripts that run at specific points in the Git workflow (e.g., before commits, pushes, or merges). Husky makes it easy to automate tasks during these events, improving code quality and ensuring consistency across teams.
For the context of this repository, a single command is triggered when committing: lint (eslint).
The commit will be rejected if the lint (eslint) fails.

## Eslint
ESLint is a static code analysis tool designed to identify and fix problems in JavaScript code. It's widely used in frontend development to enforce coding standards, catch errors early, and improve overall code quality. Enforces coding styles by applying custom or pre-defined rules.
### @stylistic/eslint-plugin
ESLint plugin that provides additional linting rules focused specifically on ensuring code consistency, readability, and style. It includes a set of stylistic rules aimed at enforcing best practices for code formatting and visual consistency.


# Unit Testing
Potential improvment on testing feedback
"@vitest/coverage-v8"
"@vitest/ui"

## Vitest
Vitest is responsible for executing your tests. It serves as the backbone of your testing framework, running the test files, managing test environments, and providing assertion utilities (e.g., expect).

## React Testing Library
React Testing Library provides utilities specifically for testing React components. It focuses on testing the behavior of components as they interact with the DOM, mimicking real user actions.

## How They Work Together
* Vitest acts as the test runner, executing tests and managing the environment.
* React Testing Library provides tools to write meaningful test cases that focus on user behavior.
For example:
* Vitest runs a test file containing React Testing Library code.
* In the test, React Testing Library is used to render a component and verify its behavior or DOM output.

## MSW (Mock Service Worker)
MSW (Mock Service Worker) is a powerful tool for mocking network requests during development and testing. It provides a seamless way to intercept and handle HTTP requests, simulating real API interactions without requiring a live backend.

Example of a Mock for the API /api/user returning a mocked User
```js
rest.get('/api/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ id: 1, name: 'John Doe' })
    );
})
```