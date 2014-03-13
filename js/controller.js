var app = angular.module("showMe", ["firebase"]);

app.FIREBASE = 'https://eysteinbye.firebaseio.com/showme';

app.factory('firebaseAuth', function($rootScope) {
    var _ref = new Firebase(app.FIREBASE);

    var auth = {};
    auth.broadcastAuthEvent = function() {
        $rootScope.$broadcast('authEvent');
    };
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
    auth.loginTw = function() {
        this.client.login('twitter');
    };
    auth.loginFb = function() {
        this.client.login('facebook');
    };
    auth.logout = function() {
        this.client.logout();
    };

    return auth;
});

app.factory('productsService', function myService(angularFire,firebaseAuth) {
    return {
        init: function(scope, xxx) {

            scope.products = [];

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
            angularFire(_ref, scope, xxx);
        },
        addItem: function(scope,item){
            scope.products.push(item);
        }
    };
});

var SaveController = function($scope, productsService,firebaseAuth) {
    productsService.init($scope, 'products');

    $scope.addProduct = function() {
        productsService.addItem($scope,{
            addedBy: $scope.user.name,
            product: $scope.product,
            startTime: $scope.startTime,
            showId: $scope.showId,
            code: $scope.code,
            codeType: $scope.codeType,
            imageUrl: $scope.imageUrl,
            desc: $scope.desc
        });
    };

    $scope.loginFacebook = function () {
        firebaseAuth.loginFb();
    };
    $scope.loginTwitter = function () {
        firebaseAuth.loginTw();
    };
    $scope.logout = function () {
        firebaseAuth.logout()
    };

}
