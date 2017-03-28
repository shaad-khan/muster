// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova','chart.js'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $rootScope.deviceid=device.uuid;
    //alert($rootScope.deviceid);
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // $location.path('/landing');
  });
})

.config(function($stateProvider,$urlRouterProvider,ChartJsProvider) {

ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });
$stateProvider
        .state('landing', {
            url: '/landing',
            controller: 'landing',
            templateUrl: 'templates/landing.html',
             resolve: {
            cordova: function($q) {
                var deferred = $q.defer();
                ionic.Platform.ready(function() {
                    console.log('ionic.Platform.ready');
                    deferred.resolve();
                });
                return deferred.promise;
            }
             }
    })
    .state('register', {
            url: '/register',
            controller: 'register',
            templateUrl: 'templates/register.html'
    })
.state('firstpage', {
            url: '/firstpage',
            controller: 'firstpage',
            templateUrl: 'templates/firstpage.html'
    })
    .state('secondpage', {
            url: '/secondpage',
            controller: 'secondpage',
            templateUrl: 'templates/secondpage.html'
    })
    .state('detail', {
            url: '/detail/:type',
            controller: 'detail',
            templateUrl: 'templates/detail.html'
    })
    .state('notify', {
            url: '/notify',
            controller: 'notify',
            templateUrl: 'templates/notify.html'
    })
    .state('notify2', {
            url: '/notify2',
            controller: 'notify',
            templateUrl: 'templates/notify2.html'
    })
      .state('map', {
            url: '/map',
            controller: 'MapCtrl',
            templateUrl: 'templates/map.html'
    })
    .state('graph', {
            url: '/graph',
            controller:'graph',
            templateUrl: 'templates/graph.html'
    });

  $urlRouterProvider.otherwise('/map');
  // if none of the above states are matched, use this as the fallback
 // $urlRouterProvider.otherwise('/tab/dash');

});
