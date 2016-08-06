import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './home.routes.js';
import HomeController from './home.controller.js';
import list from './list.component';
import post from './post.component';
import PostService from '../../services/post.service';

export default angular.module('app.home', [uiRouter, ngResource])
  .config(routing)
  .controller('HomeController', HomeController)
  .component('list', list)
  .component('post', post)
  .service('postService', PostService)
  .name;