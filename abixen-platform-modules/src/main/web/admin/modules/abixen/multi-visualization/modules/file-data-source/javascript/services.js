var fileDataSourceServices = angular.module('fileDataSourceServices', ['ngResource']);

fileDataSourceServices.factory('FileDataSource', ['$resource',
    function ($resource) {
        return $resource('/admin/modules/abixen/multi-visualization/file-data-sources/:id', {}, {
            query: {method: 'GET', isArray: false},
            update: {method: 'PUT'}
        });
    }]);



