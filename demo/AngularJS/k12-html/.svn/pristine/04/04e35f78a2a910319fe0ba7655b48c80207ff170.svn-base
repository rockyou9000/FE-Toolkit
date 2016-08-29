/**
 * Created by Administrator on 2016/4/6.
 */
'use strict';

angular.module('admin').controller('coursewareDetailsController', ['$rootScope','$state','$window','coursewareService','bookService','unitService', coursewareDetailsController]);

function coursewareDetailsController($rootScope, $state, $window,coursewareService,bookService, unitService) {
    var vm = this;
    // 获取课件ID
    var id = $state.params.id;
    vm.id = id;
    vm.uid = $state.params.uid;
    var statusa=$state.params.statusa;
    var status=$state.params.status;
    // 有ID为编辑页，无ID为新建页
    // vm.status = 1|2   编辑|新增
    // vm.statusa= 1|0   查看|编辑



    if (vm.id) {
        coursewareService.get(vm.id).then(function(res) {
            if (res.data.code === 0) {
                vm.params = {
                    grade: res.data.data.book.grade,
                    bid: res.data.data.book.id,
                    bname: res.data.data.book.name,
                    uid: res.data.data.unit.id,
                    uname: res.data.data.unit.name,
                    wname: res.data.data.ware.title
                };
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    } else if (vm.uid) {
        unitService.get(vm.uid).then(function(res) {
            if (res.data.code === 0) {
                vm.params = {
                    grade: res.data.data.book.grade,
                    bid: res.data.data.book.id,
                    bname: res.data.data.book.name,
                    uid: res.data.data.unit.id,
                    uname: res.data.data.unit.name
                };
                console.log(vm.params);
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    }

    if (id && statusa ==1) {
        vm.status = 1;
        vm.noedit=true;
    }
    else if(id && statusa==0){
        vm.status = 2;
        vm.noedit=false;
    }
    else {
        vm.status = 3;
    }
    vm.edit=function(){
        vm.status = 2;
        vm.noedit=false;
    };


    // 新增
    vm.add = function() {
        var params = {
            title: vm.params.wname,
            uid: vm.params.uid,
            status: 1,
            bid: vm.params.bid
        };
        coursewareService.add(params).then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("增加信息成功", function() {
                    $window.history.back();
                });
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    };
    // 更新
    vm.update = function() {
        var params = {
            id: vm.id,
            title: vm.params.wname,
            uid: vm.params.uid,
            status: 1,
            bid: vm.params.bid
        };
        coursewareService.update(vm.id, params).then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("更新信息成功", function() {
                    $window.history.back();
                });
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    };
    // 取消
    vm.cancel = function() {
        //$state.go("field.coursewareList", {uid: vm.params.uid,status:1});
        $window.history.back();
    };
    // 开除
    vm.fire = function() {
        coursewareService.fire(id, "fire").then(function(res) {
            if (res.data.code === 0) {
                $state.go("field.coursewareList", $state.go("field.coursewareDetails"))
            }
        });
    };
    // 删除信息，暂时测试使用
    vm.del = function() {
        coursewareService.del(id, "fire").then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("已成功解雇", $state.go("field.coursewareList"));
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    }



}