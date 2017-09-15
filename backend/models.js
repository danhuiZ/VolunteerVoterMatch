var mongoose = require('mongoose');

var volunteerSchema = mongoose.Schema({
  username: String,    // added field
  password: String,    // added field
  firstName: String,
  lastName: String,
  middleInitial: String,
  dob: Date,
  politicalInterest: Array,
  matchedVoters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voter'
  }]
},{
  toJSON:{
    virtuals:true
  }
})

var voterSchema = mongoose.Schema({
  name: String,
  age: Number,
  location: String,
  phone: Number,
  date: String,    // date last contacted
  volunteerAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'
  }
})

function getAge(birthday) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

var ageVirtual = volunteerSchema.virtual('age');
ageVirtual.get(function(){
  return getAge(this.dob)
})

var Volunteer = mongoose.model('Volunteer', volunteerSchema);
var Voter = mongoose.model('Voter', voterSchema);

module.exports = {
  Volunteer, Voter
};
