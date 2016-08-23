const State = new WeakMap();

export default class PageController {
  constructor ($stateParams, stateService) {
    'ngInject';

    this._$stateParams = $stateParams;
    State.set(this, stateService);
  }

  $onInit () {
    State.get(this).getPage(this._$stateParams).then(res => {
      this.page = Array.isArray(res) ? res[0] : res;
    });
  }
}