/*global angular, Firebase, FirebaseAuthClient*/
var app = angular.module("showMe", ["firebase"]);

app.FIREBASE = 'https://eysteinbye.firebaseio.com/showme';

app.factory('firebaseAuth', function ($rootScope) {
    'use strict';
    var auth = {
        broadcastAuthEvent : function () {
            $rootScope.$broadcast('authEvent');
        },
        loginTw : function () {
            this.client.login('twitter');
        },
        loginFb : function () {
            this.client.login('facebook');
        },
        logout : function () {
            this.client.logout();
        }
    };

    auth.client = new FirebaseAuthClient(new Firebase(app.FIREBASE), function (error, user) {
        // if (error) { todo: add login page }
        if (user) {
            auth.user = user;
            auth.broadcastAuthEvent();
        } else {
            auth.user = null;
            auth.broadcastAuthEvent();
        }
    });

    return auth;
});

app.factory('firebaseService', function myService(angularFire, firebaseAuth) {
    'use strict';
    var ref;
    return {
        init: function (scope, arrName) {

            scope.safeApply = function (fn) {
                var phase = this.$root.$$phase;
                if (phase === '$apply' || phase === '$digest') {
                    if (fn && (typeof fn === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };

            scope.$on('authEvent', function () {
                scope.safeApply(function () {
                    scope.user = firebaseAuth.user;
                });
            });

            ref = new Firebase(app.FIREBASE);
            angularFire(ref, scope, arrName);
        },
        newId : function () {
            return ref.push().name();
        }
    };
});

var SaveController = function ($scope, firebaseService, firebaseAuth) {
    'use strict';
    $scope.products = [];
    $scope.item = {};

    firebaseService.init($scope, 'products');

    $scope.saveProduct = function () {
        var item = $scope.getActiveProduct(),
            index = $scope.getIndexOfElementById(item.id);
        if (item.id === undefined) {
            $scope.addProduct();
        } else {
            $scope.editProduct();
        }
    };

    $scope.addProduct = function () {
        var item = $scope.getActiveProduct(),
            id = firebaseService.newId();
        item.id = id;
        $scope.item.id = id; // Write it back to hidden

        $scope.products.push(item);
    };

    $scope.editProduct = function () {
        var item = $scope.getActiveProduct(),
            index = $scope.getIndexOfElementById(item.id);

        $scope.products[index] = item;
    };

    $scope.getActiveProduct = function () {
        return {
            id: $scope.item.id,
            addedBy: $scope.user.name,
            product: $scope.item.product,
            startTime: $scope.item.startTime,
            showId: $scope.item.showId,
            code: $scope.item.code,
            codeType: $scope.item.codeType,
            imageUrl: $scope.item.imageUrl,
            desc: $scope.item.desc
        };
    };

    $scope.clear = function () {
        $scope.item = {};
    };

    $scope.removeProduct = function (elem) {
        if (elem !== null && elem !== undefined) {
            var index = $scope.getIndexOfElementById(elem.id);
            $scope.products.splice(index, 1);
            $scope.clear();
        }
    };
    $scope.getIndexOfElementById = function (id) {
        var i;
        for (i = 0; i < $scope.products.length; i += 1) {
            if ($scope.products[i].id === id) {
                return i;
            }
        }
        return -1;
    };
    $scope.loginFacebook = function () {
        firebaseAuth.loginFb();
    };
    $scope.loginTwitter = function () {
        firebaseAuth.loginTw();
    };
    $scope.logout = function () {
        firebaseAuth.logout();
    };

};