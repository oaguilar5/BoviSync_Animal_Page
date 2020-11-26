Follow the steps below to set up your development environment:

# Prelim Steps
1. Install Node.JS on your computer (Javascript Framework) https://nodejs.org/en/
2. Install NPM and Yarn on your computer (Node package managers) https://www.npmjs.com/ https://yarnpkg.com/
3. Download this repo (zip or Git bash)


# Set Up
1. With a command shell (CMD, terminal, etc.), change the working directory to the repo dir
2. run the command "npm install" (this will take a few mins)
3. If NPM reports any vulnerabilities, run "npm audit fix"
4. run "npm start" to start the development server on localhost:3000


# Testing
1. Ensure you are in the root directory with a command shell (CMD, terminal, etc.)
2. run the command "npm run test" to run all tests and get a report of the number of test suites, number of tests, number of passes and fails
3. run the command "npm run test -- --coverage --watchAll=false" to get a code coverage report as well as a test report (from step 2)
