export default class AuthorService {
  constructor ($resource) {
    'ngInject';
    return $resource(
      constants.apiUrl + 'users/:ID',
      {ID: '@id'}
    );
  }
}