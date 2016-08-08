export default class PageController {
  constructor (pageService, $stateParams) {
    'ngInject';
    this.pageService = pageService;
    this.id = $stateParams.id;
    this.page = $stateParams.page;
  }

  $onInit () {
    if (this.id) {
      this.pageService.get({ID: this.id}).$promise
        .then(res => {
          this.page = res;
        });
    } else {
      this.pageService.query({'filter[name]': this.page}).$promise
        .then(res => {
          this.page = res[0];
        });
    }
  }
}