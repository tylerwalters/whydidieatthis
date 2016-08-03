import '../styles/style.scss';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './app.config';
import home from './views/home';

angular.module('app', [uiRouter, home])
  .config(routing)
  .filter('trustAsHTML', ['$sce', $sce => text => $sce.trustAsHtml(text)]);