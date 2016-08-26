import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './page.routes';
import PageController from './page.controller';
import PageService from '../../services/page.service';

export default angular.module('app.page', [uiRouter, ngResource])
  .config(routing)
  .controller('PageController', PageController)
  .service('pageService', PageService)
  .name;