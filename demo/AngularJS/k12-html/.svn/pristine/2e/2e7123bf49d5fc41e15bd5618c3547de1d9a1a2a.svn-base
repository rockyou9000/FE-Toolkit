/**
 * Created by Administrator on 2016/4/11.
 */
angular.module('admin').controller('LessonDetailController', ['$rootScope','$state','$filter','$window','lessonService','coursewareService','courseService','datePickerUtils',LessonDetailController]);

function LessonDetailController($rootScope,$state,$filter,$window, lessonService,coursewareService, courseService, dateUtils) {
    var vm = this;

    vm.editable = !($state.params.status * 1);

    if (!vm.params) {
        vm.params = {};
    }



    if ($state.params.id) {
        vm.params.id = $state.params.id;
        vm.date = new Date().getTime();
        lessonDetailData(vm.params.id);
    }


    coursewareData();
    courseData();




    // 课件翻页
    vm.cwarePage = {
        defaultLength: 9,
        total: function() {
            return vm.cwareList ? vm.cwareList.length : 0
        },
        current: 1,
        nextDisabled: true,
        prevDisabled: true,
        isNext: function() {
            this.nextDisabled = this.total() < this.defaultLength * this.current;
        },
        isPrev: function() {
            this.prevDisabled = this.total() > this.defaultLength * this.current;
        },
        showNext: function() {
            this.current++;
            this.isNext();
            this.isPrev();
        },
        showPrev: function() {
            this.current--;
            this.isNext();
            this.isPrev();

        }
    };
    vm.cwareListRange = function() {
        var start = vm.cwarePage.defaultLength * (vm.cwarePage.current - 1);
        var end = start + vm.cwarePage.defaultLength;
        if (vm.cwareList) {
            return vm.cwareList.slice(start, end);
        } else {
            return [];
        }

    };

    // 课件选择
    vm.cwareSelect=function(item) {
        if (item && !vm.editable) {
            vm.params.wid = item.id;
        }
    };


    // 提交课程安排
    vm.submitLesson = function(){

        vm.params.startAt = dateUtils.getDateByTime(vm.date, vm.startAt);
        vm.params.endAt = dateUtils.getDateByTime(vm.date, vm.endAt);

        if (vm.params.id) {
            // 更新
            lessonService.update(vm.params.id, vm.params).then(function(res) {
                if (res.data.code === 0) {
                    $rootScope.alert("更新信息成功");
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        } else {
            // 新增
            lessonService.add(vm.params).then(function(res) {
                if (res.data.code === 0) {
                    $rootScope.alert("增加信息成功", function() {
                        $state.go("field.lessonList");
                    });
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        }
    };
    //编辑转查看
    vm.edit = function(){
        vm.editable = false;
    }
    // 取消
    vm.cancel = function() {
        //  $state.go("field.teacherList",{status:vm.params.status});
        $window.history.back();
    };

    // 删除
    vm.del = function() {
        lessonService.del(vm.params.id).then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("删除信息成功", function() {
                    $state.go("field.lessonList", ({page:1}));
                });

            }
        })
    };

    //获取进入新增或者编辑界面的数据
    // 课件数据
    function coursewareData(){
        var params = {
            grade: '',
            status: 1,
            size: 65535
        };
        coursewareService.getList(params).then(function(res) {
            if (res.data.code === 0) {
                vm.cwareList = res.data.data.list;
                vm.cwarePage.showPrev();
                vm.cwarePage.showNext();
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    }
    //获取课程信息
    function courseData(){
        var params = {
            grade: '',
            status: 1,
            size: 65535
        };
        courseService.getList(params).then(function(res) {
            if (res.data.code === 0) {
                vm.courseList = res.data.data;
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    }
    // 获取排课详情
    function lessonDetailData(id) {
        lessonService.get(id).then(function(res) {
            if (res.data.code === 0) {
                vm.params.cid = res.data.data.cid;
                vm.params.wid = res.data.data.wid;
                vm.startAt = new Date(parseInt(res.data.data.startAt));
                vm.endAt = new Date(parseInt(res.data.data.endAt));
                vm.date = res.data.data.startAt;
            }
        })
    }

}

