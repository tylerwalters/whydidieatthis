export default class HomeController {
  constructor (postService) {
    'ngInject';
    this.postService = postService;
  }

  $onInit () {
    this.postService.query().$promise
      .then(res => {
        this.posts = res;
      });
  }
}