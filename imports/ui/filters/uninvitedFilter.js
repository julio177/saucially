import angular from 'angular';

const name = 'uninvitedFilter';

function UninvitedFilter(users, sauce) {
	if(!sauce) {
		return false;
	}

	return users.filter((user) => {
		return user._id !== sauce.owner && (sauce.invited || []).indexOf(user._id) === -1;
	});
}

export default angular.module(name, [])
  .filter(name, () => {
    return UninvitedFilter;
  });