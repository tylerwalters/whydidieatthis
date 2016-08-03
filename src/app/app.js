import '../styles/style.scss';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './app.config';
import home from './views/home';
import single from './views/single';
import logo from './components/logo';

angular.module('app', [uiRouter, home, single])
  .config(routing)
  .component('logo', logo)
  .filter('trustAsHTML', ['$sce', $sce => text => $sce.trustAsHtml(text)]);