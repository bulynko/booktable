(function(){
Meteor.startup(function() { $('body').attr({"layout":"column"}); });

Template.body.addContent((function() {
  var view = this;
  return [ HTML.getTag("md-toolbar")({
    "md-scroll-shrink": "",
    layout: "row",
    "layout-align": "start center",
    "layout-padding": ""
  }, "\n    \n   \n    ", HTML.DIV({
    "class": "container",
    "ng-if": "currentUser"
  }, "   \n      ", HTML.getTag("md-button")({
    "ng-controller": "LoginCtrl",
    "class": "md-raised md-primary",
    "ng-click": "userLogout()"
  }, " \n       LOGOUT "), "    \n      \n    "), "    \n\n\n    ", HTML.DIV({
    "class": "container",
    "ng-if": "! currentUser"
  }, "   \n  HELLO \n    "), "         \n     \n    ", HTML.SPAN({
    flex: ""
  }, " ", HTML.DIV({
    align: "center"
  }, "BOOK MY PLACE  "), " "), "   \n\n", HTML.Comment('\n    <div style="padding-right: 20px">\n      <a href="/meetings">M</a>\n      <a href="/locations">L</a>\n    </div>\n'), "\n\n    ", HTML.DIV({
    "class": "container",
    "ng-if": "! currentUser"
  }, "   \n      ", HTML.getTag("md-button")({
    "ng-controller": "LoginCtrl",
    "class": "md-raised md-primary",
    "ng-href": "/register"
  }, " \n       REGISTER "), "    \n    "), "  \n\n\n\n\n  "), HTML.Raw('  <!-- Toolbar -->\n\n\n  <div ui-view="" class="container-fluid">   </div>') ];
}));
Meteor.startup(Template.body.renderToDocument);

})();
