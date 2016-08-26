import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './home.routes';
import HomeController from './home.controller';
import PostService from '../../services/post.service';
import CategoryService from '../../services/category.service';
import post from './post.component';

export default angular.module('app.home', [uiRouter, ngResource])
  .config(routing)
  .controller('HomeController', HomeController)
  .service('postService', PostService)
  .service('categoryService', CategoryService)
  .component('post', post)
  .name;