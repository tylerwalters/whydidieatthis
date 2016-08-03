import templateUrl from 'single.html';

export default function routes ($stateProvider, $urlMatcherFactoryProvider) {
  'ngInject';
  $urlMatcherFactoryProvider.strictMode(false);
  $stateProvider
    .state('single', {
      url: '/:name',
      templateUrl: templateUrl,
      controller: 'SingleController',
      controllerAs: '$ctrl',
      bindToController: true
    });
}