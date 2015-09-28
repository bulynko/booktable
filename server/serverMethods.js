Meteor.methods({

   //======================================================================================
    reserveMeeting: function (uid,title,loc,argRoom,room_name ,argStartTime,argEndTime, argDate ) {

     //var chkMeeting=Meetings.find({start_t : start_t , room : room, }).fetch()[0];    
  //   var chkMeeting=Meetings.find({start_t : { $lte: start_t  }, day : start_d ,room : room}).fetch()[0];      
 
 //-----------------
     var chkMeeting=Meetings.find({ 
      $or : [
      { $and:  [ {start_t :  { $lte: argStartTime }} , {end_t : { $gt: argStartTime }} ] } ,
      { $and:  [ {start_t :  { $lt: argEndTime }} , {end_t : { $gte: argEndTime }} ] }
      ] ,
      
      day : argDate ,room : argRoom}).fetch()[0];    
   //---------------------------------------
   
     var resultMsg="OK";

     if ( typeof(chkMeeting) != "undefined" )
     {
       console.log(" 1-Meeting found : "+chkMeeting.name+"  date:" + argDate+ "  time:"+ chkMeeting.start_t +"  room:"+argRoom );
       resultMsg=" ROOM NOT AVAILABLE ";      
     }
     else {
     console.log(" joining  meeting ..... "+chkMeeting) 
     Meetings.insert({ uid: uid, name: title, loc: loc,room: argRoom, room_name: room_name ,day: argDate ,start_t: argStartTime, end_t: argEndTime}); 
    }  
    return resultMsg;
  },
  
  //=========================================================
    cancelMeeting: function (id) {
    //console.log(" joining  meeting .....") 
    Meetings.remove({_id: id}); 
  },

  //=======================================================================
    precheckMeeting: function(argStartTime , argEndTime , argDate ,argRoom ){
    	console.log(" calling myMeteorMethod ....."+ argStartTime + " -> "+ argRoom )  
  
//     var chkMeeting=Meetings.find({start_t : argTime , room : argRoom}).fetch()[0];    
 // { $gte : new ISODate("2012-01-12T20:15:31Z") }
//-----------------
     var chkMeeting=Meetings.find({ 
      $or : [
      { $and:  [ {start_t :  { $lte: argStartTime }} , {end_t : { $gt: argStartTime }} ] } ,
      { $and:  [ {start_t :  { $lt: argEndTime }} , {end_t : { $gte: argEndTime }} ] }
      ] ,
      
      day : argDate ,room : argRoom}).fetch()[0];    
//------------------

     var resultMsg="??";

     if ( typeof(chkMeeting) != "undefined" )
     {
     	 resultMsg =  "ERROR ! " + argRoom+" - "+ " - "+ argDate+ " - "+argStartTime ;
       console.log(" Room already  booked : "+chkMeeting.name+ "  time:"+ chkMeeting.start_t +"  room:"+argRoom );
     }
     else {
     	  resultMsg =  "OK ! " + argRoom+" - "+argStartTime ;
        console.log(" Room is available  ..... "+chkMeeting+" -> "+argDate) 
     }    
    	
      return resultMsg ; 
    }

//--------------------------------
  
  })
  
  