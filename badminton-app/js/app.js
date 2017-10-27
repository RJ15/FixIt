var badmintonApp = angular.module('badminton', ['ui.router', 'angularBootstrapMaterial', 'ui.bootstrap','angularSpinner']);

badmintonApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('loginPage',{
                url: '/login-page',
                templateUrl: 'views/login.html',
                controller: 'loginController'
            })

        .state('auctionPage', {
            url: '/auction-page',
            templateUrl: 'views/auction-page.html',
            controller: 'auctionPageController'

        })
        .state('homePage', {
            url: '/home-page',
            templateUrl: 'views/home-page.html',
            controller: 'homePageController'

        })
        .state('playersPage', {
            url: '/players-page',
            templateUrl: 'views/players-profile-page.html',
            controller: 'playersPageController'

        })
        .state('fixturesPage', {
            url: '/fixtures-page',
            templateUrl: 'views/fixtures-page.html',
            controller: 'fixturesPageController'

        })
        
    $urlRouterProvider.otherwise('/login-page');
})




