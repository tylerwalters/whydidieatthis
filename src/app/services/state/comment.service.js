export default class CommentService {
  constructor ($resource) {
    'ngInject';
    return $resource(
      constants.apiUrl + 'comments/:ID',
      {ID: '@id'}
    );
  }
}