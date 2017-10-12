angular.module('badminton').service('$game', function ($q, $rootScope,$http) {
    this.getAuctionFeed = function () {


      var deferred = $q.defer();
        $http.get('https://a94g53rtf8.execute-api.ap-south-1.amazonaws.com/prod/auctionFeed')
        .then(function(response){
           deferred.resolve(response.data);
        })
        .catch(function(response){
          deferred.reject(response);
        });
        return deferred.promise;
    }


});