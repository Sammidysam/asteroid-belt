// Change the Session variable when the user logs in/out.
Deps.autorun(function () {
	if (Meteor.user())
		Session.set("userEmail", Meteor.user().services.google.email);
	else
		delete Session.keys["userEmail"];
});
