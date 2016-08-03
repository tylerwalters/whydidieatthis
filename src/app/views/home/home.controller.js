export default class HomeController {
  constructor (postService) {
    'ngInject';
    this.postService = postService;
  }

  $onInit () {
    this.loop = this.postService.query();
  }
}