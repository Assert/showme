var app = angular.module("showMe", ["firebase"]);

app.FIREBASE = 'https://eysteinbye.firebaseio.com/showme';

app.factory('firebaseAuth', function($rootScope) {
    var auth = {
        broadcastAuthEvent : function() {
            $rootScope.$broadcast('authEvent');
        },
        loginTw : function() {
            this.client.login('twitter');
        },
        loginFb : function() {
            this.client.login('facebook');
        },
        logout : function() {
            this.client.logout();
        }
    };

    var _ref = new Firebase(app.FIREBASE);
    auth.client = new FirebaseAuthClient(_ref, function(error, user) {
        if (error) {
            // todo: add login page
        } else if (user) {
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
    return {
        init: function(scope, arrName) {

            scope.safeApply = function(fn) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if(fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };

            scope.$on('authEvent', function() {
                scope.safeApply(function() {
                    scope.user = firebaseAuth.user;
                });
            });

            var _ref = new Firebase(app.FIREBASE);
            angularFire(_ref, scope, arrName);
        }
    };
});

//app.controller('SaveController', function($scope, productsService, firebaseAuth) {
var SaveController = function($scope, firebaseService, firebaseAuth) {
//app.controller('SaveController', ['$scope','productsService','firebaseAuth', function($scope, productsService, firebaseAuth) {
    $scope.products = [];
    $scope.item = {};

    firebaseService.init($scope, 'products');

    $scope.addProduct = function() {
        $scope.products.push({
            addedBy: $scope.user.name,
            product: $scope.item.product,
            startTime: $scope.item.startTime,
            showId: $scope.item.showId,
            code: $scope.item.code,
            codeType: $scope.item.codeType,
            imageUrl: $scope.item.imageUrl,
            desc: $scope.item.desc
        });
    };

    $scope.removeProduct = function (index) {
        $scope.products.splice(index, 1);
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
//}]);

