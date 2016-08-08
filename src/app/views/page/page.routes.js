import templateUrl from 'page.html';

export default function routes ($stateProvider, $urlMatcherFactoryProvider) {
  'ngInject';
  $urlMatcherFactoryProvider.strictMode(false);
  $stateProvider
    .state('about', {
      url: '/page/about',
      templateUrl: templateUrl,
      params: {id: 39, name: 'about'},
      controller: 'PageController',
      controllerAs: '$ctrl',
      bindToController: true
    })
    .state('rankings', {
      url: '/page/rankings',
      templateUrl: templateUrl,
      params: {id: 346, name: 'rankings'},
      controller: 'PageController',
      controllerAs: '$ctrl',
      bindToController: true
    })
    .state('page', {
      url: '/page/:page',
      templateUrl: templateUrl,
      params: {id: null},
      controller: 'PageController',
      controllerAs: '$ctrl',
      bindToController: true
    });
}