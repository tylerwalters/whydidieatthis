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
      controller: 'PageController',
      controllerAs: '$ctrl',
      bindToController: true
    })
    .state('rankings', {
      url: '/rankings',
      templateUrl: rankingsTemplate,
      params: {id: 346, name: 'rankings'}
    })
    .state('page', {
      url: '/page/:page',
      templateUrl: pageTemplate,
      params: {id: null},
      controller: 'PageController',
      controllerAs: '$ctrl',
      bindToController: true
    });
}