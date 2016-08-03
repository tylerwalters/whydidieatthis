export default class SingleController {
  constructor (postService, $stateParams) {
    'ngInject';
    this.postService = postService;
    this.name = $stateParams.name;
  }

  $onInit () {
    this.single = this.postService.query({'filter[name]': this.name});
  }
}