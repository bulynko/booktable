

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

Meteor.publish("allMeetings", function () {
  return Meetings.find({}, {fields: {_id: 1, room: 1, room_name: 1 , start_t : 1 }});
});


