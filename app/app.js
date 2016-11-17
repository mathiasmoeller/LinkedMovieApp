'use strict';

angular.module('LMApp', [
  'ngMaterial'
]).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal');
    //.accentPalette('orange');
});