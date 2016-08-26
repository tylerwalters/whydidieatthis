export default class HomeController {
  constructor (posts, categories) {
    'ngInject';

    this.categories = categories;
    this.posts = posts;

    this.getCategoryById = function(id) {
      return this.categories.filter(function(cat) {
        return cat.id === id;
      })[0];
    }
  }

  $onInit () {

  }
}