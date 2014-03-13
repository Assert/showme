/// <reference path="../lib/angular/angular-mocks.js" />

describe("angular controller", function(){

    var ctrl, scope;

    beforeEach(inject(function ($controller) {
        //get controller from $controller provider
        scope = {};
        ctrl = $controller('SaveController', {
            $scope: scope
        });
    }));

    it('should add name parameter to scope', function () {
        expect(scope.name).toBeDefined();
    });
});
