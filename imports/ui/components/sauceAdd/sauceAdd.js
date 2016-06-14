import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './sauceAdd.html';
import { Sauces } from '../../../api/sauces/index';
import { name as SauceUpload } from '../sauceUpload/sauceUpload';

class SauceAdd {
	constructor() {
		this.sauce = {};
	}

	submit() {
		this.sauce.owner = Meteor.user()._id;
		this.sauce.search = this.sauce.name.toLowerCase() + this.sauce.description.toLowerCase();
		Sauces.insert(this.sauce);

		if(this.done) {
		  this.done();
		}

		this.reset();
	}

	reset() {
		this.sauce = {};
	}
}

const name = 'sauceAdd';

export default angular.module(name, [
	angularMeteor,
	SauceUpload
]).component(name, {
	template,
	bindings: {
	  done: '&?'
	},
	controllerAs: name,
	controller: SauceAdd
});