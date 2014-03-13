
//
//describe('myService test', function(){
//    it('returns 1', function(){
//        expect( "1").toEqual('1');
//    })
//});

describe('NavCtrl', function() {
    var $scope, $location, $rootScope, createController;

    beforeEach(inject(function($injector) {
        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        createController = function(x) {
            return $controller('SaveController', {
                '$scope': $scope,
                'productsService':x,
                'xx':null
            });
        };
    }));

    it('should have a method to check if the path is active', function() {

        var xx = {
            init: function(params,ss) {
                $scope.products = null;
            },
            addItem : function(aa,bb){
                $scope.products = bb;
            }
        };

        var controller = createController(xx);

        expect($scope.products).toBe(null);

        // Set fake login user
        $scope.user = {name:"TheFakeUser how adds stuff"};
        $scope.addProduct();

        expect($scope.products.addedBy).toBe('TheFakeUser how adds stuff');

    });
});