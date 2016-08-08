export default class SingleController {
  constructor (postService, $stateParams) {
    'ngInject';
    this.postService = postService;
    this.id = $stateParams.id;
    this.name = $stateParams.name;
  }

  $onInit () {
    if (this.id) {
      this.postService.get({ID: this.id}).$promise
        .then(res => {
          this.post = res;
        });
    } else {
      this.postService.query({'filter[name]': this.name}).$promise
        .then(res => {
          this.post = res[0];
        });
    }
  }
}