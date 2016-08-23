import angular from 'angular';
import ngResource from 'angular-resource';
import StateService from './state.service';
import PostService from './post.service.js';
import CategoryService from './category.service.js';

export default angular.module('app.state', [ngResource])
  .service('stateService', StateService)
  .service('postService', PostService)
  .service('categoryService', CategoryService)
  .name;