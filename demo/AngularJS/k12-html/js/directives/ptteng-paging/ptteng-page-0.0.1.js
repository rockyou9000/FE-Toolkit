/**
 * 简易分页js
 * 依赖包：jquery-2.0.js,bootstrap.js/bootstrap.min.js
 * 使用条件：
 *   1.页面url参数只有page，无其他参数。
 *   2.单个页面只能有一个分页控件。
 *   3.后台传回参数中有page。
 * 使用方法：引入包以后，在需要添加该控件的地方加入 <div data-role="pagination" page="${page }"></div>
 */



'use strict';

angular.module('admin')
	.directive('paging',function(){
		return {
			templateUrl:'js/directives/ptteng-paging/ptteng-page-0.0.1.html',
			restrict: 'E',
			replace: true,
			scope: {
				next:"@"
			},
			controller: function($rootScope,$scope, $state,commonUtil) {


				$scope.next = JSON.parse($scope.next);
				var page = $scope.page = {
					totalPage: Math.ceil($scope.next.total / $scope.next.size),
					page: parseInt($state.params.page) || 1
				};

				$scope.goPage = function (params) {
					$scope.next = JSON.parse($scope.next);
					var next = $scope.next.next;

					if ("next" == params) {
						if (next) {
							page.page = parseInt(page.page) + 1;
							$state.go($state.current, page);

						}
					}
					else {

						if (page.page <= 1) {
							page.page = 1;
						} else {
							page.page = parseInt(page.page) - 1;
							$state.go($state.current, page);

						}

					}

				}

			}
		}
	});

