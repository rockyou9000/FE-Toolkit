/**
 * Created by Administrator on 2016/4/4.
 */
'use strict';

angular.module('admin').controller('BookListController', ['$rootScope','$state','bookService','unitService', BookListController]);

function BookListController($rootScope, $state, bookService,unitService) {
    var vm = this;
    vm.params = {
        name: $state.params.name,
        grade: $state.params.grade,
        status: $state.params.status || 1,
        page:$state.params.page || 1
    };


    bookService.getList(vm.params).then(function(res) {
        if (res.data.code === 0) {
            vm.list = res.data.data;
            vm.page = {
                next: res.data.next || 0,
                size: res.data.size || 0,
                page: res.data.page || 0,
                total: res.data.total || 0
            };
        } else {
            $rootScope.alert(res.data.message);
        }
    });

    console.log($rootScope.permissionSet[114]);
    var a=$rootScope.permissionSet[114];
    console.log(a);
    if(a==undefined){
        vm.nextLevelBtn=true;
        console.log(vm.nextLevelBtn);
    }else{
        vm.nextLevelBtn=false;
    }

    vm.search = function() {
        vm.params.status=1;
        $state.go("field.bookList", vm.params,{reload:true});
    };

    vm.del = function(id, index) {

        var bookparams = {
            name: $state.params.name,
            grade: '',
            bookname: '',
            bid:id,
            //page: $state.params.page,
            status: 1,
            size: 65535
        };
        unitService.getList(bookparams).then(function (res) {
            if (res.data.code === 0) {
                vm.unitListData = res.data.data.list;
                console.log(vm.unitListData);
                if (vm.unitListData.length == 0) {
                    $rootScope.confirm("您确定要删除这条记录？", function () {
                        bookService.del(id).then(function (res) {
                            if (res.data.code === 0) {
                                vm.list.splice(index, 1);
                            } else {
                                $rootScope.alert(res.data.message);
                            }
                        });
                    })
                }
                else {
                    $rootScope.confirm("该教师已有关联单元，请先删除相关单元", function () {
                        $state.go("field.unitList",{bid:id}, {reload: true});
                    });
                }

            } else {
                $rootScope.alert(res.data.message);
            }
        });

    }


}