'use strict';
function projectRouteConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    var _lazyLoad = function(loaded) {
        return function($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        }
    };

    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });


    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider

        .state('field', {
            url: '',
            templateUrl: 'views/main.html',
            controller: 'MainController',
            controllerAs: 'vm',
            abstract: true, // true 表明此状态不能被显性激活，只能被子状态隐性激活
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/admin/mainController.js',
                    'js/directives/ptteng-sidebar/ptteng-sidebar-0.0.1.js',
                    'js/directives/ptteng-user/ptteng-user-0.0.1.js',
                    'js/directives/ptteng-paging/ptteng-page-0.0.1.js'
                ])
            }
        })
        .state('field.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html'
        })
        .state('field.teacher', {
            url: '/teacher',
            templateUrl: 'views/teacher.html'
        })
        //教师（三年级至六年级）列表
        .state('field.teacherList', {
            url: '/teacherList/:grade/:status/:sex/:name/:page/:mid',
            templateUrl: 'views/teacherList.html',
            controller: 'TeacherListController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/teacher/teacherListController.js'
                ])
            }
        })
        //查看，编辑，新增教师信息
        .state('field.teacherDetail', {
            url: '/teacherDetail/:id/:choiceb/:statusb/:status/:sex',
            templateUrl: 'views/teacherDetail.html',
            controller: 'TeacherDetailController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/teacher/teacherDetailController.js',
                    'angularFileUpload',
                    'js/directives/validation/validator.js'
                ])
            }
        })


        //教材管理
        .state('field.bookList', {
            url: '/bookList/:grade/:status/:name/:page/:mid',
            templateUrl: 'views/bookList.html',
            controller: 'BookListController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/book/bookListController.js',
                    'dndLists'
                ])
            }
        })
        //教材编辑等管理
        .state('field.bookDetails', {
            url: '/bookDetails/:id/:statusa/:status',
            templateUrl: 'views/bookDetails.html',
            controller: 'BookDetailController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/book/bookDetailsController.js'
                ])
            }
        })
        //单元管理
        .state('field.unitList', {
            url: '/unitList/:grade/:bname/:name/:bid/:status/:page/:mid',
            templateUrl: 'views/unitList.html',
            controller:'unitListController',
            controllerAs:'vm',
            resolve:{
                loadMyFile: _lazyLoad([
                    'js/controllers/book/unitListController.js',
                    'dndLists'
                ])
            }
        })
         //单元管理新增
        .state('field.unitDetails', {
            url: '/unitDetails/:id/:bid/:statusa/:status',
            templateUrl: 'views/unitDetails.html',
            controller: 'unitDetailController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/book/unitDetailController.js',
                    'angularFileUpload'
                ])
            }
        })
        //课件管理
        .state('field.coursewareList', {
            url: '/coursewareList/:grade/:bname/:uname/:name/:title/:bid/:uid/:status/:page/:mid',
            templateUrl: 'views/coursewareList.html',
            controller: 'coursewareListController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/book/coursewareListController.js',
                    'dndLists'
                ])
            }
        })

        //课件管理新增
        .state('field.coursewareDetails', {
            url: '/coursewareDetails/:id/:uid/:statusa/:status',
            templateUrl: 'views/coursewareDetails.html',
            controller: 'coursewareDetailsController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/book/coursewareDetailsController.js'
                ])
            }

        })
        //测验管理
        .state('field.testList', {
            url: '/testList/:bid/:uid/:wid/:grade/:bname/:uname/:wname/:qtype/:page',
            templateUrl: 'views/testList.html',
            controller: 'testListController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/test/testListController.js',
                    'dndLists'
                ])
            }
        })


        // 测验
        .state('field.testDetail', {
            url: '/testDetail',
            templateUrl: 'views/testDetail.html',
            controller: 'testDetailController',
            controllerAs: 'vm',
            //abstract: true,
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/test/testDetailController.js',
                    'angularFileUpload'
                ])
            }
        })
        // 单词
        .state('field.testDetail.word', {
            url: '/word/:id/:status/:wid',
            templateUrl: 'views/test-word.html'
        })
        //短语
        .state('field.testDetail.phrase', {
            url: '/phrase/:id/:status/:wid',
            templateUrl: 'views/test-phrase.html'
        })

        //句子
        .state('field.testDetail.sentence', {
            url: '/sentence/:id/:status/:wid',
            templateUrl: 'views/test-sentence.html'
        })

        //对话
        .state('field.testDetail.dialogue', {
            url: '/dialogue/:id/:status/:wid',
            templateUrl: 'views/test-dialogue.html'
        })
        //文本
        .state('field.testDetail.text', {
            url: '/text/:id/:status/:wid',
            templateUrl: 'views/test-text.html'
        })
        //图片
        .state('field.testDetail.picture', {
            url: '/picture/:id/:status/:wid',
            templateUrl: 'views/test-picture.html'
        })
        //开放式问答
        .state('field.testDetail.answers', {
            url: '/answers/:id/:status/:wid',
            templateUrl: 'views/test-answers.html'
        })

        //课程
        .state('field.courseList', {
            url: '/courseList/:bname/:name/:intro/:grade/:tname/:status/:page/:teacherID/:tid',
            templateUrl: 'views/courseList.html',
            controller: 'courseListController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/course/courseListController.js'
                ])
            }

        })
        //课程详情
        .state('field.courseDetail', {
            url: '/courseDetail/:id/:statusa/:status',
            templateUrl: 'views/courseDetail.html',
            controller: 'courseDetailController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/course/courseDetailController.js',
                    'angularFileUpload'
                ])
            }
        })

        // 排课
        .state('field.lessonSchedule', {
            url: '/lessonSchedule/:grade/:status',
            templateUrl: 'views/lessonSchedule.html',
            controller: 'LessonScheduleController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/lesson/lessonScheduleController.js',
                    'datepicker'
                ])
            }
        })
        .state('field.lessonList', {
            url: '/lessonList/:startAt/:endAt/:grade/:cname/:tname/:bname/:uname/:cwname/:page/:cid',
            templateUrl: 'views/lessonList.html',
            controller: 'lessonListController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/lesson/lessonListController.js'
                ])
            }
        })
        .state('field.lessonDetail', {
            url: '/lessonDetail/:id/:status',
            templateUrl: 'views/lessonDetail.html',
            controller: 'LessonDetailController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/lesson/lessonDetailController.js'
                ])
            }
        })
        // basic part
        .state('login', {
            url: '/login',
            templateUrl: 'views/admin/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/admin/loginController.js')
            }
        })
        .state('field.manager', {
            url: '/manager/:page',
            templateUrl: 'views/admin/manager.html',
            controller:'ManagerCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-managerController-0.0.1.js')
            }
        })
        .state('field.managerDetail', {
            url: '/managerDetail/:id',
            templateUrl: 'views/admin/managerDetail.html',
            controller:'ManagerDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-managerDetailController-0.0.1.js')
            }
        })
        .state('field.role', {
            url: '/role/:page',
            templateUrl: 'views/admin/role.html',
            controller:'RoleCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-roleController-0.0.1.js')
            }
        })
        .state('field.roleDetail', {
            url: '/roleDetail/:id',
            templateUrl: 'views/admin/roleDetail.html',
            controller:'RoleDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-roleDetailController-0.0.1.js')
            }
        })
        .state('field.module', {
            url: '/module/:page',
            templateUrl: 'views/admin/module.html',
            controller:'ModuleCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-moduleController-0.0.1.js')
            }
        })
        .state('field.moduleDetail', {
            url: '/moduleDetail/:id',
            templateUrl: 'views/admin/moduleDetail.html',
            controller:'ModuleDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-moduleDetailController-0.0.1.js')
            }
        })
        .state('field.pwd', {
            url: '/pwd',
            templateUrl: 'views/admin/pwd.html',
            controller:'PwdCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-pwdController-0.0.1.js')
            }
        })
        .state('field.article', {
            url: '/article/:page/:type/:status/:startAt/:endAt',
            templateUrl: 'views/admin/article.html',
            controller:'ArticleCtrl',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/admin/ptteng-articleController-0.0.1.js'])
            }
        })
        .state('field.articleDetail', {
            url: '/articleDetail/:id',
            templateUrl: 'views/admin/articleDetail.html',
            controller:'ArticleDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/admin/ptteng-articleDetailController-0.0.1.js', 'summernote', 'angularFileUpload'])
            }
        })
        //新添操作记录
        .state('field.operatingRecord', {
            url: '/operatingRecord/:operateStart/:operateEnd/:managerName/:operate/:roleID',
            templateUrl: 'views/admin/operatingRecord.html',
            controller:'operatingRecordCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/operatingRecordCtrl.js')
            }
        })
        //操作记录详情
        .state('field.recordDetail', {
            url: '/recordDetail/:id',
            templateUrl: 'views/admin/recordDetail.html',
            controller:'recordDetailCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/recordDetailCtrl.js')
            }
        })

    ;





}
