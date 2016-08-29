'use strict';

angular.module('admin').controller('lessonListController', ['$rootScope','$state','lessonService', lessonListController]);

function lessonListController($rootScope, $state, lessonService) {
    var vm = this;
    vm.params = {
        startAt: $state.params.startAt,
        endAt: $state.params.endAt,
        grade: $state.params.grade,
        cname: $state.params.cname,
        tname: $state.params.tname,
        bname: $state.params.bname,
        uname: $state.params.uname,
        cwname : $state.params.cwname,
        page: $state.params.page
    };
    vm.params.status = 1;
    lessonService.getList(vm.params).then(function(res) {
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


    vm.search = function() {
        vm.params.startAt = vm.params.startAt ? new Date(vm.params.startAt).getTime() : '';
        vm.params.endAt = vm.params.endAt ? new Date(vm.params.endAt).getTime() : '';
        $state.go("field.lessonList", vm.params,{reload:true});
    };
    vm.checkDetail = function(id){
        $state.go("field.teacherDetail",{id:id});
    };
    vm.del = function(id, index) {
        $rootScope.confirm("您确定要删除这条记录？", function() {
            lessonService.del(id).then(function(res) {
                if (res.data.code === 0) {
                    vm.list.splice(index, 1);
                }
            });
        })
    }

}