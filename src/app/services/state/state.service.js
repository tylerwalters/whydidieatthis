const PostService = new WeakMap();
const PageService = new WeakMap();
const CategoryService = new WeakMap();

export default class StateService {
  constructor ($q, postService, pageService, categoryService) {
    this.posts = null;
    this.entities = {
      pages: {},
      posts: {},
      categories: {}
    };
    this.filters = {};

    this._$q = $q;

    PostService.set(this, postService);
    PageService.set(this, pageService);
    CategoryService.set(this, categoryService);
  }

  /**
   * Returns a single post by id or name.
   *
   * @param {Object} post Information about the post.
   * @param {String} post.name The name of the post.
   * @param {Number} post.id The id of the post.
   * @return {Promise}
   */
  getSingle(post) {
    if (post.id && this.entities.posts[post.id]) {
      return this._$q(resolve => resolve(this.entities.posts[post.id]));
    } else {
      return this.fetchPost(post.name);
    }
  }

  /**
   * Returns current posts.
   *
   * @returns {Promise}
   */
  getPosts() {
    if (this.posts) {
      return this._$q(resolve => {
        let posts = this.posts.map(id => {
          return this.entities.posts[id];
        });
        resolve(posts);
      });
    } else {
      return this.fetchPosts();
    }
  }

  /**
   * Assigns current post ids to this.posts, and adds posts to this.entities.posts if not already set.
   *
   * @param {Array} posts
   */
  setPosts(posts) {
    this.posts = [];

    posts.forEach(post => {
      this.posts.push(post.id);

      if (!this.entities.posts[post.id]) {
        this.entities.posts[post.id] = post;
      }
    })
  }

  /**
   * Fetches post using name.
   *
   * @param name Name of post to fetch
   * @returns {Promise}
   */
  fetchPost(name) {
    let post = PostService.get(this).query({'filter[name]': name});

    post.$promise
      .then(res => {
        this.entities.posts[res[0].id] = res[0];
      });

    return post.$promise;
  }

  /**
   * Fetches posts based on current filters.
   *
   * @returns {Promise}
   */
  fetchPosts() {
    let posts = PostService.get(this).query();

    posts.$promise
      .then(res => {
        this.setPosts(res);
      });

    return posts.$promise;
  }

  /**
   * Returns a single page by id or name.
   *
   * @param {Object} page Information about the page.
   * @param {String} page.name The name of the page.
   * @param {Number} page.id The id of the page.
   * @return {Promise}
   */
  getPage(page) {
    if (page.id && this.entities.pages[page.id]) {
      return this._$q(resolve => resolve(this.entities.pages[page.id]));
    } else {
      return this.fetchPage(page.name);
    }
  }

  /**
   * Fetches page using name.
   *
   * @param name Name of page to fetch
   * @returns {Promise}
   */
  fetchPage(name) {
    let page = PageService.get(this).query({'filter[name]': name});

    page.$promise
      .then(res => {
        this.entities.pages[res[0].id] = res[0];
      });

    return page.$promise;
  }

  /**
   * Returns categories.
   *
   * @returns {Promise}
   */
  getCategories() {
    if (Object.keys(this.entities.categories).length !== 0) {
      return this._$q(resolve => resolve(this.entities.categories));
    } else {
      return this.fetchCategories();
    }
  }

  /**
   * Assigns categories to this.entities.categories.
   *
   * @returns {Promise}
   */
  setCategories(categories) {
    this.entities.categories = this.convertCategories(categories);
  }

  /**
   * Converts an array of categories to an object with categories accessible by id.
   *
   * @param categories An array of category objects
   * @returns {Object}
   */
  convertCategories(categories) {
    let converted = {};

    categories.forEach(category => {
      converted[category.id] = category;
    });

    return converted;
  }

  /**
   * Fetches categories.
   *
   * @returns {Promise}
   */
  fetchCategories() {
    let categories = CategoryService.get(this).query();

    categories.$promise
      .then(res => {
        this.setCategories(res);
      });

    return categories.$promise;
  }
}