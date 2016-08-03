import templateUrl from 'components/post.html';

class controller {
  constructor ($sce) {
    var location = null;

    if (this.post.acf.venue) {
      location = this.post.acf.venue;
    } else if (this.post.acf.name) {
      location = this.post.acf.name;
    } else if (this.post.acf.address) {
      location = this.post.acf.address;
    }

    this.mapUrl = location ? $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBgT9eRPtCKgZy93j9hdX_Fdiszu6K2Vcg&q=" + location) : null;
  }
}

export default {
  controller,
  templateUrl,
  bindings: {
    post: '<post'
  }
};