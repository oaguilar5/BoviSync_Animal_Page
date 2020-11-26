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


# Assumptions
1. JSON data (item meta, page meta, and animal data) will always come from the provided links (implementation can be added to provide a dynamic data source)
2. Non-specific styling per client requirements (i.e. table data is left-aligned)
3. Non-traditional approach for card header colors using static array containing exactly 10 different colors (for simplicity) which rotates to handle more than 10 sections
4. Max of 10 decimal points for simplicity and to avoid the table from becoming unecessarily large
5. Threshold values cannot overlap each other, for example setting a conditional formatting for values above 10 and then setting a conditional formatting for values below 50 is not allowed and will change the threshold evaluating higher values to 50. This approach was taken to meet the requirements specifying above/below thresholds, but more preference features could be added to allow for formatting of values within a range
6. Error notices are presented to the user if either of the JSON files experienced errors while fetching. Errors are rendered in the following way for each JSON error (assuming the other files fetched fine):
  -itemMeta error: sections, tables, and data will render however when hovering over a header or data item, name or description will not be described (i.e. "Unknown Description)
  -pageMeta error: sections, tables, and data will NOT render. A header will display "No Sections Available"
  -animalData error: sections will render, however tables will not. A header in each section will display "No Data Available"
7. The underlying numerical value that contains a decimal is retained in an animalData state variable which is referenced by the component to render a number with the user's preferred decimal places. A calculation would be performed in the same manner (component referencing the state variable to get the true value instead of the rendered one)
