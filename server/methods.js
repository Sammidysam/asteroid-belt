Meteor.methods({
	getEmail: function () {
		try {
			return Meteor.user().services.google.email;
		} catch (e) {	
			return null;
		}
	}
});
