'use strict';
angular.module('admin')
.filter('sexFilter', function() {
        return function(id) {
            if (id === 1) {
                return "男";
            } else if (id === 2) {
                return "女";
            }
            return "";
        }
    })
    .filter('statusFilter', function() {
        return function(status) {
            if (status == 0) {
                return "召回";
            } else if (status == 1) {
                return "辞退";
            }
            return "";
        }
    })
    .filter('gradeFilter', function() {
        return function(grade) {
            if (grade == 3) {
                return "三年级";
            } else if (grade == 4) {
                return "四年级";
            } else if (grade == 5) {
                return "五年级";
            } else if (grade == 6) {
                return "六年级";
            } else if (grade == 2) {
                return "二年级";
            } else if (grade == 1) {
                return "一年级";
            }
            return "";
        }
    })
    .filter('imgFilter', function() {
        return function(img) {
            var host = 'http://rc.fastschool.cn';
            var url = '';
            if (!img) {
                return url;
            } else if (img.indexOf('/') == 0) {
                url = host + img;
            } else {
                url = host + '/' + img;
            }
            return url;
        }
    })
    .filter('gradeFilter', function() {
        return function(grade) {
            if (grade == -1) {
                return "暂无年级";
            } else {
                return grade;
            }
            return "";
        }
    })
;