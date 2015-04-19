Template.list.helpers({
	topics: function () {
		return Topics.find({}, { sort: ["completed"] });
	},
	completedClass: function () {
		return this.completed ? "completed" : "";
	}
});

Template.listTopic.events({
	"click": function () {
		Router.go("/topics/" + this._id);
	}
});

Template.listTopic.helpers({
	isAdmin: function () {
		userChangeDep.depend();
		return isAdminFunction(this.admin_emails);
	}
});

Template.listTopicDelete.events({
	"click": function () {
		Topics.remove(this._id);
	}
});

Template.listNewTopic.events({
	"click": function () {
		Router.go("/topics/new");
	}
});
