angular.module('table',[
  'angular-meteor',
  'ui.router',
  'ngMaterial'
])

//.config(function($mdThemingProvider) {
//  $mdThemingProvider.theme('default')
//    .primaryPalette('pink')
//    .accentPalette('orange');
//});

angular.module('table').config(['$mdIconProvider', function ($mdIconProvider) {

  $mdIconProvider

    .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
    .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
    .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
    .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
    .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
    .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
    .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");

}]);


function onReady() {
  angular.bootstrap(document, ['table']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
  

Meteor.myFunctions = { 

//==========================================================
 loadData :  function(info)
 { 
  var persons = [
 { id: 'a1', name: 'John'+info, age: 23 },
 { id: 'a2', name: 'Josh'+info, age: 25 },
 { id: 'a3', name: 'Tom'+info, age: 26 }
];

for (var i = 0; i < persons.length; i++) {
 Persons.insert(persons[i]);
}

},

//========================================================
 loadData2 :  function(col)
 {  
 var cursor = col.find();
cursor.forEach(function(doc){
  console.log(doc._id);
  Persons.insert(doc);
});
},


//========================================================
 loadDataFreeTime :  function(lstTime,col,argDate,duration,argRoom,nMax)
 { 
 var i=0;

   //  var end_t = new moment(  "2015-01-01 " + start_t); 
  	//  end_t.add(duration,"m");
  	  
 OfficeFreeTime.remove({});
 var  end_t = new moment();

 for (var j = 0; j < lstTime.length; j++) {
 
   // rec=col.find({ start_t :  lstTime[j] }).fetch()[0];
     end_t = new moment(  "2015-01-01 " + lstTime[j] ); 
  	  end_t.add(duration,"m");     
     endTime=end_t.format('HH:mm');
        
      rec1=col.find({ 
      $or : [
      { $and:  [ {start_t :  { $lte: lstTime[j] }} , {end_t : { $gt: lstTime[j] }} ] } ,
     // { $and:  [ {start_t :  { $lt: endTime }} , {end_t : { $gte: endTime }} ] }
      ] ,      
      day : argDate ,room : argRoom}).fetch()[0];    
  
      rec2=col.find({ 
      $or : [
   //   { $and:  [ {start_t :  { $lte: lstTime[j] }} , {end_t : { $gt: lstTime[j] }} ] } ,
      { $and:  [ {start_t :  { $lt: endTime }} , {end_t : { $gte: endTime }} ] } ,
      ] ,      
      day : argDate ,room : argRoom}).fetch()[0];     
  
 if (( typeof(rec1) != "undefined"  ) ||  ( typeof(rec2) != "undefined"  )  )
 {   
 
    if ( typeof(rec1) != "undefined"  ) 
     {OfficeFreeTime.insert( { start_t: lstTime[j] , color: 'red' , bckcolor: 'red' ,  isDisabled : true  }); } 
    else    { OfficeFreeTime.insert( { start_t: lstTime[j] , color: 'yellow' , bckcolor: 'yellow' ,  isDisabled : true  }); }
   
   }
   else 
   {    OfficeFreeTime.insert( { start_t: lstTime[j] , color: 'green' , isDisabled : false  });  }
}

// var cursor = col.find();
//cursor.forEach(function(doc){
//  i++;
//  if (i <nMax)
 //{
//  console.log(doc+" "+i);
  //     OfficeFreeTime.insert({ _id: doc._id, start_t: doc.start_t});
    // OfficeFreeTime.insert(doc);
  //}
//});
}

}

