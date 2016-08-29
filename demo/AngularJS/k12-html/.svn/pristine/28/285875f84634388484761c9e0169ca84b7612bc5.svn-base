'use strict';

angular.module('admin').controller('unitListController', ['$rootScope','$state','unitService','coursewareService', unitListController]);

function unitListController($rootScope, $state, unitService,coursewareService) {
    var vm = this;
    vm.hasParent = !!$state.params.bid;
    vm.params = {
        name: $state.params.name,
        grade: $state.params.grade,
        bname: $state.params.bname,
        bid:$state.params.bid,
        page: $state.params.page,
        status: $state.params.status || 1,
        size: vm.hasParent ? 65535 : 10
    };
    vm.params.bookname=$state.params.bname;


    console.log($rootScope.permissionSet[113]);
    var a=$rootScope.permissionSet[113];
    console.log(a);
    if(a==undefined){
        vm.nextLevelBtn=true;
        console.log(vm.nextLevelBtn);
    }else{
        vm.nextLevelBtn=false;
    }

    unitService.getList(vm.params).then(function(res) {
        if (res.data.code === 0) {
            vm.list = res.data.data.list;
            vm.page = {
                next: res.data.next || 0,
                size: res.data.size || 0,
                page: res.data.page || 0,
                total: res.data.total || 0
            };

            rejectDataSearch(res.data.data);
        } else {
            $rootScope.alert(res.data.message);
        }
    });

    // 从book的单元管理进来时，填入数据
    function rejectDataSearch(data) {
        if (vm.hasParent) {
            vm.params.grade = data.textBook.grade;
            vm.params.bname = data.textBook.name;
        }
    }

    vm.search = function() {
        vm.params.status=1;
        $state.go("field.unitList", vm.params,{reload:true});
    };
    vm.research = function() {
        vm.params = {
            name: "",
            grade: "",
            bname: "",
            bid: "",
            size: 10
        };
        vm.hasParent = false;
    };

    vm.del = function(id, index) {
        var unitParams={
            uid:id,
            status:1
        };
        coursewareService.getList(unitParams).then(function(res){
            if(res.data.code === 0) {
                if (res.data.data.list.length === 0) {
                    $rootScope.confirm("您确定要删除这条记录?", function () {
                        unitService.del(id).then(function (res) {
                            if (res.data.code === 0) {
                                vm.list.splice(index, 1);
                            }else{
                                $rootScope.alert(res.data.message);
                            }
                        })
                    })
                } else{
                    $rootScope.confirm("该单元已有关联课件，请先删除该课件", function () {
                        $state.go("field.coursewareList", {uid: id}, {reload: true});
                    });
                }
            }
        });
    };

    vm.sort = function() {
        var sortArray = [];
        angular.forEach(vm.list, function(item, i) {
            sortArray.push(item.id);
        });
        var params = '['+sortArray.toString()+']';
        unitService.sort(vm.params.bid, params).then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("重新排序成功");
            } else {
                $rootScope.alert("排序出错了：" + res.data.message);
            }

        })
    }



}