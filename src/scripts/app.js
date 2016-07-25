const app = new angular.module('app', ['ui.router', 'ngResource']);

app.factory('Store', ['$resource', '$rootScope', function ($resource, $rootScope) {
  var Store = {};
  var endpoints = {};

  endpoints.features = $resource(constants.apiUrl + 'posts/:ID', {ID: '@id'});
  endpoints.reviews = $resource(constants.apiUrl + 'reviews/:ID', {ID: '@id'});

  Store.features = [];
  Store.reviews = [];

  Store.fetchFeatures = function () {
    endpoints.reviews.query((function (res) {
      Store.reviews = res;
      $rootScope.$emit('fetchFeatures', res);
    }));
  };

  Store.fetchReviews = function () {
    endpoints.reviews.query((function (res) {
      Store.reviews = res;
      $rootScope.$emit('fetchReviews', res);
    }));
  };

  Store.getPosts = function () {
    return [].concat(Store.features, Store.reviews);
  };

  Store.fetchFeatures();
  Store.fetchReviews();

  return Store;
}]);

function ListController($scope, $element, $attrs, Store, $rootScope) {
  var ctrl = this;

  ctrl.list = Store.getPosts();

  $rootScope.$on('fetchReviews', function (evt, arg) {
    ctrl.list = Store.getPosts();
  });
}

app.component('list', {
  templateUrl: constants.templateDir + 'dist/templates/components/list.html',
  controller: ListController
});

function ListPostController() {
  var ctrl = this;
}

app.component('listPost', {
  templateUrl: constants.templateDir + 'dist/templates/components/listPost.html',
  controller: ListPostController,
  bindings: {
    post: '<'
  }
});

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: constants.templateDir + 'dist/templates/home.html'
    })
    .state('detail', {
      url: '/posts/:id',
      templateUrl: constants.templateDir + 'dist/templates/detail.html'
    });
});

app.filter('trustAsHTML', ['$sce', function ($sce) {
  return function (text) {
    return $sce.trustAsHtml(text);
  };
}]);