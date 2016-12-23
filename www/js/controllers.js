/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})


.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('TokboxCtrl',['$scope', '$stateParams', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', '$cordovaToast','OTSession', 'apiKey', 'sessionId', 'token', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $cordovaToast, OTSession, apiKey, sessionId, token) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

 
     OTSession.init(apiKey, sessionId, token);
                $scope.streams = OTSession.streams;

    // Set Ink
    ionicMaterialInk.displayEffect();

    function tost(msg) {
        $cordovaToast
            .show(msg, 'short', 'center')
            .then(function(success) {
                // success
            }, function(error) {
                // error
            });
    }
     
}]).value({
                apiKey: '45739362',
                sessionId: '2_MX40NTczOTM2Mn5-MTQ4MjQzMjgxMTQ0Nn5nWkt0amZKYTN4d2dPYlFBTUtLdkY0cmR-UH4',
                token: 'T1==cGFydG5lcl9pZD00NTczOTM2MiZzaWc9MTVkYzZmZDQ0ZjMwY2NhY2FlZGI3YTYyNGQxN2QxOWEwZTk3OGQwYTpzZXNzaW9uX2lkPTJfTVg0ME5UY3pPVE0yTW41LU1UUTRNalF6TWpneE1UUTBObjVuV2t0MGFtWktZVE40ZDJkUFlsRkJUVXRMZGtZMGNtUi1VSDQmY3JlYXRlX3RpbWU9MTQ4MjQzMjgxMSZub25jZT0wLjgxMjAzNzQ5NDk2NDg5NzYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTQ4MjUxOTIxMSZjb25uZWN0aW9uX2RhdGE9dXNlcm5hbWUlM0Rib2I='
            });

;
