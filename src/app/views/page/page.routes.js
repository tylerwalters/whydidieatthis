import pageTemplate from 'page.html';
import rankingsTemplate from 'rankings.html';

export default function routes ($stateProvider, $urlMatcherFactoryProvider) {
  'ngInject';
  $urlMatcherFactoryProvider.strictMode(false);
  $stateProvider
    .state('about', {
      url: '/about',
      templateUrl: pageTemplate,
      params: {id: 39, name: 'about'},
      resolve: {
        page: ($stateParams, pageService) => pageService.query({'filter[name]': $stateParams.name}).$promise,
        title: page => page[0].title.rendered
      },
      controller: 'PageController',
      controllerAs: '$ctrl',
      bindToController: true
    })
    .state('rankings', {
      url: '/rankings',
      templateUrl: rankingsTemplate,
      params: {id: 346, name: 'rankings'},
      resolve: {
        page: $stateParams => [],
        title: () => 'Rankings'
      },
      controller: 'PageController',
      controllerAs: '$ctrl',
      bindToController: true
    })
    .state('page', {
      url: '/page/:page',
      templateUrl: pageTemplate,
      params: {id: null},
      resolve: {
        page: ($stateParams, pageService) => pageService.query({'filter[name]': $stateParams.name}).$promise,
        title: page => page[0].title.rendered
      },
      controller: 'PageController',
      controllerAs: '$ctrl',
      bindToController: true
    });
}