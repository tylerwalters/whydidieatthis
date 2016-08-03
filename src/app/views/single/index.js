import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import routing from './single.routes.js';
import SingleController from './single.controller.js';
import detail from '../../components/detail';
import loader from '../../components/loader';
import PostService from '../../services/post.service';

export default angular.module('app.single', [uiRouter, ngResource])
  .config(routing)
  .controller('SingleController', SingleController)
  .component('detail', detail)
  .component('loader', loader)
  .service('postService', PostService)
  .name;