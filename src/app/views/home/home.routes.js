import templateUrl from 'home.html';

export default function routes ($stateProvider) {
  'ngInject';

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: templateUrl,
      resolve: {
        categories: ($stateParams, categoryService) => categoryService.query().$promise,
        posts: ($stateParams, postService) => postService.query().$promise
      },
      controller: 'HomeController',
      controllerAs: '$ctrl',
      bindToController: true
    });
}