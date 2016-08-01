const app = new angular.module('app', ['ui.router', 'ngResource']);

app.factory('Store', ['$resource', '$rootScope', function ($resource, $rootScope) {
  let Store = {};
  let endpoints = {};

  endpoints.posts = $resource(constants.apiUrl + 'posts/:ID', {ID: '@id'});

  Store.posts = [];
  Store.features = [];
  Store.reviews = [];

  Store.fetchPosts = () => {
    endpoints.posts.query((res => {
      Store.posts = res;
      $rootScope.$emit('fetchPosts', res);
    }));
  };

  Store.fetchSingle = (name) => {
    endpoints.posts.query({'filter[name]': name}, (res) => {
      Store.single = res[0];
      $rootScope.$emit('fetchSingle', res);
    });
  };

  Store.getPosts = () => Store.posts;
  Store.getSingle = () => Store.single;

  Store.fetchPosts();

  return Store;
}]);

function LogoController($scope, $element, $attrs, $rootScope) {
  let ctrl = this;

  ctrl.path = '/';
  ctrl.logo = constants.templateDir + 'dist/images/logo.png';

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    ctrl.path = toState.url;
  });
}

app.component('logo', {
  templateUrl: constants.templateDir + 'dist/templates/components/logo.html',
  controller: LogoController
});

function ListController($scope, $element, $attrs, Store, $rootScope) {
  let ctrl = this;

  ctrl.list = Store.getPosts();

  $rootScope.$on('fetchPosts', (evt, arg) => {
    ctrl.list = Store.getPosts();
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

  Store.fetchSingle($stateParams.name);
  ctrl.post = Store.getSingle();

  $rootScope.$on('fetchSingle', (evt, arg) => {
    ctrl.post = Store.getSingle();
  });
}

app.component('detail', {
  templateUrl: constants.templateDir + 'dist/templates/components/detail.html',
  controller: DetailController
});

app.config(function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
  $locationProvider .html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $urlMatcherFactoryProvider.strictMode(false);
  
  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: constants.templateDir + 'dist/templates/home.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: constants.templateDir + 'dist/templates/about.html'
    })
    .state('detail', {
      url: '/:name',
      templateUrl: constants.templateDir + 'dist/templates/single.html'
    });
});

app.filter('trustAsHTML', ['$sce', $sce => text => $sce.trustAsHtml(text)]);