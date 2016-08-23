import angular from 'angular';
import ngResource from 'angular-resource';
import StateService from './state.service';
import PostService from './post.service';
import PageService from './page.service';
import CategoryService from './category.service';
import AuthorService from './author.service';
import CommentService from './comment.service';

export default angular.module('app.state', [ngResource])
  .service('stateService', StateService)
  .service('postService', PostService)
  .service('pageService', PageService)
  .service('categoryService', CategoryService)
  .service('authorService', AuthorService)
  .service('commentService', CommentService)
  .name;