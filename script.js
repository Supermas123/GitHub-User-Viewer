// Code goes here
(function(){
  
  var app = angular.module("githubViewer", []);
  
var MainController = function($scope, $http, $interval){
  
  var onUserComplete = function(response){
    $scope.user = response.data;
    $http.get($scope.user.repos_url).then(onRepos, onError);
  };
  
  var onRepos = function(response){
    
    $scope.repos = response.data;
  }
  
  
  var onError = function(reason){
    
    $scope.error = "Could not fetch user";
  };
  
  var timer = function(){
    $scope.countdown -= 1;
    if($scope.countdown < 1){
      $scope.search($scope.username);
    }
  }
  
  var interval = function(){
    $interval(timer, 1000, $scope.countdown)
  }
  $scope.search = function(username){
  $http.get("https://api.github.com/users/" + username).then(onUserComplete, onError)
  }
  
  $scope.username ="angular"
  $scope.message = "GitHub Viewer!";
  $scope.countdown = "10";
  interval();

  
};

app.controller("MainController", MainController);


}());