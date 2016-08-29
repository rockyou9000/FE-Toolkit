
'use strict';

angular.module('admin').factory('dealQuiz',function(){
    return {
        transformListData: function(list) {
            var that = this;
            var transformList = [];
            angular.forEach(list, function(item, i) {
                var listItem = {};
                if (item.quiz.type == 1) {
                    listItem = {
                        id: item.quiz.id,
                        type:that.sunType(item),
                        content: item.repeat.img ? that.text2Img(item.repeat.img) : "/",
                        english: that.splitContent(item.repeat.content),
                        translation: that.splitContent(item.repeat.translation),
                        duration: that.splitDuration(item.quiz.duration)
                    }
                } else if (item.quiz.type == 2) {
                    listItem = {
                        id: item.quiz.id,
                        type: that.sunType(item),
                        content: item.choice.content,
                        english: item.choice.question,
                        translation: item.choice.translation,
                        duration: item.quiz.duration
                    }
                } else if (item.quiz.type == 3) {
                    listItem = {
                        id: item.quiz.id,
                        type: that.sunType(item),
                        content: item.openq.content,
                        english: item.openq.question,
                        translation: item.openq.translation,
                        duration: item.quiz.duration
                    }
                }
                transformList.push(listItem);
            });
            return transformList;
        },
        splitContent: function(text) {
            if (text.indexOf('||') >= 0) {
                var name = ['A','B','C','D'];
                var textArray = text.split('||');
                var result = '';
                angular.forEach(textArray, function(item,i) {
                    result += name[i] + ':' + item + '<br>';
                });
            } else {
                result = text;
            }
            return result;
        },
        splitDuration: function(text) {
            if (text.indexOf('||') >= 0) {
                var name = ['A','B','C','D'];
                var textArray = text.split('||');
                var result = '';
                angular.forEach(textArray, function(item,i) {
                    result += item + '<br>';
                });
            } else {
                result = text;
            }
            return result;
        },
        text2Img: function(text) {
            var host = 'http://rc.fastschool.cn';
            var url = '';
            if (text.indexOf('/') == 0) {
                url = '<img src="' + host + text + '" />';
            } else {
                url = '<img src="' + host + '/' + text + '" />';
            }
            return url;
        },
        sunType: function(item) {
            var type = 0;
            if (item.quiz.type == 1) {
                if (item.repeat.type == 1) {
                    type = "跟读-单词";

                } else if (item.repeat.type == 2) {
                    type = "跟读-短语";
                } else if (item.repeat.type == 3) {
                    type = "跟读-句子";
                } else {
                    type = "跟读-对话";
                }
            } else if (item.quiz.type == 2) {
                if (item.choice.type == 1) {
                    type = "选择-文本";
                } else {
                    type = "选择-图片";
                }
            } else if (item.quiz.type == 3) {
                type = "开放式问答";
            }
            return type;
        }
    }
}).controller('testListController', ['$rootScope','$state','testService','dealQuiz','$cookies', testListController])

;

function testListController($rootScope, $state, testService, dealQuiz,$cookies) {
    var vm = this;
    vm.hasParent = !!$state.params.wid;
    vm.params = {
        bid: $state.params.bid,
        uid: $state.params.uid,
        wid: $state.params.wid,
        bname: $state.params.bname,
        uname: $state.params.uname,
        wname: $state.params.wname,
        grade: $state.params.grade,
        qtype: $state.params.qtype,
        status: $state.params.status || 1,
        page: $state.params.page,
        size: vm.hasParent ? 65535 : 10
    };


    testService.getList(vm.params).then(function (res) {
        if (res.data.code === 0) {
            vm.list = res.data.data.list;
            vm.transformList = dealQuiz.transformListData(vm.list);

            console.log(vm.transformList);
            vm.page = {
                next: res.data.next || 0,
                size: res.data.size || 0,
                page: res.data.page || 0,
                total: res.data.total || 0
            };

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
            vm.params.wname = data.couseWare.title;
        }
    }

    vm.research = function() {
        vm.params = {
            grade: "",
            bname: "",
            uname: "",
            wname: "",
            bid: "",
            uid: "",
            wid: "",
            qtype: $state.params.qtype,
            page: 1,
            next: true,
            size: 10
        };
        vm.hasParent = false;
    };
    vm.search = function () {
        $state.go("field.testList", vm.params,{reload:true});
    };

    vm.jump = function (type, ids, status, wid) {
        // status = 0 查看；status = 1 编辑；
        switch (type) {

            case "跟读-单词":

                $state.go("field.testDetail.word", {id: ids, status:status, wid:wid});
                break;

            case "跟读-短语":

                $state.go("field.testDetail.phrase", {id: ids, status:status, wid:wid});
                break;

            case "跟读-句子":

                $state.go("field.testDetail.sentence", {id: ids, status:status, wid:wid});
                break;

            case "跟读-对话":
                $state.go("field.testDetail.dialogue", {id: ids, status:status, wid:wid});
                break;

            case "选择-文本":
                $state.go("field.testDetail.text", {id: ids, status:status, wid:wid});
                break;

            case "选择-图片":
                $state.go("field.testDetail.picture", {id: ids, status:status, wid:wid});
                break;

            case "开放式问答":
                $state.go("field.testDetail.answers", {id: ids, status:status, wid:wid});
                break;
            default:
                alert("数据中的type不对，请检查数据源");


        }
    };


    vm.del = function (id, index) {
        $rootScope.confirm("您确定要删除这条记录？", function () {
            testService.del(id).then(function (res) {
                if (res.data.code === 0) {
                    vm.transformList.splice(index, 1);
                }
            });
        })


    };

    vm.sort = function() {
        var sortArray = [];
        angular.forEach(vm.transformList, function(item, i) {
            sortArray.push(item.id);
        });
        var params = '['+sortArray.toString()+']';
        testService.sort(vm.params.wid, params).then(function(res) {
            if (res.data.code === 0) {
                $rootScope.alert("重新排序成功");
            } else {
                $rootScope.alert("排序出错了：" + res.data.message);
            }

        });
    };
}
