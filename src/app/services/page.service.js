export default class PageService {
  constructor ($resource, $cacheFactory) {
    'ngInject';

    const pageCache = $cacheFactory('Pages');

    return $resource(
      constants.apiUrl + 'pages/:ID',
      {ID: '@id'},
      {
        'get': {
          method:'GET',
          cache: pageCache
        },
        'query': {
          method:'GET',
          cache: pageCache,
          isArray:true
        }
      }
    );
  }
}