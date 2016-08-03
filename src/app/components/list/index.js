import templateUrl from 'components/list.html';

class controller {
  constructor () {
    this.loop.$promise.then(res => {
      this.posts = res;
    });
  }
}

export default {
  controller,
  templateUrl,
  bindings: {
    loop: '<loop'
  }
};