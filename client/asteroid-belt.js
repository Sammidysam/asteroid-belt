// Change the Session variable when the user logs in/out.
userChangeDep = new Deps.Dependency();
Deps.autorun(function () {
	userChangeDep.changed();
	if (Meteor.user())
		Session.set("userEmail", Meteor.user().services.google.email);
	else
		delete Session.keys["userEmail"];
});
