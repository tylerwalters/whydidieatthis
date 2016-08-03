export default class PostService {
  constructor ($resource) {
    'ngInject';
    return $resource(
      constants.apiUrl + 'posts/:ID',
      {ID: '@id'},
      {
        'getPosts': {
          method: 'GET',
          isArray: true
        }
      }
    );
  }
}