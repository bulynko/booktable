
Meteor.publish("locations", function (options, searchString) {
//Meteor.publish("locations", function () {

console.log("SERVER:  from subscribe locations .....")

return Locations.find({});


});

