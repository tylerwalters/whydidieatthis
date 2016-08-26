import templateUrl from 'single.html';

export default function routes ($stateProvider, $urlMatcherFactoryProvider) {
  'ngInject';
  $urlMatcherFactoryProvider.strictMode(false);
  $stateProvider
    .state('single', {
      url: '/:type/:name',
      templateUrl: templateUrl,
      params: {id: null},
      resolve: {
        post: ($stateParams, postService) => postService.query({'filter[name]': $stateParams.name}).$promise
      },
      controller: 'SingleController',
      controllerAs: '$ctrl',
      bindToController: true
    });
}