angular.module('starter.controllers', [])

/*-------------------------------------*/
.controller('MapCtrl', ['$scope', function($scope,$timeout) {
    function initMap() {
     //alert("here");
     var lat1=0;
            var lng2=0;
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 12.9716, lng: 77.5946},
          zoom: 13
        });
        var card = document.getElementById('pac-card');
        var input = document.getElementById('pac-input');
        var types = document.getElementById('type-selector');
        var strictBounds = document.getElementById('strict-bounds-selector');

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

        var autocomplete = new google.maps.places.Autocomplete(input);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          lat1 = place.geometry.location.lat(),
    lng2 = place.geometry.location.lng();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
        });
marker.addListener('click', function() {
         // map.setZoom(8);
         // map.setCenter(marker.getPosition());
         alert(lat1+"----"+lng2);
        });
        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        /*function setupClickListener(id, types) {
          var radioButton = document.getElementById(id);
          radioButton.addEventListener('click', function() {
            autocomplete.setTypes(types);
          });
        }

        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-establishment', ['establishment']);
        setupClickListener('changetype-geocode', ['geocode']);

        document.getElementById('use-strict-bounds')
            .addEventListener('click', function() {
              console.log('Checkbox clicked! New state=' + this.checked);
              autocomplete.setOptions({strictBounds: this.checked});
            });*/
      }
      initMap();
      }])

/*----------------------------------------------------*/



.controller('DashCtrl', function($scope) {})
.controller('notify', function($scope,$rootScope,service_call,$interval) {
  $scope.items={};
  service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/push_info.php?imei="+$rootScope.deviceid).then(function(response){
      $scope.items=response.data;
      
   // console.log($scope.it);
   // it[0].Vcount;
      
     // console.log($scope.items)
    });
var b=$interval(bcheck, 2000);
  function bcheck()
  {
    service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/push_info.php?imei="+$rootScope.deviceid).then(function(response){
      $scope.items=response.data;
      
   // console.log($scope.it);
   // it[0].Vcount;
      
     // console.log($scope.items)
    });
    $scope.$on('$destroy', function () { 
  
  
  if (angular.isDefined(b)) {
    
            $interval.cancel(b);
           b = undefined;
          }

    
    
});
  }

$scope.read=function (v1) {
  //alert(v1);
service_call.serv("http://csmonitoring-dev.azurewebsites.net/coyote/push_update.php?imei="+$rootScope.deviceid+"&id="+v1).then(function(response){
      $scope.items=response.data;
      
   // console.log($scope.it);
   // it[0].Vcount;
      
     // console.log($scope.items)
    });



}



})
.controller('badge', function($scope,$rootScope,service_call,$interval,$cordovaVibration) {

  service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/push_info.php?imei="+$rootScope.deviceid+"&count=1").then(function(response){
      var d=response.data;
      if(d[0].bcount>0)
      {
      $scope.bcount=d[0].bcount;
      $cordovaVibration.vibrate(500);
    }
     else{
      $scope.bcount=d[0].bcount;
    }
   // console.log($scope.it);
   // it[0].Vcount;
      
     // console.log($scope.items)
    });
     	//$scope.load2='false';
var b=$interval(bcheck, 7000);
  function bcheck()
  {
    service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/push_info.php?imei="+$rootScope.deviceid+"&count=1").then(function(response){
      var d=response.data;
      if(d[0].bcount>0)
      {
      $scope.bcount=d[0].bcount;
      $cordovaVibration.vibrate(200);
    }
    else{
      $scope.bcount=d[0].bcount;
    }
   // console.log($scope.it);
   // it[0].Vcount;
      
     // console.log($scope.items)
    });
    $scope.$on('$destroy', function () { 
  
  
  if (angular.isDefined(b)) {
    
            $interval.cancel(b);
           b = undefined;
          }

    
    
});
  }

})
.controller('graph', function($scope,$rootScope,service_call,$ionicLoading,$timeout,$ionicModal) {


$scope.toggleItem= function(item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function(item) {
    return $scope.shownItem === item;
  };


/*-------------------------------------------------------*/
$scope.date = new Date();
service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/mcoyoteinfo.php").then(function(response){
  
     	//$scope.load2='false';

      $scope.it=response.data;
   // console.log($scope.it);
   // it[0].Vcount;
      
     // console.log($scope.items)
    });


$scope.dateload=function(v1)
{
  v1=convert(v1);
  $scope.date=v1;
  $ionicLoading.show({template: 'Loading Data... <ion-spinner icon="android" class="custom-icon"></ion-spinner>'});
service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/mcoyoteinfo.php?date="+v1).then(function(response){
  
     	//$scope.load2='false';
console.log("https://csmonitoring-dev.azurewebsites.net/coyote/mcoyoteinfo.php?date="+v1);
     
      $timeout(function() {
         $scope.it=response.data;
        $ionicLoading.hide();
    }, 8000);
      
    console.log($scope.it);
      
     // console.log($scope.items)
    });

}

function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
}



  

   $scope.openModal = function(v1,v2,v3,v4,v5,v6) {
     $scope.labels = ["Openings:"+v1, "Received:"+v2, "Processed:"+v3,"Closed:"+v4,"BacklogDays:"+v5];
     $scope.modal = $ionicModal.fromTemplate( '<ion-modal-view>' +
      ' <ion-header-bar>' +
         '<h1 class = "title">'+v6+'</h1>' +
          '<button class = "button icon icon-left ion-ios-close-outline"'+
            'ng-click = "closeModal()"></button>'+
      '</ion-header-bar>' +
		
      '<ion-content>'+
         '<canvas id="doughnut" class="chart chart-doughnut"'+
  'chart-data="data" chart-labels="labels"  chart-options="options">'+
'</canvas>'+
      '</ion-content>' +
		
   '</ion-modal-view>', {
      scope: $scope,
      animation: 'slide-in-up'
   });
      $scope.modal.show();
      $rootScope.des=v6;
      //$scope.name=v1;
      /*console.log("here"+v1);
      console.log("here"+v2);
      console.log("here"+v3);
      console.log("here"+v4);
      console.log("here"+v5);*/
      var d=[] ;
      d.push(v1);
      d.push(v2);
      d.push(v3);
      d.push(v4);
      d.push(v5);
      $scope.data=d;
      console.log($scope.data);
   };
	
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
	
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
	
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });




/*--------------------------------------------------------------------------*/








  
  $scope.options = {legend: {display: true},onAnimationComplete: function () {
            this.showTooltip(this.segments, true);
        }};//  legendTemplate: "<ul><% for (var i=0; i<$scope.data.length; i++){%><li><span style=\"background-color:<%=$scope.data[i].color%>\"></span><%=data[i].label%> - <%=$scope.data[i].value%></li><%}%></ul>"};
  
/*$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
$scope.series = ['Series A', 'Series B'];
  			$scope.data = [[65, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90]];
			$scope.onClick = function (points, evt) {
			console.log(points, evt);};
			$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
			$scope.options = {
				scales: {
					yAxes: [
				        {
				          id: 'y-axis-1',
				          type: 'linear',
				          display: true,
				          position: 'left'
				        },
				        {
				          id: 'y-axis-2',
				          type: 'linear',
				          display: true,
				          position: 'right'
				        }
				     ]
				    }
				  };*/


})
.controller("donut", function ($scope) {
  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [500, 500, 100];
})
.controller('detail', function($scope,Camera,$rootScope,$ionicLoading,$cordovaFileTransfer,$stateParams,service_call,$location) {
  $scope.type=$stateParams.type;
  $scope.inv=$rootScope.inv;
$scope.takePicture = function (options) {
	$scope.cflag='true';
      var options = {
         quality : 75,
         targetWidth: 1000,
         targetHeight: 1000,
         //allowEdit: true,
         correctOrientation:false,
         cameraDirection:0,
         popoverOptions: CameraPopoverOptions,
         sourceType: 1
      };

      Camera.getPicture(options).then(function(imageData) {
         $scope.picture = imageData;
         $rootScope.pic1=imageData;
         
      }, function(err) {
         console.log(err);
      });
		
   };
$scope.uploadPicture=function(v1,v2,v3)
{
  //alert($scope.picture);
var sflag=0;
  $ionicLoading.show({template: 'uploading photo... <ion-spinner icon="android" class="custom-icon"></ion-spinner>'});
		var fileURL = $scope.picture;
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";
		options.chunkedMode = false;
options.headers = {
    Connection: "close"
};
		var params = {};
		params.value1 = v1;
        params.value2 = v2;
        params.value3=v3;

		options.params = params;

		var ft = new FileTransfer();
		ft.upload(fileURL, encodeURI("http://csmonitoring-dev.azurewebsites.net/coyote/upload2.php"),onSuccess,function(error) { alert(JSON.stringify(error));$ionicLoading.show({template: 'Errore di connessione...'});
		$ionicLoading.hide();}, options);
     function onSuccess(r) {

        // sflag=1;
         alert("upload successful");
       $ionicLoading.hide();
$location.path('/secondpage');
      //alert(r.responseCode);
      //alert("Response = " + r.response);
       //alert("Sent = " + r.bytesSent);
       	
   }
   
}


})
.controller('secondpage', function($scope,Camera,$rootScope) {
  
$scope.getPicture = function (options) {
	
      var options = {
         quality : 75,
         targetWidth: 200,
         targetHeight: 200,
         sourceType: 0
      };

      Camera.getPicture(options).then(function(imageData) {
         $scope.picture = imageData;
          $rootScope.pic1=imageData;
      }, function(err) {
         console.log(err);
      });
   };  

   $scope.upload=function()
   {
    var targetPath = cordova.file.externalRootDirectory;
   var uri = encodeURI("http://posttestserver.com/post.php");
   var options = new FileUploadOptions();
	
   options.fileKey = "file";
   options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
   options.mimeType = "text/plain";

   var headers = {'headerParam':'headerValue'};
   options.headers = headers;

   var ft = new FileTransfer();

   ft.upload(fileURL, uri, onSuccess, onError, options);

   function onSuccess(r) {
      console.log("Code = " + r.responseCode);
      alert(r.responseCode);
      console.log("Response = " + r.response);
      alert(r.response);
      console.log("Sent = " + r.bytesSent);
   }

   function onError(error) {
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
   }
   };
})
.controller('firstpage', function($scope,$location,$timeout,$rootScope,service_call,$cordovaGeolocation) {
var lat;
var long
/*-----------------------------------------------------------------------------*/
var posOptions = {timeout: 6000, enableHighAccuracy: false};
   $cordovaGeolocation
   .getCurrentPosition(posOptions)
	
   .then(function (position) {
       lat  = position.coords.latitude
       long = position.coords.longitude
       //alert("Latitude:"+lat+"  Longitude:"+long);
     // console.log(lat + '   ' + long)
   }, function(err) {
      // alert(err);
      console.log(err)
   });

   var watchOptions = {timeout : 3000, enableHighAccuracy: false};
   var watch = $cordovaGeolocation.watchPosition(watchOptions);
	
   watch.then(
      null,
		
      function(err) {
        // alert(err);
         console.log(err)
      },
		
      function(position) {
          lat  = position.coords.latitude
          long = position.coords.longitude
          //alert("Latitude:"+lat+"  Longitude:"+long);
         console.log(lat + '' + long)
      }
   );

   watch.clearWatch();

    /*----------------------------------------------------------------------------------*/
$scope.post_data=function(v1,v2,v3,v4)
{
   $scope.fhide="true";
   $rootScope.inv=v1;
   //  $scope.thide="false";

   $pout = $timeout(function ()
  {
pserv();
  }, 3000); 


function pserv()
{
  service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/company_inv.php?v1="+v1+"&v2="+v2+"&v3="+v3+"&v4="+v4+"&id="+$rootScope.deviceid+"&lat="+lat+"&long="+long).then(function(response){
  
     	//$scope.load2='false';
$scope.thide="true"; 
$scope.fhide="false"; 
      var it=response.data;
     // console.log($scope.items)
     if(it!=null)
     {
       $location.path("/secondpage");
     }
    });
  
  // console.log($scope.thide) ;

}



}

/*----------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------*/



})
.controller('landing',function($scope,$location,service_call,$rootScope,$interval)
{
  // $rootScope.deviceid=device.uuid;
  //alert($rootScope.deviceid);
  //salert("https://csmonitoring-dev.azurewebsites.net/coyote/company.php?id="+$rootScope.deviceid);

service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/company.php?id="+$rootScope.deviceid).then(function(response){
  
     	//$scope.load2='false';

      $scope.items=response.data;
     // console.log($scope.items)
    });

  var ticketapi=$interval(statuscheck, 10000);
  function statuscheck()
  {
  service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/company.php?id="+$rootScope.deviceid).then(function(response){
  
     	//$scope.load2='false';

      $scope.items=response.data;
     // console.log($scope.items)
    });
    
  }
  $scope.login=function(v1,v2)
  {
    service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/company_login.php?uid="+v2+"&company="+v1).then(function(response){
  
     	//$scope.load2='false';

      var items=response.data;
     // console.log($scope.items)
     //if(items[0].count>0)
     //{
      // alert("login successful");
      if(items[0].Mflag==0)
      {
        $location.path('/map');
      }
      else if(items[0].Mflag==1)
      {
        //alert("Welcome"+items[0])
        $location.path('/graph');
      }
     
     else{
       alert("Authentication Failed");
       $location.path('/landing');
     }
    });
  }
$scope.register=function()
{
  //alert("i a here");
  $location.path('/register');
}
$scope.$on('$destroy', function () { 
  
  
  if (angular.isDefined(ticketapi)) {
    
            $interval.cancel(ticketapi);
            ticketapi = undefined;
          }

 });
  
})

.controller('register',function($scope,service_call,$ionicPlatform,$timeout,$rootScope,$location)
{

 $scope.load="true";
  $scope.flag=1;
  service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/company.php").then(function(response){
  
     	//$scope.load2='false';

      $scope.items=response.data;
      //console.log($scope.items)
      
    });

 $scope.register_fun=function(val1,val2)
{
  $scope.fhide="true";
  //$scope.flag=1;
    mytimeout = $timeout(function ()
  {

//console.log("here"+$scope.load);
serv();
  }, 5000); 
  
   //alert($scope.load);
  //alert("i am here");
  

function serv()
{
  if(!val2)
  {
alert("enter valid phone number");
  }
  else{
  
   //$timeout.cancel(mytimeout);  
 $scope.fhide="false"; 
  //$scope.flag=0;
 service_call.serv("https://csmonitoring-dev.azurewebsites.net/coyote/companyreg.php?id="+$rootScope.deviceid+"&company="+val1+"&phn="+val2).then(function(response){
  
     	//$scope.load2='false';
// $scope.load='true';
 
      $scope.res=response.data;
    
   //alert($scope.load+"service");
 
if($scope.res[0].status==1)
      {
        alert("Sorry your phone number is not found in our database....");
   $location.path('/landing');
      }
      
      
     // console.log($scope.items)
    })
    
    
    
    
   
  }

};
 
}



  
})



.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
