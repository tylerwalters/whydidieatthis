export default class SingleController {
  constructor (post, $rootScope) {
    'ngInject';

    this.post = post[0];

    $rootScope.pageTitle = this.post.title.rendered;
  }

  $onInit () {

  }
}