import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './single.routes';
import SingleController from './single.controller';
import PostService from '../../services/post.service';

export default angular.module('app.single', [uiRouter, ngResource])
  .config(routing)
  .controller('SingleController', SingleController)
  .service('postService', PostService)
  .name;