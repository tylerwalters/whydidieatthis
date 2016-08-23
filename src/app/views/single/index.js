import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './single.routes.js';
import SingleController from './single.controller.js';

export default angular.module('app.single', [uiRouter, ngResource])
  .config(routing)
  .controller('SingleController', SingleController)
  .name;