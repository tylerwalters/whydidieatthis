export default class HomeController {
  constructor (posts, categories, $rootScope) {
    'ngInject';

    this.categories = categories;
    this.posts = posts;

    this.getCategoryById = function(id) {
      return this.categories.filter(function(cat) {
        return cat.id === id;
      })[0];
    };

    $rootScope.pageTitle = 'Phoenix Wings and Beer';
  }

  $onInit () {

  }
}