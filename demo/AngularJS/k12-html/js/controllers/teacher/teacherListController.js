'use strict';

angular.module('admin').controller('TeacherListController', ['$rootScope','$state','teacherService','courseService', TeacherListController]);

function TeacherListController($rootScope, $state, teacherService,courseService ) {
    var vm = this;
    vm.params = {
        name: $state.params.name,
        sex: $state.params.sex,
        grade: $state.params.grade,
        status: $state.params.status ,
        page: $state.params.page
    };
    //alert($rootScope.uid);
    //alert(typeof (vm.params.status));
    //alert(vm.params.status);
    if(vm.params.status == '0' ) {
        console.log(vm.params.status);
        $rootScope.title="已辞退外教";
        //vm.titledis = 2;
    }
    else if(vm.params.status == '1' ){
        console.log(vm.params.status);
        $rootScope.title="在职外教";
        //vm.titledis = 1;
    }
    else {
        $rootScope.title="全部教师";
        //vm.titledis = 3;
    }

    ////权限获取，设置
    //var moduleId = JSON.parse($cookies.records).moduleID;
    //console.log($cookies.records);
    //var modulePermission = $rootScope.permissionSet[moduleId];
    ////console.log(modulePermission.in_array("create"));
    //
    //vm.created = modulePermission.in_array("create");
    //vm.updated = modulePermission.in_array("update");
    //vm.deleted = modulePermission.in_array("delete");
    //vm.sorted = modulePermission.in_array("sort");

    //判断是否显示课程
    var coursePermission = $rootScope.permissionSet[55];
    console.log(coursePermission);
    if(coursePermission == undefined){
        vm.courseShow = false;
    }
    else {
        vm.courseShow = true;
    }

    teacherService.getList(vm.params).then(function(res) {
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

    vm.checkDetail = function(id1,checkb,status){
        $state.go("field.teacherDetail",{id:id1,choiceb:checkb,statusb:status});
    };

    vm.search = function() {
        //alert(vm.params.status);
        $state.go("field.teacherList", vm.params,{reload:true});
    };

   // vm.modal = "确认要开除该外教吗？";
    vm.fireorhire = function(id,statusmes,index,name) {
        //  alert(vm.statusmes);
        if (statusmes == 0) {
            var thisstatus = 1;
            var tips = "您确定要召回该外教吗？";
        }
        else {
            thisstatus = 0;
            tips = "您确定要辞退该外教吗？";
        }
        if (statusmes == 1) {
            var teacherparams = {
                startAt: '',
                endAt: '',
                grade: '',
                cname: '',
                tid:id,
                tname: name,
                status: 1,
                bname: '',
                uname: '',
                cwname: ''
            };

            courseService.getList(teacherparams).then(function (res) {
                if (res.data.code === 0) {
                    vm.teacherListData = res.data.data;
                    console.log(vm.teacherListData);
                    if (vm.teacherListData.length == 0) {
                        $rootScope.confirm(tips, function () {
                            teacherService.fire(id, thisstatus).then(function (res) {
                                if (res.data.code === 0) {
                                    vm.list.splice(index, 1);
                                } else {
                                    $rootScope.alert(res.data.message);
                                }
                            });
                        })
                    }
                    else {
                        $rootScope.confirm("该教师已有关联课程，请先取消该老师课程", function () {
                            $state.go("field.courseList", {tname: name,status: 1}, {reload: true});
                        });
                    }

                } else {
                    $rootScope.alert(res.data.message);
                }
            });

        }
        else if(statusmes == 0){
            $rootScope.confirm(tips, function () {
                teacherService.fire(id, thisstatus).then(function (res) {
                    if (res.data.code === 0) {
                        vm.list.splice(index, 1);
                    } else {
                        $rootScope.alert(res.data.message);
                    }
                });
            })
        }
    }
}