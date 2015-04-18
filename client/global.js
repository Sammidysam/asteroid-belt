Template.back.events({
    "click": function () {
        Router.go("/");
    }
});

Meteor.call("getEmail", function (error, result) {
	if (!error && result)
		Session.set("userEmail", result);
});
