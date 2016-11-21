angular
    .module('LMApp')
    .factory('lmdb', lmdbService);

function lmdbService($http) {
    return {
        getResource: getResource
    };

    function getResource(resourceUrl) {
        return $http.get(resourceUrl)
            .then(getResourceComplete)
            .catch(getResourceFailed);

        function getResourceComplete(response) {
            console.log(response.data);
        }

        function getResourceFailed(error) {
            console.error('XHR Failed for getResource.' + error.data);
        }
    }
}