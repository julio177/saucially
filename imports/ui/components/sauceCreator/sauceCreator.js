import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
 
import template from './sauceCreator.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
 
class SauceCreator {
  constructor($scope) {
    'ngInject';

    $scope.viewModel(this);
 
    this.helpers({
      creator() {
        if (!this.sauce) {
          return '';
        }
 
        const owner = this.sauce.owner;

        if (Meteor.userId() !== null && owner === Meteor.userId()) {
          return 'me';
        } 
        
        return Meteor.users.findOne({_id: owner}) || 'nobody';
      }
    });
  }
}
 
const name = 'sauceCreator';

export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    sauce: '<'
  },
  controller: SauceCreator
});