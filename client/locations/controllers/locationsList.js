angular.module("table").controller("LocationsListCtrl", ['$scope', '$meteor', '$rootScope', '$state',
  function($scope, $meteor, $rootScope, $state){
 
    console.log(" Controller for list 1 ..... ");

    $meteor.session('precheckConfirmed').bind($scope, 'precheckConfirmed');
    $meteor.session('precheckInfo').bind($scope, 'myMethodResult2');
    $rootScope.reservationInprogress=false;     
    $scope.timeMeeting="60";
    $scope.startTimeMeeting="10:00";
    $scope.placeMeeting="GBM-HO"
    $rootScope.reservationInprogress=false;
    
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    $scope.locations = $meteor.collection(Locations).subscribe('locations');
   //  $scope.rooms = $meteor.collection(Rooms).subscribe('rooms');
   //  $scope.meetings =
     $meteor.collection(Meetings).subscribe('meetings');

     Persons = new Mongo.Collection(null);
     OfficeFreeTime = new Mongo.Collection(null);
      
     $scope.meetings  = $meteor.collection(function() {
    //  return Meetings.find({uid : $scope.currentUser._id }, { sort : 0});
     return Meetings.find({ uid : $scope.currentUser._id  });
    });      
 
     $scope.allmeetings  = $meteor.collection(function() {
     return Meetings.find({  });
    });   
 
     $rootScope.prebookingMsg="Schedule ......";    
     $scope.selectedIndex = 0;

      //$scope.dayRoomPlan = new Meteor.Collection( null );
      //$scope.dayRoomPlan = new Meteor.Collection( null );
      //$scope.dayRoomPlan.remove();
      //$scope.dayRoomPlan.insert({ name: 'DDD' } );

      Meteor.myFunctions.loadData($scope.currentUser.emails[0].address);
      $scope.officeFreeTime = $meteor.collection(OfficeFreeTime);
     
     // Meteor.myFunctions.loadData2(Meetings);
 
     $scope.tasks = $meteor.collection(Persons);
  
   //===================================================================
     $scope.rooms = $meteor.collection(function() { 
     return Rooms.find({loc : $scope.getReactively('placeMeeting')  })
    });

    $meteor.subscribe('rooms'); 
   
   //=====================================================================
    $meteor.autorun($scope, function() {
    $rootScope.selected_timeMeeting=$scope.getReactively('timeMeeting'); 
    $scope.roomMeeting=$scope.getReactively('rooms[0]._id'); 
    //$scope.myMethodResult2=$scope.getReactively('myMethodResult'); 
    //$scope.myMethodResult2=Session.get('myMethodResult'); 
  });

   $scope.officeTime=[ '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
                       '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30',
                       '16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30' ];
   

  // Meteor.myFunctions.loadDataFreeTime(  $scope.officeTime, Meetings,3);
  // Meteor.myFunctions.loadData2(Meetings);
 
     var ld = new Array(15);
     for (var i = 0 ; i < 10 ; i++)
     {
	    ld[i]=moment(new Date());
	    ld[i].add(i,"days");
	 	}     
     
     $scope.startDateMeeting= ld[0].clone() ;
     $scope.officeDate =[ ld[1]  , ld[2] , ld[3] , ld[4] , ld[5] , ld[6] , ld[7] ];


//=====================================================================================
  $scope.precheckMeetingButton = function(loc, roomID , day, start_t, duration) {

     $rootScope.prebookingMsg="Meeting : "+ loc + "  at "+ start_t + " / "+ $rootScope.selected_timeMeeting;    
     $rootScope.reservationInprogress=true;
     $scope.selectedIndex = 1;
     
     var end_t = new moment(  "2015-01-01 " + start_t); 
  	  end_t.add(duration,"m");
     //var  start_d  = new moment( day );	     
   
     Meteor.myFunctions.loadDataFreeTime(  $scope.officeTime, Meetings, day ,duration,roomID, 3);   
     
     Meteor.call('precheckMeeting', start_t , end_t.format('HH:mm') , day ,roomID, function(error, result){
     Session.set('precheckConfirmed', result[0]); 
     Session.set('precheckInfo', result[1]); 
     //$scope.myMethodResult="call back ...";
     $scope.titleMeeting="Team Meeting";
     console.log(" Meteor.call precheckMeeting , result: "+ result); 
     
      });       
    };
         
           
  //========================================================================================================       
    $scope.confirmMeetingButton = function(uid,loc,room, start_t,duration , day , title ) {    

     var end_t = new moment(  "2015-01-01 " + start_t); 
  	  end_t.add(duration,"m");
   //  var  start_d  = new moment( day );	  
  	  
     Meteor.call("reserveMeeting",uid,title,loc,room , $scope.getRoomById( room ) , start_t,end_t.format('HH:mm'),day,
      function(error, result){
       Session.set('precheckInfo', result); 
       console.log(" Meteor.call reserveMeeting , result: "+ result); 
      } );  
 
     console.log(" Registering a meeting ..... ");
     $rootScope.reservationInprogress=false;  
 	  $scope.selectedIndex = 0; 
  };


//$scope.setTabIndex = function(idx){
//    return 1;
//  	 $scope.selectedIndex = idx;  	 
//  }

  //======================================================================
  $scope.removeMeetingButton = function(id) {
  	     Meteor.call("cancelMeeting",id);  

     console.log(" Cancel a meeting ..... "+id);
  };
  

  //===================================================== 
  $scope.selectMeetingButton = function() {
     $scope.selectedIndex = 0;
  };
   
   //=================================================================
   $scope.getRoomById = function(roomId){
         room_name=Rooms.findOne(roomId).name;
      return room_name;
    };
}]);

  
//######################################################################################################
angular.module("table").controller("Locations2ListCtrlOLD", ['$scope', '$meteor', '$rootScope', '$state',
  function($scope, $meteor, $rootScope, $state){
      $scope.users2 = $meteor.collection(Meteor.users, false).subscribe('users');  
   // $scope.isLoggedIn = isLoggedIn;
  //  $scope.currentUser = AuthService.currentUser();
     $rootScope.prebookingMsg="Schedule ......";    
     $scope.precheckMeetingButtonOLD = function(loc, t) {
     $rootScope.prebookingMsg="Meeting : "+ loc + "  at "+ t + " / "+ $rootScope.selected_timeMeeting;    
     $rootScope.reservationInprogress=true;
     
  };

}]);
//######################################################################################################


