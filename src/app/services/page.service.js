export default class PageService {
  constructor ($resource) {
    'ngInject';
    return $resource(
      constants.apiUrl + 'pages/:ID',
      {ID: '@id'},
      {
        'getPages': {
          method: 'GET',
          isArray: true
        }
      }
    );
  }
}