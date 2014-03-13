//params initialised in scope for tests
var ctrl, scope;

beforeEach(inject(function($controller) {
    //get controller from $controller provider
    scope = {};
    ctrl = $controller('SaveController', {
        $scope: scope
    });
}));

it ('should add name parameter to scope', function() {
    expect(scope.name).toBeDefined();
});