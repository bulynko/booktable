App.info({
  id: 'booking.badmintondubai.com',
  description: 'An iOS app built with Meteor',
  name: 'bookshenu',
  version: '0.0.1',
  author: 'Sheniyas Kazhungil',
  email: 'sheniyas@sheniyas.com',
  website: 'http://www.sheniyas.com'

});


App.icons({
  // iOS
  'iphone': 'resources/icons/icon-60.png',
  'iphone_2x': 'resources/icons/icon-60@2x.png',
  'iphone_3x': 'resources/icons/icon-60@3x.png',
  'ipad': 'resources/icons/icon-76.png',
  'ipad_2x': 'resources/icons/icon-76@2x.png',

});

App.launchScreens({
  // iOS
  'iphone': 'resources/splash/Default-Portrait.png',
  'iphone_2x': 'resources/splash/Default-Portrait@2x.png',
  'iphone5': 'resources/splash/Default-568h@2x.png',
  'iphone6': 'resources/splash/Default-667h@2x.png',
  'iphone6p_portrait': 'resources/splash/Default-667h@2x.png',
  'iphone6p_landscape': 'resources/splash/Default-Landscape-736h@3x.png',


});

App.setPreference('SplashScreen', 'screen');
App.setPreference('SplashScreenDelay', '10000');


App.accessRule('*');

