
'use strict';

angular.module('admin').controller('testDetailController', ['$rootScope', '$state', 'testService', 'bookService', 'unitService', 'coursewareService', 'FileUploader', 'uploadService', testDetailController]);

function testDetailController($rootScope, $state, testService, bookService, unitService, coursewareService, FileUploader, uploadService) {
    var vm = this;

    vm.editable = !($state.params.status * 1);
    vm.status = $state.params.status;
    vm.edit=function(){
        vm.status=1;
        vm.editable = !(vm.status*1)
    };
    // 测试类型
    var routeStatus = $state.current.name;
    switch (routeStatus) {
        case "field.testDetail.word":
            vm.type = "0";
            break;
        case "field.testDetail.phrase":
            vm.type = "1";
            break;
        case "field.testDetail.sentence":
            vm.type = "2";
            break;
        case "field.testDetail.dialogue":
            vm.type = "3";
            break;
        case "field.testDetail.text":
            vm.type = "4";
            break;
        case "field.testDetail.picture":
            vm.type = "5";
            break;
        case "field.testDetail.answers":
            vm.type = "6";
            break;
        default:
            alert("不是已知的任何类型测验：" + n);

    }


    // 更改测试类型
    vm.change = function () {
        switch (vm.type) {
            case "0":
                $state.go("field.testDetail.word");
                break;
            case "1":
                $state.go("field.testDetail.phrase");
                break;
            case "2":
                $state.go("field.testDetail.sentence");
                break;
            case "3":
                $state.go("field.testDetail.dialogue");
                break;
            case "4":
                $state.go("field.testDetail.text");
                break;
            case "5":
                $state.go("field.testDetail.picture");
                break;
            case "6":
                $state.go("field.testDetail.answers");
                break;
            default:
                alert("不是已知的任何类型测验：" + n);
        }
    };

    // 上传组件
    FileUploader.FileSelect.prototype.isEmptyAfterSelection = function () {
        return true;
    };
    vm.uploader = uploadService.uploadFile(FileUploader);
    vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
        if (status == 200) {
            console.log(response.data.url);
            vm.params.img = response.data.url;
        }
    };

    // 获取ID
    vm.id = $state.params.id;

    vm.params = {};
    // 基本信息
    if (vm.id) {
        testService.get(vm.id).then(function (res) {
            if (res.data.code === 0) {
                switch (res.data.data.quiz.type) {
                    case 1:
                        vm.params = res.data.data.repeat;
                        break;
                    case 2:
                        vm.params = res.data.data.choice;
                        break;
                    case 3:
                        vm.params = res.data.data.openq;
                        break;
                    default:
                        console.log('type:' + res.data.data.quiz);
                }
                vm.params.duration = res.data.data.quiz.duration;
                vm.params.status = res.data.data.quiz.status || 1;
                console.log(vm.params.status);
                vm.params.grade = res.data.data.book.grade;
                vm.params.bid = res.data.data.book.id;
                vm.params.bname = res.data.data.book.name;
                vm.bookList = [{id: vm.params.bid, name: vm.params.bname}];
                vm.params.uid = res.data.data.unit.id;
                vm.params.uname = res.data.data.unit.name;
                vm.unitList = [{id: vm.params.uid, name: vm.params.uname}];
                vm.params.wid = res.data.data.ware.id;
                vm.params.wname = res.data.data.ware.name;
                vm.coursewareList = [{id: vm.params.wid, title: vm.params.wname}];


                vm.params.english0 = vm.params.content ? vm.params.content.split('||')[0] : '';
                vm.params.english1 = vm.params.content ? vm.params.content.split('||')[1] : '';
                vm.params.translation0 = vm.params.translation ? vm.params.translation.split('||')[0] : '';
                vm.params.translation1 = vm.params.translation ? vm.params.translation.split('||')[1] : '';
                vm.params.option0 = vm.params.option ? vm.params.option.split('||')[0] : '';
                vm.params.option1 = vm.params.option ? vm.params.option.split('||')[1] : '';
                vm.params.option2 = vm.params.option ? vm.params.option.split('||')[2] : '';
                vm.params.option3 = vm.params.option ? vm.params.option.split('||')[3] : '';
                vm.params.duration0 = vm.params.duration ? vm.params.duration.split('||')[0] : '';
                vm.params.duration1 = vm.params.duration ? vm.params.duration.split('||')[1] : '';


            } else {
                $rootScope.alert(res.data.message);
            }
        });
    } else {
        vm.params = {
            duration: 10,
            status: 1
        };
    }


    // 新增
    vm.add = function () {
        vm.child={
            content:vm.params.content,
            phonetic:vm.params.phonetic,
            translation:vm.params.translation,
            img:vm.params.img,
            question:vm.params.question,
            answer:vm.params.answer,
            //id:vm.params.id,

        };
        vm.quiz={
            duration:vm.params.duration,
            status:vm.params.status,
            bid:vm.params.bid * 1,
            uid:vm.params.uid * 1,
            wid:vm.params.wid * 1

        };
        if (vm.id) {
            vm.quiz.id = vm.id * 1;
            vm.quiz.targetID = vm.params.targetID * 1;
        }


        if (vm.type == '0') {
            vm.child.type=1;
            vm.quiz.type=1;
            vm.date={
                repert:vm.child,
                quiz:vm.quiz
            }

        } else if (vm.type == '1') {
            vm.child.type=2;
            vm.quiz.type=1;
            vm.date={
                repert:vm.child,
                quiz:vm.quiz
            }



        } else if (vm.type == '2') {
            vm.child.type=3;
            vm.quiz.type=1;
            vm.date={
                repert:vm.child,
                quiz:vm.quiz
            }
        } else if (vm.type == '3') {
            vm.params.english = vm.params.english0 + "||" + vm.params.english1;
            vm.params.translation = vm.params.translation0 + "||" + vm.params.translation1;
            vm.params.duration = vm.params.duration0 + "||" + vm.params.duration1;
            vm.child.type=4;
            vm.quiz.type=1;
            vm.child.english=vm.params.english;
            vm.child.translation=vm.params.translation;
            vm.quiz.duration=vm.params.duration;
            vm.date={
                repert:vm.child,
                quiz:vm.quiz
            }
        } else if (vm.type == '4') {
            vm.params.option = vm.params.option0 + "||" + vm.params.option1 + "||" + vm.params.option2 + "||" + vm.params.option3;
            vm.child.option=vm.params.option;
            vm.child.type=1;
            vm.quiz.type=2;
            vm.child.option=vm.params.option;
            vm.date={
                choice:vm.child,
                quiz:vm.quiz
            }

        } else if (vm.type == '5') {
            vm.child.type=2;
            vm.quiz.type=2;
            vm.date={
                choice:vm.child,
                quiz:vm.quiz
            }

        } else if (vm.type == '6') {
            vm.child.type=1;
            vm.quiz.type=3;
            vm.date={
                openq:vm.child,
                quiz:vm.quiz
            }


        } else {
            alert("错误")
        }


        //判断新增和保存
        if( vm.id ){

            //vm.date.id = vm.id;
            delete vm.params.createTime;
            delete vm.params.updateTime;

            testService.update(vm.id, vm.date).then(function (res) {
                if (res.data.code === 0) {
                    $rootScope.alert("更新信息成功", $state.go("field.testList"));
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        } else {
            testService.add(vm.date).then(function (res) {
                if (res.data.code === 0) {
                    $rootScope.alert("增加信息成功", $state.go("field.testList"));
                } else {
                    $rootScope.alert(res.data.message);
                }
            });
        }

    };

    // 更新
    //vm.update = function () {
    //    vm.params.id = vm.id;
    //    delete vm.params.createTime;
    //    delete vm.params.updateTime;
    //
    //    testService.update(vm.id, vm.params).then(function (res) {
    //        if (res.data.code === 0) {
    //            $rootScope.alert("更新信息成功");
    //        } else {
    //            $rootScope.alert(res.data.message);
    //        }
    //    });
    //};
    // 取消
    vm.cancel = function () {
        $state.go("field.testList");
    };

    // 删除
    vm.del = function () {
        testService.del(vm.id).then(function (res) {
            if (res.data.code === 0) {
                $rootScope.alert("已成功删除", $state.go("field.testList"));
            } else {
                $rootScope.alert(res.data.message);
            }
        });
    };

    vm.selectGrade = function () {
        var params = {
            grade: vm.params.grade,
            status: 1,
            size: 99
        };
        bookService.getList(params).then(function (res) {
            if (res.data.code === 0) {
                vm.bookList = res.data.data;
            } else {
                $rootScope.alert("获取教材列表失败：" + res.data.message);
            }
        });
    };
    vm.selectBook = function () {
        var params = {
            grade: vm.params.grade,
            bid: vm.params.bid,
            status: 1,
            size: 99
        };
        unitService.getList(params).then(function (res) {
            if (res.data.code === 0) {
                vm.unitList = res.data.data.list;
            } else {
                $rootScope.alert("获取单元列表失败：" + res.data.message);
            }
        });
    };
    vm.selectCourse = function () {
        var params = {
            grade: vm.params.grade,
            bid: vm.params.bid,
            uid: vm.params.uid,
            status: 1,
            size: 99
        };
        coursewareService.getList(params).then(function (res) {
            if (res.data.code === 0) {
                vm.coursewareList = res.data.data.list;
            } else {
                $rootScope.alert("获取课件列表失败：" + res.data.message);
            }
        });
    };


}