import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import {name as Saucially} from '../imports/ui/components/saucially/saucially';

function onReady() {
	angular.bootstrap(document, [
		Saucially
	], {
		strictDi: true
	});
}

if(Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
} else {
	angular.element(document).ready(onReady);
}