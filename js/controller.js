var app = angular.module("showMe", ["firebase"]);

function SaveController($scope, angularFire, angularFireAuth) {

    var ref = new Firebase("https://eysteinbye.firebaseio.com/showme");
    angularFireAuth.initialize(ref, { scope: $scope, name: "user" });

    angularFire(ref, $scope, "messages");

    $scope.messages = [];

    $scope.addMessage = function(e) {
        if (e.keyCode != 13) return;

        $scope.messages.push({
            name: $scope.user.name,
            product: $scope.product,
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