var platformAdminApplication = angular.module('platformAdminApplication',
    [
        'platformNavigationModule',
        'platformPermissionModule',
        'platformRoleModule',
        'platformPageModule',
        'platformUserModule',
        'platformLayoutModule',
        'platformModuleModule',
        'multiVisualizationModule',
        'platformCommonModule',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ui.router',
        'platformAdminControllers',
        'ngAnimate',
        'ngTouch',
        'ngRoute',
        'toaster',
        'ui.grid',
        'ui.grid.exporter',
        'ui.grid.selection',
        'ui.grid.pinning',
        'ui.grid.resizeColumns',
        'ui.grid.moveColumns',
        'ui.grid.autoResize',
        'ui.bootstrap.showErrors'
    ]
);

platformAdminApplication.factory('platformHttpInterceptor', ['$q', '$injector', function ($q, $injector) {
    var applicationLoginUrl = 'http://localhost:8080/login';
    var applicationModulesUrlPrefix = '/application/modules';

    return {
        responseError: function (rejection) {
            console.log('rejection: ', rejection);

            //TODO

            if (rejection.data && rejection.data.path && rejection.data.path.indexOf(applicationModulesUrlPrefix) == 0 && rejection.status != 401 && rejection.status != 403 && rejection.status != 500) {
                return $q.reject(rejection);
            }

            if (rejection.status == 401) {
                window.location = applicationLoginUrl;
            } else if (rejection.status == 403) {
                var toaster = $injector.get('toaster');
                toaster.pop(platformParameters.statusAlertTypes.ERROR, rejection.data.error, rejection.data.message);
            } else if (rejection.status == 500) {
                var toaster = $injector.get('toaster');
                toaster.pop(platformParameters.statusAlertTypes.ERROR, rejection.data.error, rejection.data.message);
            }
            return $q.reject(rejection);
        }
    };
}]);

platformAdminApplication.config(['$stateProvider', '$translateProvider', '$urlRouterProvider', 'showErrorsConfigProvider', '$httpProvider', 'applicationNavigationItemsProvider',
    function ($stateProvider, $translateProvider, $urlRouterProvider, showErrorsConfigProvider, $httpProvider, applicationNavigationItemsProvider) {

        $httpProvider.interceptors.push('platformHttpInterceptor');

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        showErrorsConfigProvider.showSuccess(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('application', {
                abstract: true,
                controller: 'ApplicationController',
                templateUrl: '/admin/html/application.html'
            })
            .state('application.dashboard', {
                url: '/',
                templateUrl: '/admin/html/dashboard.html'
            })
            .state('application.search', {
                url: '/search?query',
                controller: 'SearchController',
                templateUrl: '/admin/html/search.html'
            });


        applicationNavigationItemsProvider
            .addSidebarItem({
                title: 'Dashboard',
                state: 'application.dashboard',
                orderIndex: 0,
                id: 0,
                iconClass: 'fa fa-th'
            })
            .addSidebarItem({
                title: 'Users',
                state: 'application.users.list',
                orderIndex: 1,
                id: 1,
                iconClass: 'fa fa-user'
            })
            .addSidebarItem({
                title: 'Roles',
                state: 'application.roles.list',
                orderIndex: 2,
                id: 2,
                iconClass: 'fa fa-user-secret'
            })
            .addSidebarItem({
                title: 'Permissions',
                state: 'application.permissions.list',
                orderIndex: 3,
                id: 3,
                iconClass: 'fa fa-lock'
            })
            .addSidebarItem({
                title: 'Pages',
                state: 'application.pages.list',
                orderIndex: 4,
                id: 4,
                iconClass: 'fa fa-file-text-o'
            })
            .addSidebarItem({
                title: 'Modules',
                state: 'application.modules.list',
                orderIndex: 5,
                id: 5,
                iconClass: 'fa fa-list-alt'
            })
            .addSidebarItem({
                title: 'Layouts',
                state: 'application.layouts.list',
                orderIndex: 6,
                id: 6,
                iconClass: 'fa fa-columns'
            })
            .addSidebarItem({
                title: 'Data Sources',
                state: 'application.multiVisualization.modules.databaseDataSource.list',
                orderIndex: 7,
                id: 7,
                iconClass: 'fa fa-database'
            });
    }
]);

platformAdminApplication.directive('dynamicName', function($compile, $parse) {
    return {
        restrict: 'A',
        terminal: true,
        priority: 100000,
        link: function(scope, elem) {
            var name = elem.attr('dynamic-name');
            elem.removeAttr('dynamic-name');
            elem.attr('name', name);
            $compile(elem)(scope);
        }
    };
});
