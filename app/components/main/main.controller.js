angular.module('LMApp').controller('MainCtrl', mainCtrl);

function mainCtrl() {
  var vm = this;
  vm.searchTerms = [];
  vm.type = '';
}