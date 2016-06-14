import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './saucesList.html';
import { Sauces } from '../../../api/sauces/index';
import {name as SaucesSort} from '../saucesSort/saucesSort';
import {name as SaucesMap} from '../saucesMap/saucesMap';
import {name as SauceAddButton} from '../sauceAddButton/sauceAddButton';
import {name as SauceRemove} from '../sauceRemove/sauceRemove';
import {name as SauceCreator} from '../sauceCreator/sauceCreator';
import {name as SauceRsvp} from '../sauceRsvp/sauceRsvp';
import {name as SauceRsvpsList} from '../sauceRsvpsList/sauceRsvpsList';
import {name as SauceImage} from '../sauceImage/sauceImage';

class SaucesList {
	constructor($scope, $reactive) {
		'ngInject';

		$reactive(this).attach($scope);

		this.perPage = 3;
		this.page = 1;
		this.sort = {
			name: 1
		};
		this.searchText = '';

		this.subscribe('sauces', () => [{
			limit: parseInt(this.perPage),
			skip: parseInt((this.getReactively('page') - 1) * this.perPage),
			sort: this.getReactively('sort')},
			this.getReactively('searchText')
		]);

		this.subscribe('users');

		this.helpers({
			sauces() {
				return Sauces.find({}, {
					sort: this.getReactively('sort')
				});
			},
			saucesCount() {
				return Counts.get('numberOfSauces');
			},
			isLoggedIn() {
				return !!Meteor.userId();
			},
			currentUserId() {
				return Meteor.userId();
			}
		});
	}

	isOwner(sauce) {
		return this.isLoggedIn && sauce.owner === this.currentUserId;
	}

	pageChanged(newPage) {
	  this.page = newPage;
	}

	sortChanged(sort) {
		this.sort = sort;
	}
}

const name = 'saucesList';

export default angular.module(name, [
	angularMeteor,
	uiRouter,
	utilsPagination,
	SaucesSort,
	SaucesMap,
	SauceAddButton,
	SauceRemove,
	SauceCreator,
	SauceRsvp,
	SauceRsvpsList,
	SauceImage
]).component(name, {
	template,
	controllerAs: name,
	controller: SaucesList
})
	.config(config);

function config($stateProvider) {
	'ngInject';

	$stateProvider
		.state('sauces', {
			url:'/sauces',
			template:'<sauces-list></sauces-list>'
		});
}