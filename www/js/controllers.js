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

.controller('TokboxCtrl', ['$scope', '$stateParams', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', '$cordovaToast', 'OTSession', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $cordovaToast, OTSession) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    var session;
    var connectionCount = 0;
    var apiKey = '45739362';
    var sessionId = '1_MX40NTczOTM2Mn5-MTQ4Mjc3MzQ3NDg0Nn5yNjM5enNUMmFhbzMyYlo2L1o2WUJLdTV-UH4';
    var token = 'T1==cGFydG5lcl9pZD00NTczOTM2MiZzaWc9ZWVmNmVmOTg1MGZiZjVhZjJhYmFjMzEyY2IzMjM3YmFlNjY1ODdhNjpzZXNzaW9uX2lkPTFfTVg0ME5UY3pPVE0yTW41LU1UUTRNamMzTXpRM05EZzBObjV5TmpNNWVuTlVNbUZoYnpNeVlsbzJMMW8yV1VKTGRUVi1VSDQmY3JlYXRlX3RpbWU9MTQ4Mjc3MzQ3NSZub25jZT0wLjgyODgyOTc4Njk3MzA3NDEmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTQ4Mjg1OTg3NSZjb25uZWN0aW9uX2RhdGE9dXNlcm5hbWUlM0Rib2I=';

    //  OTSession.init(apiKey, sessionId, token);
    //             $scope.streams = OTSession.streams;
    // console.log($scope.streams);
    tost('started');
    session = OT.initSession(apiKey, sessionId);

    function connect() {
        // Replace apiKey and sessionId with your own values:
        session = OT.initSession(apiKey, sessionId);
        session.on({
            connectionCreated: function(event) {
                connectionCount++;
                console.log(connectionCount + ' connections.');
            },
            connectionDestroyed: function(event) {
                connectionCount--;
                console.log(connectionCount + ' connections.');
                tost(connectionCount + ' connections.');

            },
            sessionDisconnected: function sessionDisconnectHandler(event) {
                // The event is defined by the SessionDisconnectEvent class
                console.log('Disconnected from the session.');
                // document.getElementById('disconnectBtn').style.display = 'none';
                if (event.reason == 'networkDisconnected') {
                    alert('Your network connection terminated.')
                }
            }
        });
        // Replace token with your own value:
        session.connect(token, function(error) {
            if (error) {
                console.log('Unable to connect: ', error.message);
                tost('Unable to connect: '+error.message);
            } else {
                // document.getElementById('disconnectBtn').style.display = 'block';
                console.log('Connected to the session.');
                tost('Connected to the session.');
                connectionCount = 1;
            }
        });
    }

    $scope.disconnect = function() {
        session.disconnect();
    }

    connect();

    $scope.publish = function() {
        var session;
        var publisher;
        console.log('here');
        // Replace with the replacement element ID:
        publisher = OT.initPublisher('publisherContainer');
        publisher.on({
            streamCreated: function(event) {
                console.log("Publisher started streaming.");
            },
            streamDestroyed: function(event) {
                console.log("Publisher stopped streaming. Reason: " + event.reason);
            }
        });

        // Replace apiKey and sessionID with your own values:
        session = OT.initSession(apiKey, sessionId);
        // Replace token with your own value:  
        if (session.capabilities.publish == 1) {
            session.publish(publisher);
        } else {
            console.log("You cannot publish an audio-video stream.");
        }
    }



    $scope.Subscriber = function() {
            session = OT.initSession(apiKey, sessionId);

            session.connect(token, function(error) {

                if (error) {
                    // failed to connect
                    console.log(error);
                } else {
                    session.on('streamCreated', function(event) {
                        var subscriberProperties = {
                            insertMode: 'append'
                        };
                        console.log(event);
                        var subscriber = session.subscribe(event.stream,
                            'subscriberContainer',
                            subscriberProperties,
                            function(error) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Subscriber added.');
                                }
                            });
                    });
                }
            });
        }
        // Set Ink
    ionicMaterialInk.displayEffect();

    function tost(msg) {
        $cordovaToast
            .show(msg, 'long', 'center')
            .then(function(success) {
                // success
            }, function(error) {
                // error
            });
    }

}]);
