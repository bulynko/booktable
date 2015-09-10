angular.module("table").controller("LoginCtrl", ['$scope', '$meteor', '$rootScope', '$state',
  function($scope, $meteor, $rootScope, $state){
 
    console.log(" Login-Controller..... ");

   // $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

 $scope.userLoginButton = function(myuser) {
  
  $scope.myuser_email2=myuser.email;
  $scope.myuser_password2=myuser.password;

  var u = myuser_email2=myuser.email;
  var p = myuser.password;
    
  console.log(" trying to login  ..... "+p+" / "+u);   
  Meteor.logout();  
  Meteor.loginWithPassword(u, p);  
  $state.go("locations");   

  $scope.loginErrorMessage="Error Login ..... try again ! " ;
 
    
  };


 $scope.userLogout = function() {
  
  Meteor.logout();  
  $state.go("loginStart");   
     
  };

}

]);


