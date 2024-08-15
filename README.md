# Movie Mania App

## Description

The Movie mania App is an Angular application that displays a list of movies fetched from The Movie Database (TMDb). Users can filter movies by genre, and the app features infinite scrolling to load movies from previous or next years as the user scrolls through the list. The design is inspired by popular streaming platforms with a responsive layout.

## Features

- Movie Display: Movies are displayed in descending order of popularity, with details including title, genre, cast, director, and a short description.
- Genre Filtering: Users can filter movies by genre. The genres are fetched from the TMDb API.
- Infinite Scroll: Smooth scrolling loads movies from previous years when scrolling up and from subsequent years when scrolling down.
- Responsive Design: The app is mobile-friendly with a layout that adjusts seamlessly to different screen sizes.

## Prerequisites

- Node.js (version 12.x or higher)
- npm (version 6.x or higher)
- Angular CLI (version 12.x or higher)

## To run the application locally

- run npm install in command line
- run ng serve

You can access it in http://localhost:4200/

## Points Covered

● The list of genres should come from an API.
● Users should be able to select multiple genres.
● All genres should be included in the list.
● Users should be able to select and deselect genres by clicking on them.
● The list of movies should come from the API and be sorted by release year.
● When users select genres, only movies from those genres should be shown.
● Load movies from the previous year when users scroll up, and from the next year when
they scroll down, until the current year. (You can use any library for this).
● Ensure the interface is mobile-friendly and visually appealing.
● The code should be well-organized into components, clean, and well-commented.
● The README file should be well-documented, explaining how to run the project locally
and include the live site URL.

## Points not covered

● Share the live site where the application can be viewed.
