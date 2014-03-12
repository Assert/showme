var app = angular.module("showMe", ["firebase"]);

function SaveController($scope, angularFire, angularFireAuth) {

    var ref = new Firebase("https://eysteinbye.firebaseio.com/showme");
    angularFireAuth.initialize(ref, { scope: $scope, name: "user" });

    angularFire(ref, $scope, "products");

    $scope.products = [];

    $scope.addMessage = function(e) {
        if (e.keyCode != 13) return;

        $scope.products.push({
            name: $scope.user.name,
            product: $scope.product,
            startTime: $scope.startTime,
            showId: $scope.showId,
            code: $scope.code,
            codeType: $scope.codeType,
            imageUrl: $scope.imageUrl,
            desc: $scope.desc
        });

        $scope.desc = "";
        $scope.product = "";
    };

    $scope.loginFacebook = function () {
        angularFireAuth.login("facebook");
    };
    $scope.loginTwitter = function () {
        angularFireAuth.login("twitter");
    };
    $scope.logout = function () {
        angularFireAuth.logout();
    };
}