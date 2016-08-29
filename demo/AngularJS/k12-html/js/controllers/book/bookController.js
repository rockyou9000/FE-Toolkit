angular.module('admin').controller('BookController', ['$scope', BookController]);

function BookController($scope) {
    var vm = this;



vm.list = {
    "selected": null,
    "lists": [
        {
            "label": "Item A1"
        },
        {
            "label": "Item A2"
        },
        {
            "label": "Item A3"
        }
    ]
};

}