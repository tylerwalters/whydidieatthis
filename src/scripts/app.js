const app = new angular.module('app', ['ui.router', 'ngResource']);

app.factory('Store', ['$resource', '$rootScope', function ($resource, $rootScope) {
  let Store = {};
  let endpoints = {};

  endpoints.features = $resource(constants.apiUrl + 'posts/:ID', {ID: '@id'});
  endpoints.reviews = $resource(constants.apiUrl + 'reviews/:ID', {ID: '@id'});

  Store.posts = [];
  Store.features = [];
  Store.reviews = [];

  Store.fetchFeatures = () => {
    endpoints.features.query((res => {
      Store.features = res;
      Store.posts = Store.combinePosts();
      $rootScope.$emit('fetchFeatures', res);
    }));
  };

  Store.fetchReviews = () => {
    endpoints.reviews.query((res => {
      Store.reviews = res;
      Store.posts = Store.combinePosts();
      $rootScope.$emit('fetchReviews', res);
    }));
  };

  Store.fetchSingle = (type, name) => {
    endpoints[type].query({'filter[name]': name}, (res) => {
      Store.single = res[0];
      $rootScope.$emit('fetchSingle', res);
    });
  };

  Store.combinePosts = () => [].concat(Store.features, Store.reviews);
  Store.getPosts = () => Store.posts;
  Store.sortPosts = (posts) => posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  Store.getSingle = () => Store.single;

  // Store.fetchFeatures();
  Store.fetchReviews();

  return Store;
}]);

function ListController($scope, $element, $attrs, Store, $rootScope) {
  let ctrl = this;

  ctrl.list = Store.sortPosts(Store.getPosts());

  $rootScope.$on('fetchFeatures', (evt, arg) => {
    ctrl.list = Store.sortPosts(Store.getPosts());
  });

  $rootScope.$on('fetchReviews', (evt, arg) => {
    ctrl.list = Store.sortPosts(Store.getPosts());
  });
}

app.component('list', {
  templateUrl: constants.templateDir + 'dist/templates/components/list.html',
  controller: ListController
});

function ListPostController($sce) {
  let ctrl = this;
  let location = null;

  if (ctrl.post.acf.venue) {
    location = ctrl.post.acf.venue;
  } else if (ctrl.post.acf.name) {
    location = ctrl.post.acf.name;
  } else if (ctrl.post.acf.address) {
    location = ctrl.post.acf.address;
  }

  ctrl.mapUrl = location ? $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBgT9eRPtCKgZy93j9hdX_Fdiszu6K2Vcg&q=" + location) : null;
}

app.component('listPost', {
  templateUrl: constants.templateDir + 'dist/templates/components/listPost.html',
  controller: ListPostController,
  bindings: {
    post: '<'
  }
});

function DetailController($scope, $element, $attrs, $stateParams, $rootScope, Store) {
  let ctrl = this;

  Store.fetchSingle($stateParams.type, $stateParams.name);
  ctrl.post = Store.getSingle();

  $rootScope.$on('fetchSingle', (evt, arg) => {
    ctrl.post = Store.getSingle();
  });
}

app.component('detail', {
  templateUrl: constants.templateDir + 'dist/templates/components/detail.html',
  controller: DetailController
});

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: constants.templateDir + 'dist/templates/home.html'
    })
    .state('detail', {
      url: '/:type/:name',
      templateUrl: constants.templateDir + 'dist/templates/single.html'
    });
});

app.filter('trustAsHTML', ['$sce', $sce => text => $sce.trustAsHtml(text)]);