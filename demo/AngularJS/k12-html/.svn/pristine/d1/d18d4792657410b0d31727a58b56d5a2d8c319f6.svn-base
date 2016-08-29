'use strict';

angular.module('admin').controller('courseDetailController', ['$rootScope','$state','$window','$cookies','courseService','FileUploader','uploadService','bookService','teacherService', courseDetailController]);

function courseDetailController($rootScope, $state,$window,$cookies, courseService,FileUploader,uploadService,bookService,teacherService) {
    var vm = this;
    if(!vm.params){
        vm.params={};
    }
    // 获取课程ID
    var id = $state.params.id;
    var statusa=$state.params.statusa;
    var status=$state.params.status;
    console.log(id);
    console.log(statusa);
    // 有ID为编辑页，无ID为新建页
    // vm.status = 1|2|3   查看|编辑|新增

   /* var moduleId = JSON.parse($cookies.records).moduleID;
    var modulePermission = $rootScope.permissionSet[moduleId];
    //console.log(modulePermission.in_array("create"));

    vm.created = modulePermission.in_array("create");
    vm.updated = modulePermission.in_array("update");
    vm.deleted = modulePermission.in_array("delete");
    vm.sorted = modulePermission.in_array("sort");
*/
    if (id && statusa == 1) {
        courseService.get(id).then(function(res) {
            if (res.data.code === 0) {
                vm.params = res.data.data;
                vm.selectGrade(vm.params.grade);
            } else {
                $rootScope.alert(res.data.message);
            }
        });
        vm.status = 1;
        $rootScope.noedit=true;
    }
    else if(id && statusa == 0){
        courseService.get(id).then(function(res) {
            if (res.data.code === 0) {
                vm.params = res.data.data;
                vm.selectGrade(vm.params.grade);
            } else {
                $rootScope.alert(res.data.message);
            }
        });
        vm.status = 2;
        $rootScope.noedit=false;
    }
    else {
        $rootScope.noedit=false;
        vm.status = 3;
    }
    vm.edit=function(){
        vm.status = 2;
        $rootScope.noedit=false;
    };
    //联动查询数据
    //vm.selectGrade(vm.params.grade);
    vm.selectGrade = function(grade){
        // alert(grade);
        //$scope.selectAction=vm.params.grade;
        var gradeparams = {
            grade: grade,
            status: 1,
            name: ''
        };
        bookService.getList(gradeparams).then(function(res) {
            if (res.data.code === 0) {
                vm.bookparams = res.data.data;
                vm.params.bookid = vm.bookparams[0].id;
                //vm.params.bookName = vm.bookparams[0].name;
                //alert(vm.params.bookid);
                //console.log(vm.bookparams);
               // vm.bookparams.grade = grade;
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    };

    //获取教师列表信息
    var teacherparams = {
        name: '',
        sex: '',
        grade: '',
        status: 1,
        size: 65535
    };
    teacherService.getList(teacherparams).then(function(res) {
        if (res.data.code === 0) {
            vm.teacherparams = res.data.data;
        } else {
            $rootScope.alert(res.data.message);
        }
    });

    // 新增
    vm.add = function() {
        vm.params.status=1;
        courseService.add(vm.params).then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("新增成功");
                $state.go("field.courseList",{status:1},{reload:true});
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    };
    // 更新
    vm.update = function() {
        angular.extend(vm.params, {id: id});
        delete vm.params.createTime;
        delete vm.params.updateTime;
        vm.params.status=1;
        courseService.update(id, vm.params).then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("更新信息成功");
                $state.go("field.courseList",{status:1},{reload:true});
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    };
    // 取消
    vm.cancel = function() {
        $window.history.back();
    };

    // 删除信息，暂时测试使用
    vm.del = function() {
        courseService.del(id, "0").then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("已成功解雇", $state.go("field.courseList"));
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
            vm.params.image = response.data.url;
        }
    };

}
