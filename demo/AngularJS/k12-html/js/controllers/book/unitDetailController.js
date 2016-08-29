/**
 * Created by Administrator on 2016/4/5.
 */
'use strict';

angular.module('admin').controller('unitDetailController', ['$rootScope','$state','$window','unitService','bookService','FileUploader','uploadService', unitDetailController]);

function unitDetailController($rootScope, $state,$window, unitService, bookService,FileUploader,uploadService) {
    var vm = this;
    if(!vm.params){
        vm.params={};
    }
    // 获取教材ID
    var id = $state.params.id;
    vm.id = id;
    vm.bid = $state.params.bid;
    var statusa=$state.params.statusa;
    var status= $state.params.status;
    // 有ID为编辑页，无ID为新建页
    // vm.status = 1|2   编辑|新增
    //vm.statusa = 1|0   查看|编辑



    if (vm.id) {
        unitService.get(vm.id).then(function(res) {
            if (res.data.code === 0) {
                vm.params = {
                    grade: res.data.data.book.grade,
                    bid: res.data.data.book.id,
                    bname: res.data.data.book.name,
                    img: res.data.data.unit.img,
                    uid: res.data.data.unit.id,
                    uname: res.data.data.unit.name
                };
            } else {
                $rootScope.alert(res.data.message);
                $state.go("field.unitList")
            }
        });
    } else if (vm.bid) {
        bookService.get(vm.bid).then(function(res) {
            if (res.data.code === 0) {
                vm.params = {
                    grade: res.data.data.grade,
                    bid: res.data.data.id,
                    bname: res.data.data.name,
                    img: '',
                    uname: ''
                };
            } else {
                $rootScope.alert(res.data.message);
                $state.go("field.unitList")
            }
        });
    }


    if (id && statusa == 1) {
        vm.status = 1;
        vm.noedit=true;
    } else if(id && statusa == 0){
        vm.status = 2;
        vm.noedit=false;
    } else {
        vm.status = 3;
        vm.noedit=false;
    }

    console.log(vm.status);
    //查看跳编辑
    vm.edit=function(){
        vm.status = 2;
        vm.noedit=false;
    };

    // 新增
    vm.add = function() {
        vm.params.unitName = vm.params.name;
        var params = {
            bid: vm.params.bid,
            unitName: vm.params.uname,
            img: vm.params.img,
            status:1
        };
        unitService.add(params).then(function(res) {
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
            bid: vm.params.bid,
            unitName: vm.params.uname,
            img: vm.params.img,
            status:1
        };
        unitService.update(id, params).then(function(res) {
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
        //$state.go("field.unitList", {bid: vm.bid});
        $window.history.back();
    };

    // 删除信息，暂时测试使用
    vm.del = function() {
        alert(0);
        unitService.del(id).then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("已成功删除", $state.go("field.unitList"));
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    };
    FileUploader.FileSelect.prototype.isEmptyAfterSelection = function(){
        return true;
    };
    vm.uploader = uploadService.uploadFile(FileUploader);
    vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
        if (status == 200) {
            console.log(response.data.url);
            vm.params.img = response.data.url;
        }
    };

}