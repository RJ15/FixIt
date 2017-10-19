angular.module('badminton').service('$bidding', function ($q, $rootScope, $http) {

    this.bidByTeam = function (data) {
        var deferred = $q.defer();

        $http({
            url: 'https://a94g53rtf8.execute-api.ap-south-1.amazonaws.com/prod/bid-by-team-owner',
            method: "GET",
            params: data
        }).then(function (response) {
            deferred.resolve(response.data);
        })
            .catch(function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    this.wonByTeam = function (data) {
        var deferred = $q.defer();

        $http({
            url: 'https://a94g53rtf8.execute-api.ap-south-1.amazonaws.com/prod/bid-by-team-owner',
            method: "GET",
            params: data
        }).then(function (response) {
            deferred.resolve(response.data);
        })
            .catch(function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    this.insertCurrentBiddingPlayer = function (data) {
        var deferred = $q.defer();

        $http({
            url: 'https://a94g53rtf8.execute-api.ap-south-1.amazonaws.com/prod/insert-current-bidding-player',
            method: "GET",
            params: data
        }).then(function (response) {
            deferred.resolve(response.data);
        })
            .catch(function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    this.getCurrentPlayerForBidding = function (data) {
        var deferred = $q.defer();

        $http({
            url: 'https://a94g53rtf8.execute-api.ap-south-1.amazonaws.com/prod/current-player-for-bidding',
            method: "GET",
            params: data
        }).then(function (response) {
            deferred.resolve(response.data);
        })
            .catch(function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
});