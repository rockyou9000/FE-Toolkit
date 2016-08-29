'use strict';
angular.module('admin')
    .controller('ModuleCtrl', function($state,$scope, $rootScope,$cookies,commonUtil,moduleService,roleService) {
        var vm = $scope.vm = {};




        moduleService.getModuleList().then(function(res) {
            if (res.data.code == 0) {
                vm.page = {
                    next: res.data.data.next || 0,
                    size: res.data.data.size || 0,
                    page: res.data.data.page || 0,
                    total: res.data.data.total || 0
                };
                moduleService.batchGetModule(res.data.data.ids).then(function(res){
                    $scope.vm.list = res.data.data.moduleList;
                })


            }else{

                commonUtil.showErrMsg(res);
            }
        });




        vm.delete = function(id) {

            $rootScope.confirm("您确定要删除吗？", function() {
                moduleService.deleteModule(id).then(function(res) {

                    commonUtil.showReturnMsg(res,"field.module");




                });
            });

        };
    });