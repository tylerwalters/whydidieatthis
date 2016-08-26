export default class PostService {
  constructor ($resource, $cacheFactory) {
    'ngInject';

    const postCache = $cacheFactory('Posts');

    return $resource(
      constants.apiUrl + 'posts/:ID',
      {ID: '@id'},
      {
        'get': {
          method:'GET',
          cache: postCache
        },
        'query': {
          method:'GET',
          cache: postCache,
          isArray:true
        }
      }
    );
  }
}