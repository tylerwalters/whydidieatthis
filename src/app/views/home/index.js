import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './home.routes.js';
import HomeController from './home.controller.js';
import post from './post.component';

export default angular.module('app.home', [uiRouter, ngResource])
  .config(routing)
  .controller('HomeController', HomeController)
  .component('post', post)
  .name;