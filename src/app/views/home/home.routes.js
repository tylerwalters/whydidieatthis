import templateUrl from 'home.html';

export default function routes ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: templateUrl,
      controller: 'HomeController',
      controllerAs: '$ctrl',
      bindToController: true
    });
}