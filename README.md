# Weather Forecast
This project is a weather application that provides current weather information based on user input.
Added Login Page and Admin Panel

## Description
The "Login Page and Admin Panel" project is a web application designed to create a login page integrated with MongoDB Atlas. Users can enter their username and password. The system stores additional information such as user ID, creation date, update date, deletion date, and admin status in the database. Upon successful login, users are redirected to the main page. An administrative panel is implemented for administrative functionality, where administrators can add, edit, and delete users.

## Installation

Before running the project, ensure that all dependencies are installed. You can install them by executing the following command in the project root:

```bash
npm install
```
Running the Project on a Local Server
To run the project on a local server, follow these steps:
1) Start the server using node:
```bash
node server.js
```
Now your project should be accessible at http://localhost:3000
OR use Deployed Link: https://back-end2-ins0litude.onrender.com

# Project Structure

The project structure is organized as follows:

- `admin.js`: JavaScript file responsible for handling administrative functionality.
- `home.ejs`: EJS template file for the home page.
- `index.ejs`: EJS template file for the main index page.
- `login.ejs`: EJS template file for the login page.
- `signup.ejs`: EJS template file for the signup page.
- `app.js`: JavaScript file for client-side logic.
- `index.env`: Environment configuration file for index page (assuming it's a typo).
- `package.json`: JSON file containing project metadata and dependencies.
- `package-lock.json`: JSON file containing exact versions of dependencies installed.
- `server.js`: Server-side JavaScript file responsible for server configuration and routing.
- `style.css`: Cascading Style Sheets file containing styles for HTML elements.

## Dependencies

The project relies on the following dependencies:

- **axios**: A Promise-based HTTP client for making HTTP requests to external resources.
  - Version: ^1.6.5

- **dotenv**: A module for loading environment variables from a `.env` file into `process.env`.
  - Version: ^16.3.2

- **ejs**: A templating language for generating HTML markup with plain JavaScript.
  - Version: ^3.1.9

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
  - Version: ^4.18.2

- **express-session**: A middleware for managing sessions in Express.js applications.
  - Version: ^1.18.0

- **mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
  - Version: ^8.1.1

## Detailed Password Information

For accessing the admin panel, please use the following credentials:

- **Username**: Nurzhan_Zhakiya
- **Password**: 123123

Please ensure to keep these credentials secure and do not share them with unauthorized users.

