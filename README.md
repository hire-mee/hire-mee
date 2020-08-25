<p align="center"><img src="demo.jpg"/></p>

# Hire-Mee

Welcome to Hire-Mee! This is a web application that provides an organized space for job seekers to input information about submitted job applications. Features include: an interactive list that allows user to seamlessly move jobs between different status piles, user statistic page along with individual job post modals that display information, fully-functional friends list, leaderboard feature, and interactive map that allows users to track job locations relative to themselves.

View here: http://54.151.84.70:3000/

## Installation

- Download repository onto local machine
- Run <b>npm install</b> in terminal to download dependencies
- Run <b>npm start</b> to start server and access database
- Run <b>npm run-script build</b> to convert JSX into bundle
- Run <b>psql -u postgres < schema.sql</b> to seed database
- Access <b>localhost:3000</b> on browser to view page

## Usage

<h3>Login/Sign-Up</h3>

<p align="center"><img src="https://i.imgur.com/qMvIrFw.gif"/><p>
  
- Fully secure authentication process
- Serialization of users profiles
- Encrypted and salted password with Passport.js
- Google Authentication option

<h3>Job Menu</h3>

<p align="center"><img src="https://i.imgur.com/gFNdO6e.gif"/><p>
  
- Add, edit, and sort job applications between four columns
- Click to bring up detailed view of a singular application

<h3>Statistics</h3>

<p align="center"><img src="https://i.imgur.com/CrddZ7n.gif"/><p>
  
- View job application progress
- Displays user's job activity statistics

<h3>Friends List</h3>

<p align="center"><img src=https://i.imgur.com/y7MSLak.gif"/><p>
  
- Fully functional friends list
- Add users by their email and see their progress

<h3>Leaderboard</h3>

<p align="center"><img src=https://i.imgur.com/gp2aXKP.gif"/><p>
  
- Leaderboard dynamically renders weekly applications between friends
- Compare users' statistics and ranked from most to least applied users

<h3>Map</h3>

<p align="center"><img src=https://i.imgur.com/52iCxvi.gif"/><p>
  
- Map component allows user to add and persist home location
- Plots job locations relative to home and other locations
- Clicking on markers allows user to view key data points
