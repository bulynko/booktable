angular.module("table").controller("LocationsListCtrl", ['$scope', '$meteor', '$rootScope', '$state',
  function($scope, $meteor, $rootScope, $state){
 
    console.log(" Controller for list 1 ..... ");

    $scope.timeMeeting="60min";
    $scope.startTimeMeeting="10:00";
    $scope.placeMeeting="GBM-HO"
    $rootScope.reservationInprogress=false;
    
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    $scope.locations = $meteor.collection(Locations).subscribe('locations');
  //  $scope.rooms = $meteor.collection(Rooms).subscribe('rooms');
    $scope.meetings = $meteor.collection(Meetings).subscribe('meetings');


    $scope.rooms = $meteor.collection(function() { 

      return Rooms.find({loc : $scope.getReactively('placeMeeting')  })
    });


    $meteor.subscribe('rooms'); 
   
    $meteor.autorun($scope, function() {
      $rootScope.selected_timeMeeting=$scope.getReactively('timeMeeting'); 
      $scope.roomMeeting=$scope.getReactively('rooms[0]._id'); 
  });


   $scope.officeTime=[ '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
                       '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30',
                       '16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30' ];
   
     
  $scope.confirmMeetingButton = function(uid,loc,room, start_t,duration ) {


     Meteor.call("reserveMeeting",uid,"Team-Meeting",loc,room , $scope.getRoomById( room ) , start_t,duration);  
     console.log(" Registering a meeting ..... ");
     $rootScope.reservationInprogress=false;  
  };

  $scope.removeMeetingButton = function(id) {

     Meteor.call("cancelMeeting",id);  
     console.log(" Cancel a meeting ..... "+id);
   
  };

  $scope.selectMeetingButton = function() {
     $rootScope.reservationInprogress=false;
  };

  
   $scope.getRoomById = function(roomId){
      var room_name;
      
         room_name=Rooms.findOne(roomId).name;
    
      return room_name;
    };


}]);


angular.module("table").controller("Locations2ListCtrl", ['$scope', '$meteor', '$rootScope', '$state',
  function($scope, $meteor, $rootScope, $state){

    $scope.users2 = $meteor.collection(Meteor.users, false).subscribe('users');  
   // $scope.isLoggedIn = isLoggedIn;
  //  $scope.currentUser = AuthService.currentUser();
  //  $scope.u2="Schedule ......";    
   $rootScope.prebookingMsg="Schedule ......";    

  $scope.precheckMeetingButton = function(loc, t) {
     $rootScope.reservationInprogress=true;
     $rootScope.prebookingMsg="Meeting : "+ loc + "  at "+ t + " / "+ $rootScope.selected_timeMeeting;    
  //console.log(" testing ..... ");   
   
  };

}]);