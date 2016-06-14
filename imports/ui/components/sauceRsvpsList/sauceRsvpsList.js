import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './sauceRsvpsList.html';

class SauceRsvpsList {

}

const name = 'sauceRsvpsList';

export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    rsvps: '<'
  },
  controller: SauceRsvpsList
});