angular.module('admin').controller('LessonScheduleController', ['$rootScope','$state','lessonService',LessonScheduleController]);

function LessonScheduleController($rootScope,$state, lessonService) {
    var vm = this;

    vm.params = {
        grade: $state.params.grade
    };

    vm.search = function() {
        $state.go("field.lessonSchedule", vm.params,{reload:true});
    };

}

