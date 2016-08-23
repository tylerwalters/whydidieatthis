export default class CategoryService {
  constructor ($resource) {
    'ngInject';
    return $resource(
      constants.apiUrl + 'categories/:ID',
      {ID: '@id'}
    );
  }
}