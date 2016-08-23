import '../styles/style.scss';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './app.config';
import state from './services/state';
import home from './views/home';
import page from './views/page';
import single from './views/single';
import logo from './components/logo.component';
import loader from './components/loader.component';

angular.module('app', [uiRouter, state, home, page, single])
  .config(routing)
  .component('logo', logo)
  .component('loader', loader)
  .filter('trustAsHTML', ['$sce', $sce => text => $sce.trustAsHtml(text)]);