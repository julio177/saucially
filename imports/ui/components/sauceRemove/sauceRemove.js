import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './sauceRemove.html';
import { Sauces } from '../../../api/sauces/index';

class SauceRemove {
	remove() {
		if(this.sauce) {
			Sauces.remove(this.sauce._id);
		}
	}
}

const name = 'sauceRemove';

export default angular.module(name, [
	angularMeteor
]).component(name, {
	template,
	bindings: {
		sauce: '<'
	},
	controllerAs: name,
	controller: SauceRemove
});