import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './sauceDetails.html';
import { Sauces } from '../../../api/sauces/index';
import { name as SauceUninvited } from '../sauceUninvited/sauceUninvited';
import { name as SauceMap } from '../sauceMap/sauceMap';

class SauceDetails {
	constructor($stateParams, $scope, $reactive) {
		'ngInject';

		$reactive(this).attach($scope);

		this.sauceId = $stateParams.sauceId;

		this.subscribe('sauces');
		this.subscribe('users');

		this.helpers({
			sauce() {
				return Sauces.findOne({
					_id: $stateParams.sauceId
				});
			}, 
			users() {
				return Meteor.users.find({});
			},
			isLoggedIn() {
				return !!Meteor.userId();
			},
			currentUserId() {
				return Meteor.userId();
			}
		});
	}

	canInvite() {
	  if (!this.sauce) {
	    return false;
	  }
	
	  return !this.sauce.public && this.sauce.owner === Meteor.userId();
	}

	isOwner(sauce) {
		return this.isLoggedIn && sauce.owner === this.currentUserId;
	}

	save() {
		Sauces.update({
			_id: this.sauce._id
		},{
				$set: {
					name: this.sauce.name,
					description: this.sauce.description,
					ingredients: this.sauce.ingredients,
					public: this.sauce.public,
					location: this.sauce.location
				}
			}, (error) => {
				if(error) {
					console.log('Oops');
				} else {
					console.log('Success');
				}
			});
	}
}

const name = 'sauceDetails';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
  SauceUninvited,
  SauceMap
]).component(name, {
	template,
	controllerAs: name,
	controller: SauceDetails
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider
		.state('sauceDetails', {
			url: '/sauces/:sauceId',
			template: '<sauce-details></sauce-details>',
			resolve: {
				currentUser($q) {
					if(Meteor.userId() === null) {
						return $q.reject('AUTH_REQUIRED');
					} else {
						return $q.resolve();
					}
				}
			}
		});
}