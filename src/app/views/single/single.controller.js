export default class SingleController {
  constructor (postService, $stateParams) {
    'ngInject';
    this.postService = postService;
    this.name = $stateParams.name;
  }

  $onInit () {
    this.postService.query({'filter[name]': this.name}).$promise
      .then(res => {
        this.post = res[0];
      });
  }
}