import '../styles/style.scss';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './app.config';
import home from './views/home';
import page from './views/page';
import single from './views/single';
import logo from './components/logo.component';
import loader from './components/loader.component';

angular.module('app', [uiRouter, home, page, single])
  .config(routing)
  .component('logo', logo)
  .component('loader', loader)
  .filter('trustAsHTML', ['$sce', $sce => text => $sce.trustAsHtml(text)])
  .filter('pagetitle', () => text => {
    if (!text) return '';

    // let split = text.includes(' ') ? ' ' : '-';
    let title = text.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return title + ' - Why Did I Eat This?';
  })
  .run(function($rootScope){
    $rootScope.$on('$stateChangeSuccess', function() {
      window.scrollTo(0, 0);
    })
  });