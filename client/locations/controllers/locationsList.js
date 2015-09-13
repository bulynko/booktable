angular.module("table").controller("LocationsListCtrl", ['$scope', '$meteor', '$rootScope', '$state',
  function($scope, $meteor, $rootScope, $state){
 
    console.log(" Controller for list 1 ..... ");

    $scope.timeMeeting="60min";
    $scope.startTimeMeeting="10:00";
    $scope.placeMeeting="GBM-HO"
    
    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    $scope.locations = $meteor.collection(Locations).subscribe('locations');
    $scope.rooms = $meteor.collection(Rooms).subscribe('rooms');
    $scope.meetings = $meteor.collection(Meetings).subscribe('meetings');


    $rootScope.reservationInprogress=false;

    $meteor.autorun($scope, function() {

     $rootScope.selected_timeMeeting=$scope.getReactively('timeMeeting');  
     
  });

   $scope.officeTime=[ '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
                       '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30',
                       '16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30' ];


  $scope.confirmMeetingButton = function(loc, t) {

     Meteor.call("reserveMeeting",loc, t);  
     console.log(" Registering a meeting ..... ");
  
  };

  $scope.removeMeetingButton = function(id) {

     Meteor.call("cancelMeeting",id);  
     console.log(" Cancel a meeting ..... "+id);
  
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

  $rootScope.prebookingMsg="Meeting : "+ loc + "  at "+ t + " / "+ $rootScope.selected_timeMeeting;    
  //console.log(" testing ..... ");   
   
  };

}]);