# Design Document: Social Media App Frontend

<!-- mtoc-start -->

* [1. Introduction](#1-introduction)
* [2. Goals](#2-goals)
* [3. Technical Design](#3-technical-design)
  * [3.1. Architecture](#31-architecture)
  * [3.2. Technologies](#32-technologies)
  * [3.3. Components](#33-components)
  * [3.4. Data Flow](#34-data-flow)
  * [3.5. Routing](#35-routing)
  * [3.6. Templates](#36-templates)
  * [3.7. Data Storage](#37-data-storage)
  * [3.8. Form Validation](#38-form-validation)
  * [3.9. API Communication](#39-api-communication)
* [4. Running the Project Locally](#4-running-the-project-locally)
* [5. UI Design](#5-ui-design)
* [6. Implementation Details](#6-implementation-details)
  * [6.1. `index.html` Structure](#61-indexhtml-structure)
  * [6.2. JavaScript Modules](#62-javascript-modules)
  * [6.3. OOP Implementation](#63-oop-implementation)

<!-- mtoc-end -->

## 1. Introduction

This document describes the design of the frontend for a simple social media application. This project is a learning exercise focusing on vanilla JavaScript, OOP principles, and Single Page Application (SPA) concepts.

## 2. Goals

- Create a functional frontend for a social media app.
- Use HTML, CSS, and Vanilla JavaScript.
- Implement a custom client-side router.
- Use templates for rendering views.
- Apply OOP principles (Single Responsibility Principle, reusability).
- Implement basic user authentication (login/signup).
- Allow users to create, edit their profile, and create new posts.

## 3. Technical Design

### 3.1. Architecture

The application will be a Single Page Application (SPA). The frontend will handle routing and rendering views dynamically without full page reloads.

### 3.2. Technologies

- **HTML:** For structuring the page and defining templates.
- **CSS:** For styling the application. SASS is used for CSS pre-processing.
- **JavaScript:** For application logic, routing, and DOM manipulation.
- **Templates:** HTML `<template>` elements are used to define reusable UI components.

### 3.3. Components

The application will be composed of the following main components:

- **Router:** A custom router to handle navigation between different views. It will listen for `hashchange` events (`#login`, `#signup`, `#userlist`, `#users/:id`).
- **Views:** Each view represents a specific page or section of the application.

  - `LoginFormView`: Displays the login form.
  - `SignUpFormView`: Displays the signup form.
  - `UserListView`: Displays a table of users.
  - `UserFormView`: Displays a form for editing user profile data.
  - `HeaderView`: Displays the header with user information and logout button.

- **DataService:** Handles communication with the backend API (Node.js). It will be responsible for:
  - Fetching user data.
  - Creating new users.
  - Updating user data.
  - Handling user authentication (login, logout).
  - Uploading user profile images and posts images.
  - Fetching user's posts.
- **BaseView:** A base class for all views, providing common functionality like rendering templates.
- **BaseFormView:** A base class for form views, extending `BaseView` and providing form validation logic.

### 3.4. Data Flow

1.  User interacts with the UI (e.g., clicks a link, submits a form).
2.  The Router detects the URL `hashchange`.
3.  The Router determines the appropriate View component to display.
4.  The View uses the DataService to fetch data from the backend (if needed).
5.  The View renders the data using a template.
6.  The rendered HTML is injected into the DOM.

### 3.5. Routing

The Router will use the URL hash (`#`) to determine which view to display. For example:

- `#login`: Displays the login form.
- `#signup`: Displays the signup form.
- `#userlist`: Displays the list of users.
- `#users/email@example.com`: Displays the user edit form for the user with the specified email.

### 3.6. Templates

HTML `<template>` elements will be used to define the structure of each view. JavaScript will then be used to populate the templates with data. The `templateRenderer` function is responsible for replacing placeholders (`{{...}}`) in the template with the actual data.

### 3.7. Data Storage

User session data will be stored in `sessionStorage`. This will allow to persist user sessions across page reloads and browser restarts.

### 3.8. Form Validation

Form validation will be implemented on the client-side using JavaScript.

### 3.9. API Communication

The frontend will communicate with a RESTful API on the backend (Node.js with MongoDB). The `DataService` will use the `fetch` API to make requests to the backend.

## 4. Running the Project Locally

To run this project locally, follow these steps:

1.  **Backend Setup (Important!)**: Ensure the backend API is running at `http://localhost:3000`. The setup of the backend API is not covered in this document and needs to be done separately. Without a running backend, the frontend will not function correctly.

2.  **Prerequisites:**

    - Ensure you have a modern web browser installed (Chrome, Firefox, Safari, Edge).
    - Ensure Node.js and npm (Node Package Manager) are installed. Download Node.js from [https://nodejs.org/](https://nodejs.org/). npm comes bundled with Node.js.

3.  **Frontend Setup:**

    - **Folder Structure:** Verify that the project folder structure is correct (see example in the original response).
    - **Install Dependencies:** Open a terminal, navigate to the project root directory, and run: `npm install`.
    - **Compile SASS (CSS):** Run `npm run compile:sass` to compile SASS files into CSS. Keep this command running to watch for changes.

4.  **Run the Frontend:** Choose one of the following methods:

    - **Option 1: Simple File Serving**: Open `index.html` in your browser. However, be aware of potential CORS issues.

    - **Option 2: Using a Simple HTTP Server (Recommended)**:
      - Install `http-server` globally: `npm install -g http-server`.
      - Navigate to the project directory in the terminal and run: `http-server .`.
      - Open the address (e.g., `http://localhost:8080`) in your browser.
    - **Option 3: Using Python's Simple HTTP Server:**
      - Navigate to the project directory in the terminal.
      - Run `python3 -m http.server` (Python 3) or `python -m SimpleHTTPServer` (Python 2).
      - Open `http://localhost:8000` in your browser.

5.  **CORS Configuration (Important)**: If your frontend and backend run on different ports, you _must_ configure CORS in your backend. This typically involves using the `cors` middleware in your Node.js/Express application. See the example in the original response.

## 5. UI Design

- The UI will be simple and clean.
- CSS will be used to style the application and make it visually appealing.

## 6. Implementation Details

### 6.1. `index.html` Structure

- The `index.html` file contains the basic structure of the SPA.
- It includes `<template>` elements for each view.
- It loads the CSS and JavaScript files.
- The `<body>` element contains the main sections of the application:
  - `<header>`: For the header/navigation.
  - `<main>`: For the main content area.
  - `<footer>`: For the footer.

### 6.2. JavaScript Modules

The JavaScript code will be organized into modules using ES modules (`import`/`export`). This promotes code reusability and maintainability.

### 6.3. OOP Implementation

- Views will be implemented as classes, inheriting from a `BaseView` class.
- The `DataService` will be implemented as a class, encapsulating the logic for interacting with the backend API.
