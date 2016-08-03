import templateUrl from 'components/logo.html';
import logo from '../../../public/images/logo.png';

class controller {
  constructor ($rootScope) {
    this.path = '/';
    this.logo = logo;

    $rootScope.$on('$stateChangeStart', (event, toState) => {
      this.path = toState.url;
    });
  }
}

export default {
  controller,
  templateUrl
};