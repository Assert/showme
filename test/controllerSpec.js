
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
            $scope.products = [];
        },
        addItem : function(scope,item){
            $scope.products.push(item);
        }
    };

    var faMock = {
        loginFb: function(){
            $scope.user = {name:'FaceBook'};
        },
        loginTw: function(){
            $scope.user = {name:'Twitter'};
        },
        logout: function(){
            $scope.user = {name:null};
        }
    };

    it('should have no products at init', function() {
        var controller = createController(psMock,faMock);
        expect($scope.products.length).toEqual(0);
    });

    it('should be able to add products', function(){
        var controller = createController(psMock,faMock);
        $scope.loginFacebook();
        $scope.item.product = 'Product name';
        $scope.item.startTime = 'Start time';
        $scope.item.showId = 'Show ID';
        $scope.item.code = 'Code';
        $scope.item.codeType = 'Code type';
        $scope.item.imageUrl = 'Image Url';
        $scope.item.desc = 'Description';

        $scope.addProduct();
        expect($scope.products[0].addedBy).toBeTruthy()
        expect($scope.products[0].product).toEqual('Product name');
        expect($scope.products[0].startTime).toEqual('Start time');
        expect($scope.products[0].showId).toEqual('Show ID');
        expect($scope.products[0].code).toEqual('Code');
        expect($scope.products[0].codeType).toEqual('Code type');
        expect($scope.products[0].imageUrl).toEqual('Image Url');
        expect($scope.products[0].desc).toEqual('Description');
    });


    it('should be able to add many products', function(){
        var controller = createController(psMock,faMock);
        $scope.loginFacebook();

        $scope.addProduct();
        $scope.addProduct();
        $scope.addProduct();

        expect($scope.products.length).toEqual(3);

    });
    it('should be able to login via FaceBook', function(){
        var controller = createController(psMock,faMock);
        $scope.loginFacebook();
        expect($scope.user.name).toEqual('FaceBook');
    });

    it('should be able to login via Twitter', function(){
        var controller = createController(psMock,faMock);
        $scope.loginTwitter();
        expect($scope.user.name).toEqual('Twitter');
    });

    it('should be able to log out', function(){
        var controller = createController(psMock,faMock);
        $scope.logout();
        expect($scope.user.name).toEqual(null);
    });

    it('should still be zero elements when no added and we try to delete', function() {
        var controller = createController(psMock, faMock);
        $scope.removeProduct();
        expect($scope.products.length).toEqual(0);
    });

    it('should be able to delete a product', function() {
        var controller = createController(psMock, faMock);
        $scope.loginFacebook();
        $scope.addProduct();
        $scope.removeProduct();
        expect($scope.products.length).toEqual(0);
    });

    it('delete one from product', function() {
        var controller = createController(psMock, faMock);
        $scope.loginFacebook();
        $scope.addProduct();
        $scope.addProduct();
        $scope.removeProduct();
        expect($scope.products.length).toEqual(1);
    })

    it('delete specific product', function() {
        var controller = createController(psMock, faMock);
        $scope.loginFacebook();
        $scope.item.desc = 'A';
        $scope.addProduct();
        $scope.item.desc = 'B';
        $scope.addProduct();
        $scope.item.desc = 'C';
        $scope.addProduct();
        expect($scope.products[1].desc).toEqual("B");
        $scope.removeProduct(1);
        expect($scope.products[1].desc).toEqual("C");
        $scope.removeProduct(1);
        expect($scope.products[1]).toEqual(undefined);
    })

});