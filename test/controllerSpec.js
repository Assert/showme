
//
//describe('myService test', function(){
//    it('returns 1', function(){
//        expect( "1").toEqual('1');
//    })
//});

describe('NavCtrl', function() {
    var $scope, $rootScope, createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        createController = function(ps,fa) {
            return $controller('SaveController', {
                '$scope': $scope,
                'productsService':ps,
                'firebaseAuth':fa
            });
        };
    }));

    it('should have a method to check if the path is active', function() {

        var psMock = {
            init: function(scope,name) {
                $scope.products = null;
            },
            addItem : function(scope,item){
                $scope.products = item;
            }
        };

        var faMock = {
            loginFb: function(){
                $scope.ee=null;
            },
            loginTw: function(){
                $scope.ee=null;
            },
            logout: function(){
                $scope.ee=null;
            }
        };

        var controller = createController(psMock,faMock);

        expect($scope.products).toBe(null);

        // Set fake login user
        $scope.user = {name:"TheFakeUser how adds stuff"};
        $scope.addProduct();

        expect($scope.products.addedBy).toBe('TheFakeUser how adds stuff');

    });
});