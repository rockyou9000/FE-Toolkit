/**
 * Created by Administrator on 2016/4/5.
 */
'use strict';
angular.module('admin').controller('coursewareListController', ['$rootScope','$state','coursewareService','testService', coursewareListController]);

function coursewareListController($rootScope, $state, coursewareService,testService) {
    var vm = this;
    vm.hasParent = !!$state.params.uid;
    vm.params = {
        grade: $state.params.grade,
        bname:$state.params.bname,
        uname:$state.params.uname,
        //name:$state.params.name,
        title:$state.params.title,
        bid:$state.params.bid,
        uid:$state.params.uid,
        status: $state.params.status || 1,
        page: $state.params.page,
        size:  vm.hasParent ? 65535 : 10
    };


    console.log($rootScope.permissionSet[123]);
    var a=$rootScope.permissionSet[123];
    console.log(a);
    if(a==undefined){
        vm.nextLevelBtn=true;
        console.log(vm.nextLevelBtn);
    }else{
        vm.nextLevelBtn=false;
    }

    coursewareService.getList(vm.params).then(function(res) {
        if (res.data.code === 0) {
            vm.list = res.data.data.list;
            vm.page = {
                next: res.data.next || 0,
                size: res.data.size || 0,
                page: res.data.page || 0,
                total: res.data.total || 0
            };

            vm.params.grade = res.data.data.textBook.grade || $state.params.grade;
            vm.params.bname = res.data.data.textBook.name || $state.params.bname;
            vm.params.uname = res.data.data.bookUnit.name || $state.params.uname;
            rejectDataSearch(res.data.data);
        } else {
            $rootScope.alert(res.data.message);
        }
    });
    function rejectDataSearch(data) {
        if (vm.hasParent) {
            vm.params.grade = data.textBook.grade;
            vm.params.bname = data.textBook.name ;
            vm.params.uname = data.bookUnit.name ;
        }
    }

    vm.research = function() {
        vm.params = {
            grade: "",
            bname: "",
            uname: "",
            title:"",
            bid: "",
            uid: "",
            status: $state.params.status,
            size: 10
        };
        vm.hasParent = false;
    };
    vm.search = function() {
        vm.params.status=1;
        $state.go("field.coursewareList", vm.params,{reload:true});
    };

    vm.del = function(id, index) {
        var coursewareParams={
            wid:id,
            status:1
        };
        testService.getList(coursewareParams).then(function(res){
            if(res.data.code === 0) {
                if (res.data.data.list.length === 0) {
                    $rootScope.confirm("您确定要删除这条记录?", function () {
                        coursewareService.del(id).then(function (res) {
                            if (res.data.code === 0) {
                                vm.list.splice(index, 1);
                            }else{
                                $rootScope.alert(res.data.message);
                            }
                        })
                    })
                } else {
                    $rootScope.confirm("该课件已有关联测验，请先删除该测验", function () {
                        $state.go("field.testList", {wid: id}, {reload: true});
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
        coursewareService.sort(vm.params.uid, params).then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("重新排序成功");
            } else {
                $rootScope.alert("排序出错了：" + res.data.message);
            }

        })
    }

}