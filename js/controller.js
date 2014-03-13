var app = angular.module("showMe", ["firebase"]);

app.factory('itemService', function myService(angularFire, angularFireAuth) {
    var _ref = new Firebase("https://eysteinbye.firebaseio.com/showme");

    return {
        qqqq: function(scope, xxx,yyy) {

            angularFireAuth.initialize(_ref, { scope: scope, name: yyy });

            angularFire(_ref, scope, xxx);
        },
        addItem: function(item){
            _ref.push(item);
        },
        loginFacebook: function(){
            angularFireAuth.login("facebook");
        },
        loginTwitter: function(){
            angularFireAuth.login("twitter");
        },
        logout: function(){
            angularFireAuth.logout();
        }
    };
});

function SaveController($scope, itemService) {
    itemService.qqqq($scope, 'products','user');

    $scope.products = [];

    $scope.addProduct = function() {
        itemService.addItem({
            addedBy: $scope.user.name,
            product: $scope.product,
            startTime: $scope.startTime,
            showId: $scope.showId,
            code: $scope.code,
            codeType: $scope.codeType,
            imageUrl: $scope.imageUrl,
            desc: $scope.desc
        });
        $scope.products = [];
    };




//        $scope.product = "";
//        $scope.startTime = "";
//        $scope.showId = "";
//        $scope.code = "";
//        $scope.codeType = "";
//        $scope.imageUrl = "";
//        $scope.desc = "";
//    };

    $scope.loginFacebook = function () {
        itemService.loginFacebook();
    };
    $scope.loginTwitter = function () {
        itemService.loginTwitter();
    };
    $scope.logout = function () {
        itemService.logout();
    };
}