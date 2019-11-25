angular.module('starter.controllers', [])


.controller('DashCtrl', function($scope, $stateParams, $http) {
  $scope.user = $stateParams.user;
  console.log($scope.user._id);

  //init();
  //$scope.init = function() {
  $http.get('http://localhost:3333/devs', {
      headers: {
        user: $scope.user._id
     }
   })
  .success(function(data){
      console.log('devs ', data)
      $scope.devs = data;
  });
  $scope.dislike = function(dislike_user, index){
    console.log( 'dislike ', dislike_user._id, index);

    $http.post(`http://localhost:3333/dev/${dislike_user._id}/dislike`, null, {
      headers: {
        user: $scope.user._id
     }
   })
    .success(function(data){
      console.log('devs ', data);
      $scope.devs.splice(index, 1);
    });
  };

})

.controller('LoginCtrl', function($scope, $state, $location, $http){
  $scope.logging = false;
  $scope.error = '';

  $scope.clicking = function(username, pass) {
    $scope.error = '';
    $scope.logging = true;
    var params = {
      username: username, //$scope.login.gituser,
      pass: pass
    };

    $http.post('http://localhost:3333/insdev', params).
        success(function(data) {

          $scope.user = data;
            //alert(data.name);
            $state.go("tab.dash",{user: data});
        }).error(function(e){
          console.log(e);
          if(e == undefined){
            $scope.error = 'Check your internet';
          }
          $scope.logging = false;
          $scope.error = e.error;
          //alert(e.error);
        });

    //console.log('clicked ',$scope.login.code);
  };

  $scope.submit = function(username, pass) {
    console.log('submit ', username,' ', pass);
  };

  $scope.myFunc = function(e){
    $scope.error = '';
    $scope.login.gituser = '';
    };
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
