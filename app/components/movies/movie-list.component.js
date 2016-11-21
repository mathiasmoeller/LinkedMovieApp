angular.module('LMApp').component('movieList', {
    templateUrl: 'components/movies/movie-list.html',
    controller: 'MovieListController',
    controllerAs: 'vm',
    bindings: {
        movies: '='
    }
});
