var mongoose = require('mongoose');

var volunteerSchema = mongoose.Schema({
  username: String,    // added field
  password: String    // added field
  firstName: String,
  lastName: String,
  middleInitial: String,
  dob: Date,
  // politicalInterest: Array,    // Array??
  // votersToContact: Array    // Array? ref?
})

var voterSchema = mongoose.Schema({
  name: String,
  age: Number,
  location: String,
  phoneNumber: Number,
  dateLastContacted: Date,
  volunteerAssigned: Boolean    //ref Object?
})

var Volunteer = mongoose.model('Volunteer', volunteerSchema);
var Voter = mongoose.model('Voter', voterSchema);

module.exports = {
  Volunteer, Voter
};
