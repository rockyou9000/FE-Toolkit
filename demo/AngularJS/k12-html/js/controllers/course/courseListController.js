'use strict';

angular.module('admin').controller('courseListController', ['$rootScope','$scope','$state','courseService','lessonService', courseListController]);

function courseListController($rootScope,$scope, $state, courseService,lessonService) {
    var vm = this;
    vm.params = {
        grade: $state.params.grade,
        bname: $state.params.bname,
        name: $state.params.name,
        tname: $state.params.tname,
        status: $state.params.status,
        bookID:$state.params.bookID,
        teacherID:$state.params.teacherID,
        tid:$state.params.tid,
        intro:$state.params.intro,
        page: $state.params.page,
        size:$state.params.size
    };


    vm.params.status=1;
    courseService.getList(vm.params).then(function(res) {
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
        vm.params.status=1;
        $state.go("field.courseList", vm.params,{reload:true});
    };

    vm.del = function(id, index,name,grade) {
        var courseParams={
            cid: id,
            //cname:name,
            grade: grade,
            status: 1
        };
        lessonService.getList(courseParams).then(function(res){
            if(res.data.data.length === 0){
                $rootScope.confirm("您确定要删除这条记录？", function() {
                    courseService.del(id).then(function(res) {
                        if (res.data.code === 0) {
                            vm.list.splice(index, 1);
                        } else{
                            $rootScope.alert("删除失败");
                        }
                    });
                })
            }else{
                $rootScope.confirm("该课程下有排课，请先删除排课",function(){
                    $state.go("field.lessonSchedule",{grade:grade,status:1})
                })
            }
        });

    }


}