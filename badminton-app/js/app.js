var badmintonApp = angular.module('badminton', ['ui.router', 'angularBootstrapMaterial', 'ui.bootstrap','angularSpinner','ngStorage']);

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
        .state('teamsPage', {
            url: '/teams-page',
            templateUrl: 'views/teams-page.html',
            controller: 'teamsPageController'

        })
        .state('fixturesPage', {
            url: '/fixtures-page',
            templateUrl: 'views/fixtures-page.html',
            controller: 'fixturesPageController'

        })
        .state('matchPage', {
            url: '/match-page',
            templateUrl: 'views/match-page.html',
            controller: 'matchPageController'

        })
        .state('landingPage',{
            url: '/landing-page',
            templateUrl: 'views/landing-page1.html',
            controller: 'homePageController'
        })
        
        
    $urlRouterProvider.otherwise('/landing-page');
})




