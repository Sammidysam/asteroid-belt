Router.configure({
	layoutTemplate: "applicationLayout",
	loadingTemplate: "loadingLayout"
});

Router.route("/", function () {
	this.render("list");
});

Router.route("/topics/new", function () {
	if (!Meteor.user())
		this.redirect("/");
	else
		this.render("topicNew");
});

Router.route("/topics/:id", function () {
	this.render("topicShow", {
		data: function () {
			return Topics.findOne({ _id: this.params.id });
		}
	});
});
