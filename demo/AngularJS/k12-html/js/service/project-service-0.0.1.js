'use strict';
angular.module('admin')

    .factory('pathProject', function (commonUtil) {
        return {
            teacher: function (id) {
                if (!id) {
                    return "ajax/u/teacher";
                } else {
                    return "ajax/u/teacher/" + id;
                }
            },
            teacher_list: "ajax/u/teacher/search",
            //teacher_list: "js/json/plan.json",
            teacher_status: function (id, status) {
                // status: 0|1 解雇/雇佣
                return "ajax/u/teacher/" + id + "/status/" + status;
            },
            teacher_pwd: function(id) {
                return "ajax/u/teacher/" + id + "/change/pwd";
            },
            teacher_account: function(account) {
                return "ajax/u/teacher/account/check?account="+ account;
            },
            book: function (id) {
                if (!id) {
                    return "ajax/u/book";
                } else {
                    return "ajax/u/book/" + id;
                }
            },
            book_list: "ajax/u/book/search",
            unit: function (id) {
                if (!id) {
                    return "ajax/u/unit";
                } else {
                    return "ajax/u/unit/" + id;
                }
            },
            unit_list: "ajax/u/unit/search",
            /* unit_list: function(id) {
             return "ajax/u/book/" + id + "/unit";
             },*/
            unit_list_sort: function (id) {
                return "ajax/u/book/" + id + "/unit/sort";
            },
            // ---课件---
            cware: function (id) {
                if (!id) {
                    return "ajax/u/courseware";
                } else {
                    return "ajax/u/courseware/" + id;
                }
            },
            cware_list: "ajax/u/cware/search",
            cware_list_sort: function (id) {
                return "ajax/u/unit/" + id + "/cware/sort";
            },
            // ---题型---
            test: function (id) {
                if (!id) {
                    return "ajax/u/quiz";
                } else {
                    return "ajax/u/quiz/" + id;
                }
            },
            test_list: "ajax/u/quiz/search",
            test_list_sort: function (id) {
                return "ajax/u/cwire/" + id + "/quiz/sort";
            },
            // 跟读
            repeat: function (id) {
                if (!id) {
                    return "ajax/u/repeat";
                } else {
                    return "ajax/u/repeat/" + id;
                }
            },
            // 文本图片
            choice: function (id) {
                if (!id) {
                    return "ajax/u/choice";
                } else {
                    return "ajax/u/choice/" + id;
                }
            },
            // 问答
            oquestion: function (id) {
                if (!id) {
                    return "ajax/u/oquestion";
                } else {
                    return "ajax/u/oquestion/" + id;
                }
            },
            // 题型
            quiz: function (id) {
                if (!id) {
                    return "ajax/u/quiz";
                } else {
                    return "ajax/u/quiz/" + id;
                }
            },
            // 题型列表
            quiz_list: function (id) {
                return "ajax/u/cwire/" + id + "/quiz";
            },
            // ---课程---
            course: function (id) {
                if (!id) {
                    return "ajax/u/course";
                } else {
                    return "ajax/u/course/" + id;
                }
            },
            course_list: "ajax/u/course/search",
            // ---排课---
            lesson: function (id) {
                if (!id) {
                    return "ajax/u/lesson";
                } else {
                    return "ajax/u/lesson/" + id;
                }
            },
            lesson_list: "ajax/u/lesson/search",
            // ---上传图片---
            upload_url: "ajax/a/img/xx",

            //操作记录
            record_list: "ajax/a/u/records/search",
            record: function (id) {
                if (!id) {
                    return "ajax/a/u/records";
                } else {
                    return "ajax/a/u/records/" + id;
                }
            }


        }
    })
    //教师
    .factory('teacherService', function ($http, pathProject, recordCookies) {
        return {
            add: function (params) {
                return $http.post(pathProject.teacher(), params);
            },
            update: function (id, params) {
                recordCookies({targetID: id});
                return $http.put(pathProject.teacher(id), params);
            },
            getList: function (params) {
                return $http.get(pathProject.teacher_list, {params: params});
            },
            get: function (id) {
                return $http.get(pathProject.teacher(id));
            },
            fire: function (id, status) {
                recordCookies({targetID: id});
                return $http.put(pathProject.teacher_status(id, status));
            },
            del: function (id) {
                recordCookies({targetID: id});
                return $http.delete(pathProject.teacher(id));
            },
            pwd: function(id, params) {
                recordCookies({targetID: id});
                return $http.post(pathProject.teacher_pwd(id), params);
            },
            account: function(account) {
                return $http.get(pathProject.teacher_account(account));
            }
        }
    })
    //教材
    .factory('bookService', function ($http, pathProject,recordCookies) {
        return {
            add: function (params) {
                return $http.post(pathProject.book(), params);
            },
            update: function (id, params) {
                recordCookies({targetID: id});
                return $http.put(pathProject.book(id), params);
            },
            getList: function (params) {
                return $http.get(pathProject.book_list, {params: params});
            },
            get: function (id) {
                return $http.get(pathProject.book(id));
            },
            //fire: function(id, status) {
            //    return $http.put(pathProject.book_status(id, status));
            //},
            del: function (id) {
                recordCookies({targetID: id});
                return $http.delete(pathProject.book(id));
            }
        }
    })
    //排课
    .factory('unitService', function ($http, pathProject,recordCookies) {
        return {
            add: function (params) {
                return $http.post(pathProject.unit(), params);
            },
            update: function (id, params) {
                recordCookies({targetID: id});
                return $http.put(pathProject.unit(id), params);
            },
            getList: function (params) {
                console.log(pathProject.unit_list);
                return $http.get(pathProject.unit_list, {params: params});
            },
            get: function (id) {
                recordCookies({targetID: id});
                return $http.get(pathProject.unit(id));
            },
            del: function (id) {
                recordCookies({targetID: id});
                return $http.delete(pathProject.unit(id));
            },
            sort: function(id, params) {
                recordCookies({targetID: id});
                return $http({
                    url: pathProject.unit_list_sort(id),
                    method: "POST",
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: params,
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });
            }
        }
    })
    .factory('lessonService', function ($http, pathProject,recordCookies) {
        return {
            get: function (id) {
                return $http.get(pathProject.lesson(id));
            },
            add: function (params) {
                return $http.post(pathProject.lesson(), params);
            },
            update: function (id, params) {
                recordCookies({targetID: id});
                return $http.put(pathProject.lesson(id), params);
            },
            del: function (id) {
                recordCookies({targetID: id});
                return $http.delete(pathProject.lesson(id));
            },
            getList: function (params) {
                return $http.get(pathProject.lesson_list, {params: params});
            }
        }
    })


    .factory('uploadService', function (pathProject,recordCookies) {
        return {
            uploadFile: function (FileUploader, alias) {
                var param = {url: pathProject.upload_url};
                if (alias) {
                    angular.extend(param, {alias: alias});
                }
                return new FileUploader(param);
            }
        }
    })

    //课程列表
    .factory('courseService', function ($http, pathProject,recordCookies) {
        return {

            get: function (id) {
                return $http.get(pathProject.course(id));
            },
            add: function (params) {
                return $http.post(pathProject.course(), params);
            },
            update: function (id, params) {
                recordCookies({targetID: id});
                return $http.put(pathProject.course(id), params);
            },
            del: function (id) {
                recordCookies({targetID: id});
                return $http.delete(pathProject.course(id));
            },
            getList: function (params) {
                return $http.get(pathProject.course_list, {params: params});
            }

        }
    })

    //测验题型列表
    .factory('testService', function ($http, pathProject,recordCookies) {
        return {

            get: function (id) {
                return $http.get(pathProject.test(id));
            },
            add: function (params) {
                return $http({
                    url: pathProject.test(),
                    method: "POST",
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: JSON.stringify(params),
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });
            },
            update: function (id, params) {
                recordCookies({targetID: id});
                return $http({
                    url: pathProject.test(id),
                    method: "PUT",
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: JSON.stringify(params),
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });
            },
            del: function (id) {
                recordCookies({targetID: id});
                return $http.delete(pathProject.test(id));
            },
            getList: function (params) {
                return $http.get(pathProject.test_list, {params: params});
            },
            sort: function(id, params) {
                recordCookies({targetID: id});
                return $http({
                    url: pathProject.test_list_sort(id),
                    method: "POST",
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: params,
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });
            }
        }
    })

    //课件管理
    .factory('coursewareService', function ($http, pathProject,recordCookies) {
        return {

            get: function (id) {
                return $http.get(pathProject.cware(id));
            },
            add: function (params) {
                return $http.post(pathProject.cware(), params);
            },
            update: function (id, params) {
                recordCookies({targetID: id});
                return $http.put(pathProject.cware(id), params);
            },
            del: function (id) {
                recordCookies({targetID: id});
                return $http.delete(pathProject.cware(id));
            },
            getList: function (params) {
                return $http.get(pathProject.cware_list, {params: params});
            },
            sort: function(id, params) {
                recordCookies({targetID: id});
                return $http({
                    url: pathProject.cware_list_sort(id),
                    method: "POST",
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    data: params,
                    transformRequest: function(data, headersGetter) {
                        return data;
                    }
                });
            }
        }
    })
    //操作记录
    .factory('recordService', function ($http, pathProject) {
        return {

            get: function (id) {
                return $http.get(pathProject.record(id));
            },
            del: function (id) {
                return $http.delete(pathProject.record(id));
            },
            getList: function (params) {
                return $http.get(pathProject.record_list, {params: params});
            }

        }
    });





