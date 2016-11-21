angular.module('LMApp').controller('MainCtrl', mainCtrl);

function mainCtrl() {
  var vm = this;
  vm.searchTerms = [];
  vm.type = '';
  vm.movies = ['http://data.linkedmdb.org/page/film/2014', 'http://data.linkedmdb.org/page/film/13482'];
}