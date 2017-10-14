angular.module('badminton').service('$login', function ($q, $rootScope, $http) {
    this.doLogin = function (data) {


        var deferred = $q.defer();

        $http({
            url: 'https://a94g53rtf8.execute-api.ap-south-1.amazonaws.com/prod/login',
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