export default class CategoryService {
  constructor ($resource, $cacheFactory) {
    'ngInject';

    const categoryCache = $cacheFactory('Categories');
    
    return $resource(
      constants.apiUrl + 'categories/:ID',
      {ID: '@id'},
      {
        'get': {
          method:'GET',
          cache: categoryCache
        },
        'query': {
          method:'GET',
          cache: categoryCache,
          isArray:true
        }
      }
    );
  }
}