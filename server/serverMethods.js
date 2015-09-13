Meteor.methods({
	
    reserveMeeting: function (n,l) {
    console.log(" joining  meeting .....") 
    Meetings.insert({name: n, loc: l}); 
  },
  
  //------------
    cancelMeeting: function (id) {
    //console.log(" joining  meeting .....") 
    Meetings.remove({_id: id}); 
  }

  //------------  
  
  
  
  })