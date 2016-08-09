import templateUrl from 'single.html';

export default function routes ($stateProvider, $urlMatcherFactoryProvider) {
  'ngInject';
  $urlMatcherFactoryProvider.strictMode(false);
  $stateProvider
    .state('single', {
      url: '/:type/:name',
      templateUrl: templateUrl,
      params: {id: null},
      controller: 'SingleController',
      controllerAs: '$ctrl',
      bindToController: true
    });
}