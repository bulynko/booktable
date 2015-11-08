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
  
//-----------------
     var chkMeeting=Meetings.find({ 
      $or : [
      { $and:  [ {start_t :  { $lte: argStartTime }} , {end_t : { $gt: argStartTime }} ] } ,
      { $and:  [ {start_t :  { $lt: argEndTime }} , {end_t : { $gte: argEndTime }} ] }
      ] ,
      
      day : argDate ,room : argRoom}).fetch()[0];    
//------------------

     var resultMsg="??";
     var checkOK=true;

     if ( typeof(chkMeeting) != "undefined" )
     {
     	// resultMsg =  "ERROR ! " + argRoom+" - "+ " - "+ argDate+ " - "+argStartTime ;
     	 resultMsg = " Room already  booked : "+chkMeeting.name+ "  time:"+ chkMeeting.start_t   ;
       console.log(" Room already  booked : "+chkMeeting.name+ "  time:"+ chkMeeting.start_t +"  room:"+argRoom );
       checkOK=false;
     }
     else {
     	  resultMsg =  "Room is available  at "+argStartTime +" "+argDate ;
        console.log(" Room is available  ..... "+chkMeeting+" -> "+argDate) 
     }    	
      return [ checkOK , resultMsg] ; 
    },

//--------------------------------
  
  
  //=======================================================================
    checkRoom: function(argDate ,argRoom , col ){
    	
    console.log(" calling checkRoom ....."+ argDate + " -> "+ argRoom + "  type " + typeof col ) ;  
   //     var chkTime=Meetings.find({ day : argDate ,room : argRoom});    
   //     col.remove({});
   //var cursor = Meetings.find({ day : argDate ,room : argRoom});      
   var cursor = Meetings.find({});   
  
   cursor.forEach(function(doc){
     console.log(doc._id  +" - "+ doc.day);
     Persons._collection.insert(doc);          
     })
  }

//-------------------------------  
  
  
  })
  
  