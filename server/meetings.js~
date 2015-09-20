
//Meteor.publish("meetings", function (options, searchString) {
//return Meetings.find({});
//});



//Meteor.publish("meetings", function (options,searchString) {

Meteor.publish("meetings", function () {


  return Meetings.find({
     $or:[
      {$and:[
        {"public": true},
        {"public": {$exists: true}}
      ]},
      {$and:[
        {uid: this.userId},
        {uid: {$exists: true}},
      ]}
    ]} );
});

