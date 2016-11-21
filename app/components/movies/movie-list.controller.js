angular.module('LMApp').controller('MovieListController', MovieListController);

function MovieListController($location, lmdb) {
    var vm = this;
    vm.getImgUrl = getImgUrl;
    vm.showMovie = showMovie;
    vm.movieList = [];
    console.log(vm.movies);

    resolveMovieInformation(vm.movies);

    function resolveMovieInformation(movieList) {
        movieList.map(getMovieResource);
    }

    function getMovieResource(movieUrl) {
        lmdb.getResource(movieUrl);
    }

    function showMovie(movieId) {
        $location.url('/movie/' + movieId);
    }

    function getImgUrl(movie) {
        return 'https://i.ytimg.com/vi/Vr-JgUtBev0/maxresdefault.jpg';
    }
}