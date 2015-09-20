Meteor.methods({

   //function(uid,loc,room, start_t,duration ) 	
    reserveMeeting: function (uid,title,loc,room,room_name ,start_t,end_t ) {

     var chkMeeting=Meetings.find({start_t : start_t , room : room}).fetch()[0];    

     if ( typeof(chkMeeting) != "undefined" )
     {
       console.log(" 1-Meeting found : "+chkMeeting.name+ "  time:"+ chkMeeting.start_t +"  room:"+room );
//       $rootScope.prebookingMsg=" ROOM NOT AVAILABLE ";      
     }
     else {
    console.log(" joining  meeting ..... "+chkMeeting) 
    Meetings.insert({ uid: uid, name: title, loc: loc,room: room, room_name: room_name ,day: "today" ,start_t:start_t,end_t: end_t}); 
    }  
  },
  
  //------------
    cancelMeeting: function (id) {
    //console.log(" joining  meeting .....") 
    Meetings.remove({_id: id}); 
  }



  //------------  
  
  
  })