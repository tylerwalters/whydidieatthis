export default class AuthorService {
  constructor ($resource, $cacheFactory) {
    'ngInject';

    const authorCache = $cacheFactory('Authors');
    
    return $resource(
      constants.apiUrl + 'users/:ID',
      {ID: '@id'},
      {
        'get': {
          method:'GET',
          cache: authorCache
        },
        'query': {
          method:'GET',
          cache: authorCache,
          isArray:true
        }
      }
    );
  }
}