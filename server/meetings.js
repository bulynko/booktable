
Meteor.publish("meetings", function (options, searchString) {

return Meetings.find({});

});