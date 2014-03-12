var app = angular.module("showMe", ["firebase"]);

function SaveController($scope, angularFire, angularFireAuth) {

    var ref = new Firebase("https://eysteinbye.firebaseio.com/showme");
    angularFireAuth.initialize(ref, { scope: $scope, name: "user" });

    angularFire(ref, $scope, "products");

    $scope.products = [];

    $scope.addProduct = function() {
       // if (e.keyCode != 13) return;
alert("jkjlk");
        $scope.products.push({
            addedBy: $scope.user.name,
            product: $scope.product,
            startTime: $scope.startTime,
            showId: $scope.showId,
            code: $scope.code,
            codeType: $scope.codeType,
            imageUrl: $scope.imageUrl,
            desc: $scope.desc
        });

        $scope.product = "";
        $scope.startTime = "";
        $scope.showId = "";
        $scope.code = "";
        $scope.codeType = "";
        $scope.imageUrl = "";
        $scope.desc = "";
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