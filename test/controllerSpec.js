
describe('SaveController', function() {
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
            $scope.loginStatus = 'FaceBook';
        },
        loginTw: function(){
            $scope.loginStatus = 'Twitter';
        },
        logout: function(){
            $scope.loginStatus = 'Logout';
        }
    };

    it('should have no products at init', function() {
        var controller = createController(psMock,faMock);
        expect($scope.products).toBe(null);
    });

    it('should be able to add products', function(){
        var controller = createController(psMock,faMock);
        $scope.user = {name:"Fake user how adds stuff"};
        $scope.addProduct();
        expect($scope.products.addedBy).toBe('Fake user how adds stuff');
    });

    it('should be able to login via FaceBook', function(){
        var controller = createController(psMock,faMock);
        $scope.loginFacebook();
        expect($scope.loginStatus).toBe('FaceBook');
    });

    it('should be able to login via Twitter', function(){
        var controller = createController(psMock,faMock);
        $scope.loginTwitter();
        expect($scope.loginStatus).toBe('Twitter');
    });

    it('should be able to login via FaceBook', function(){
        var controller = createController(psMock,faMock);
        $scope.logout();
        expect($scope.loginStatus).toBe('Logout');
    });

});