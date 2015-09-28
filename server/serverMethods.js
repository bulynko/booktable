Meteor.methods({

   //======================================================================================
    reserveMeeting: function (uid,title,loc,room,room_name ,start_t,end_t, start_d ) {
     var chkMeeting=Meetings.find({start_t : start_t , room : room, }).fetch()[0];    
     var resultMsg="OK";

     if ( typeof(chkMeeting) != "undefined" )
     {
       console.log(" 1-Meeting found : "+chkMeeting.name+"  date:" + start_d+ "  time:"+ chkMeeting.start_t +"  room:"+room );
       resultMsg=" ROOM NOT AVAILABLE ";      
     }
     else {
     console.log(" joining  meeting ..... "+chkMeeting) 
     Meetings.insert({ uid: uid, name: title, loc: loc,room: room, room_name: room_name ,day: start_d ,start_t:start_t,end_t: end_t}); 
    }  
    return resultMsg;
  },
  
  //=========================================================
    cancelMeeting: function (id) {
    //console.log(" joining  meeting .....") 
    Meetings.remove({_id: id}); 
  },


  //=======================================================================
    precheckMeeting: function(argTime , argDate ,argRoom ){
    	console.log(" calling myMeteorMethod ....."+ argTime + " -> "+ argRoom )  
  
     var chkMeeting=Meetings.find({start_t : argTime , room : argRoom}).fetch()[0];    
     var resultMsg="??";

     if ( typeof(chkMeeting) != "undefined" )
     {
     	 resultMsg =  "ERROR ! " + argRoom+" - "+ " - "+ argDate+ " - "+argTime ;
       console.log(" Room already  booked : "+chkMeeting.name+ "  time:"+ chkMeeting.start_t +"  room:"+argRoom );
     }
     else {
     	  resultMsg =  "OK ! " + argRoom+" - "+argTime ;
        console.log(" Room is available  ..... "+chkMeeting) 
     }    
    	
      return resultMsg ; 
    }

//--------------------------------
  
  })
  
  