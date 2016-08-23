const State = new WeakMap();

export default class SingleController {
  constructor ($stateParams, stateService) {
    'ngInject';

    this._$stateParams = $stateParams;
    State.set(this, stateService);
  }

  $onInit () {
    State.get(this).getSingle(this._$stateParams).then(res => {
      this.post = Array.isArray(res) ? res[0] : res;
    });
  }
}