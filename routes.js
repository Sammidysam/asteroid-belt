Router.configure({
	layoutTemplate: "applicationLayout"
});

Router.route("/", function () {
	this.render("list");
});

Router.route("/topics/new", function () {
	this.render("topicNew");
});

Router.route("/topics/:id", function () {
	this.render("topicShow", {
		data: function () {
			return Topics.findOne({ _id: this.params.id });
		}
	});
});
