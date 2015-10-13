

Meteor.publish("meetings", function () {
 return Meetings.find({});
});

/*
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
*/



Meteor.publish("allmeetings", function () {
  //var  res=new [{name: 'dd1'},{name: 'dd2'},{name: 'dd3'},{name: 'dd4'},{name: 'ddLAST'} ];
  //return res;
  return Meetings.find({}, {fields: {_id: 1, room: 1, room_name: 1 , start_t : 1 }});
});





