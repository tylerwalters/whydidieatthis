import templateUrl from 'components/detail.html';

class controller {
  constructor () {
    this.single.$promise.then(res => {
      this.post = res[0];
    });
  }
}

export default {
  controller,
  templateUrl,
  bindings: {
    single: '<single'
  }
};