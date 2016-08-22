export default class StateService {
  constructor () {
    this.posts = null;
    this.entities = {
      pages: {},
      posts: {},
      categories: {}
    };
    this.filters = {};
  }

  getSingle(id) {
    return this.entities.posts[id] || null;
  }

  getPosts() {
    let current = [];
    if (this.posts) {
      this.posts.forEach(id => {
        current.push(this.entities.posts[id]);
      });
    }
    return current;
  }

  setPosts(posts) {
    this.posts = [];

    posts.forEach(post => {
      this.posts.push(post.id);
      if (!this.entities.posts[post.id]) {
        this.entities.posts[post.id] = post;
      }
    })
  }

  getPage(id) {
    return this.entities.pages[id] || null;
  }

  setPage(page) {
    this.entities.pages[page.id] = page;
  }
}