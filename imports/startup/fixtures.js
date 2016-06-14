import { Meteor } from 'meteor/meteor';
import { Sauces } from '../api/sauces/index';

Meteor.startup(() => {
	if(Sauces.find().count() === 0) {
		const sauces = [
			{
			  'name': 'Chili',
			  'description': 'Neat stuff.',
			  'public' : true
			},
			{
			  'name': 'Curry',
			  'description': 'YASS.',
			  'public' : true
			},
			{
			  'name': 'Chipotle',
			  'description': 'Hot shot.',
			  'public' : true
			}
		];

		sauces.forEach((sauce) => {
			Sauces.insert(sauce);
		});
	}
});