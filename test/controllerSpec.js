
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
        },
        getItem : function(scope,nr){
            return nr;
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
        expect($scope.products.length).toBe(0);
    });

    it('should be able to add products', function(){
        var controller = createController(psMock,faMock);
        $scope.user = {name:'Fake user how adds stuff'};
        $scope.item.product = 'Product name';
        $scope.item.startTime = 'Start time';
        $scope.item.showId = 'Show ID';
        $scope.item.code = 'Code';
        $scope.item.codeType = 'Code type';
        $scope.item.imageUrl = 'Image Url';
        $scope.item.desc = 'Description';

        $scope.addProduct();
        expect($scope.products[0].addedBy).toBe('Fake user how adds stuff');
        expect($scope.products[0].product).toBe('Product name');
        expect($scope.products[0].startTime).toBe('Start time');
        expect($scope.products[0].showId).toBe('Show ID');
        expect($scope.products[0].code).toBe('Code');
        expect($scope.products[0].codeType).toBe('Code type');
        expect($scope.products[0].imageUrl).toBe('Image Url');
        expect($scope.products[0].desc).toBe('Description');
    });


    it('should be able to add many products', function(){
        var controller = createController(psMock,faMock);
        $scope.user = {name:'New Fake user how adds stuff'};

        $scope.addProduct();
        $scope.addProduct();
        $scope.addProduct();

        expect($scope.products.length).toBe(3);

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

    it('should be able to log out', function(){
        var controller = createController(psMock,faMock);
        $scope.logout();
        expect($scope.loginStatus).toBe('Logout');
    });


});