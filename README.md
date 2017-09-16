# Volunteer-Voter-Match Project

## Synopsis

This project helps digital volunteers who sign up for Karen's campaign in Michigan to match with voter data in the district.

## Data provided/ to be provided

- Volunteer: first name, last name, middle initial, date of birth, political interest;
- Voter: name, age, location, phone number, date last contacted

## Built with

React, Node, Express, Passport, Material UI, Mongoose, MongoDB, Webpack

## Demo

Watch the demo [here](https://youtu.be/PaKOmQ2d_yI)

## Building from source

To build:
```
git clone https://github.com/danhuiZ/VolunteerVoterMatch.git
cd VolunteerVoterMatch
npm install
npm start
```
## Additional reminders

- Make sure you have your ```env.sh``` file which is in the format of ```export MONGODB_URI="mongodb://{username}:{password}@xx123456.mlab.com:12345/{databaseName}}";``` for process variable
- The voter data can be changed by updating the ```voters.json``` file and pressing load voter data button under admin view
