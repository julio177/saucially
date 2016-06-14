import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import template from './saucially.html';
import {name as SaucesList} from '../saucesList/saucesList';
import {name as SauceDetails} from '../sauceDetails/sauceDetails';
import {name as Navigation} from '../navigation/navigation';
import {name as Auth} from '../auth/auth';

class Saucially{}

const name = 'saucially';

export default angular.module(name, [
	angularMeteor,
	ngMaterial,
	uiRouter,
	SaucesList,
	SauceDetails,
	Navigation,
	Auth,
	'accounts.ui'
]).component(name, {
	template,
	controllerAs: name,
	controller: Saucially
})
	.config(config)
	.run(run);

function config($locationProvider, $urlRouterProvider, $mdIconProvider) {
	'ngInject';

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/sauces');

	const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';
	
	$mdIconProvider
	  .iconSet('social',
	    iconPath + 'svg-sprite-social.svg')
	  .iconSet('action',
	    iconPath + 'svg-sprite-action.svg')
	  .iconSet('communication',
	    iconPath + 'svg-sprite-communication.svg')
	  .iconSet('content',
	    iconPath + 'svg-sprite-content.svg')
	  .iconSet('toggle',
	    iconPath + 'svg-sprite-toggle.svg')
	  .iconSet('navigation',
	    iconPath + 'svg-sprite-navigation.svg')
	  .iconSet('image',
	    iconPath + 'svg-sprite-image.svg');
}

function run($rootScope, $state) {
	'ngInject';

	$rootScope.$on('$stateChangeError',
		(event, toState, toParams, fromState, fromParams, error) => {
			if (error === 'AUTH_REQUIRED') {
				$state.go('sauces');
			}
		}
	);
}