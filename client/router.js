

angular.module("table").run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go("loginStart");
      $location.path("/login");
    }
  });
}]);

angular.module("table").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('loginStart', {
        url: '/login',
        templateUrl: 'client/login/views/login-start.ng.html',
        controller: 'LoginCtrl'
      })
        .state('registerUser', {
        url: '/register',
        templateUrl: 'client/login/views/register-user.ng.html',
        controller: 'LoginCtrl'
      })
        .state('meetings', {
        url: '/meetings',
        templateUrl: 'client/meetings/views/meetings-list.ng.html',
        controller: 'MeetingsListCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]        
        }
      })
        .state('locations', {
        url: '/locations',
        templateUrl: 'client/locations/views/locations-list.ng.html',
        controller: 'LocationsListCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]        
        }
      })
        .state('locationDetails', {
        url: '/locations/:locId',
        templateUrl: 'client/places/views/spot-details.ng.html',
        controller: 'LocationDetailsCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      });

    $urlRouterProvider.otherwise("/login");

//    $urlRouterProvider.when('/locations', '/login');
   
  }]);

