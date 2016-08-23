const State = new WeakMap();

export default class HomeController {
  constructor (stateService) {
    'ngInject';
    
    State.set(this, stateService);
  }

  $onInit () {
    State.get(this).getCategories().then(res => {
      this.categories = Array.isArray(res) ? State.get(this).convertCategories(res) : res;
    });

    State.get(this).getPosts().then(res => {
      this.posts = res;
    });
  }
}