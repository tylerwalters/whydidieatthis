export default class PageController {
  constructor (page, title, $rootScope) {
    'ngInject';

    this.page = page[0];
    
    $rootScope.pageTitle = title;
  }

  $onInit () {

  }
}