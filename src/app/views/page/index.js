import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './page.routes.js';
import PageController from './page.controller.js';

export default angular.module('app.page', [uiRouter, ngResource])
  .config(routing)
  .controller('PageController', PageController)
  .name;