angular.module("table").controller("MeetingsListCtrl", ['$scope', '$meteor', '$rootScope', '$state',
  function($scope, $meteor, $rootScope, $state){
 
    console.log(" Meeting Controller Activated ..... ");

 $scope.selectedIndex = 1;
 
    $scope.setTabIndex = function(idx){
    	 $scope.selectedIndex = idx;

      return 1;
    };

}]);


