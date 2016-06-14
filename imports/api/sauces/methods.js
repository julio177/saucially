import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

import { Sauces } from './collection';

function getContactEmail(user) {
	if(user.emails && user.emails.length)
		return user.emails[0].address;

	if(user.services && user.services.facebook && user.services.facebook.email)
		return user.services.facebook.email;

	return null;
}

export function invite(sauceId, userId) {
	check(sauceId, String);
	check(userId, String);

	if(!this.userId) {
		throw new Meteor.Error(400, 'You have to be logged in!');
	}

	const sauce = Sauces.findOne(sauceId);

	if(!sauce) {
		throw new Meteor.Error(404, 'No such sauce!');
	}

	if(sauce.owner !== this.userId) {
		throw new Meteor.Error(404, 'No permissions!');
	}

	if(sauce.public) {
		throw new Meteor.Error(400, 'That sauce is public. No need to invite people.');
	}

	if(userId !== sauce.owner && ! _.contains(sauce.invited, userId)) {
		Sauces.update(sauceId, {
			$addToSet: {
				invited: userId
			}
		});

		const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
		const to = getContactEmail(Meteor.users.findOne(userId));

		if(Meteor.isServer && to) {
			Email.send({
			  to,
			  replyTo,
			  from: 'noreply@saucially.com',
			  subject: `SAUCE: ${party.title}`,
			  text: `
			    Hey, I just invited you to see ${party.title} on Saucially.
			    Come check it out: ${Meteor.absoluteUrl()}
			  `
			});
		}
	}
}

export function rsvp(sauceId, rsvp) {
	check(sauceId, String);
	check(rsvp, String);

	if(!this.userId) {
		throw new Meteor.Error(403, 'You must be logged in to RSVP');
	}

	if (!_.contains(['yes', 'no', 'maybe'], rsvp)) {
	  throw new Meteor.Error(400, 'Invalid RSVP');
	}

	const sauce = Sauces.findOne({
		_id: sauceId, 
		$or: [{
			//is public
			$and: [{
				public: true,
			}, {
				public: {
					$exists: true
				}
			}]
		}, {
			//is owner
			$and: [{
				owner: this.userId
			}, {
				owner: {
					$exists: true
				}
			}]
		}, {
			//is invited
			$and: [{
				invited: this.userId
			}, {
				invited: {
					$exists: true
				}
			}]
		}]
	});

	if(!sauce) {
		throw new Meteor.Error(404, 'No such sauce');
	}

	const hasUserRsvp = _.findWhere(sauce.rsvps, {
	  user: this.userId
	});

	if(!hasUserRsvp) {
		//add new rsvp entry
		Sauces.update(sauceId, {
			$push: {
				rsvp: {
					rsvp,
					user: this.userId
				}
			}
		});
	} else {
		//update rsvp entry
		const userId = this.userId;
		Sauces.update({
			_id: sauceId,
			'rsvp.user': userId
		}, {
			$set: {
				'rsvp.$.rsvp': rsvp
			}
		});
	}
}

Meteor.methods({
	invite,
	rsvp
});