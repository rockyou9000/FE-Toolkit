/**
 * Created by Administrator on 2016/4/5.
 */
'use strict';

angular.module('admin').controller('BookDetailController', ['$rootScope','$state','$window','bookService', BookDetailController]);

function BookDetailController($rootScope, $state, $window,bookService) {
    var vm = this;
    // 获取教材ID
    var id = $state.params.id;
    var statusa=$state.params.statusa;
    var status= $state.params.status;
    console.log(statusa);
    console.log(id);


    // 有ID为编辑页，无ID为新建页
    // vm.status = 1|2|3   查看|编辑|新增
    if (id && statusa == 1) {
        bookService.get(id).then(function(res) {
            if (res.data.code === 0) {
                vm.params = res.data.data;
                // alert(vm.params.grade);
                //vm.selectGrade(vm.params.grade);
                console.log(vm.params);
            } else {
                $rootScope.alert(res.data.message);
                $state.go("field.bookList")
            }
        });
        vm.status = 1;
        $rootScope.noedit=true;
    }
    else if(id && statusa == 0){
        bookService.get(id).then(function(res) {
            if (res.data.code === 0) {
                vm.params = res.data.data;
                // alert(vm.params.grade);
                //vm.selectGrade(vm.params.grade);
                console.log(vm.params);
            } else {
                $rootScope.alert(res.data.message);
                $state.go("field.bookList")
            }
        });
        vm.status = 2;
        $rootScope.noedit=false;
    }
    else {
        vm.status = 3;
        $rootScope.noedit=false;
    }
    console.log(vm.status);
    //查看跳编辑
    vm.edit=function(){
        vm.status = 2;
        $rootScope.noedit=false;
    };


    // 新增
    vm.add = function() {
        vm.params.status = 1;
        bookService.add(vm.params).then(function(res) {
            if (res.data.code === 0) {
                //  $rootScope.alert("增加信息成功");
                $rootScope.alert("增加信息成功", $state.go("field.bookList",{status:1},{reload:true}));
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    };
    // 更新
    vm.update = function() {
        angular.extend(vm.params, {id: id, status: 1});
        delete vm.params.createTime;
        delete vm.params.updateTime;
        vm.params.status=1;
        bookService.update(id, vm.params).then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("更新信息成功", $state.go("field.bookList",{status:1},{reload:true}));
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    };
    // 取消
    vm.cancel = function() {
        //$state.go("field.bookList",{status:1});
        $window.history.back();
    };
}