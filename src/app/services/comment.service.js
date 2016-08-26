export default class CommentService {
  constructor ($resource, $cacheFactory) {
    'ngInject';

    const commentCache = $cacheFactory('Comments');

    return $resource(
      constants.apiUrl + 'comments/:ID',
      {ID: '@id'},
      {
        'get': {
          method:'GET',
          cache: commentCache
        },
        'query': {
          method:'GET',
          cache: commentCache,
          isArray:true
        }
      }
    );
  }
}