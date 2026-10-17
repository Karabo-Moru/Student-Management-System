# Student Management System

## Project Overview

The Student Management System is a web application developed using React and JavaScript. It allows users to manage student records through an interactive dashboard.

## Features

- View student records in a table.
- Add new student records.
- Edit existing student information.
- Delete records using a confirmation modal.
- Validate required fields, email addresses, and age.
- Display the total number of students.
- Store student records in browser localStorage so they remain available after refreshing the page.
- Use modal dialogs for adding, editing, and confirming deletion.

## Student Information

Each student record includes:
- Student ID
- Full name
- Age
- Email address
- Course of study
- Enrollment status

## Technologies Used

- React
- JavaScript
- JSX
- CSS
- Vite
- Browser localStorage

## Installation and Setup

1. Install Node.js.
2. Clone or download this repository.
3. Open the project folder in a terminal.
4. Install the project dependencies:

   `npm install`

5. Start the development server:

   `npm run dev`

6. Open the local URL displayed in the terminal.

To create a production build, run:

`npm run build`

## Testing

The application was tested for the following behaviours:

- Adding a student.
- Editing and saving student information.
- Cancelling an edit without saving changes.
- Deleting a student after confirmation.
- Cancelling a deletion.
- Required-field validation.
- Invalid email and age validation.
- Keeping student records after refreshing the page.

## JavaScript and React Concepts

The application uses JavaScript data structures to manage student information and React state to update the interface when records change. It uses functions, event handlers, JSX, and modal dialogs to support student management operations.

Variable declarations and data types should be reviewed in the source code to ensure they match the concepts demonstrated by the application.

## Project Links

**GitHub Repository:**  
https://github.com/Karabo-Moru/Student-Management-System

**Live Application:**  
https://fabulous-blini-4a30c8.netlify.app
