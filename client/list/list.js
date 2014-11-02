Template.list.helpers({
	topics: function () {
		return Topics.find({});
	}
});

Template.listTopic.events({
	"click": function () {
		Router.go("/topics/" + this._id);
	}
});

Template.listNewTopic.events({
	"click": function () {
		Router.go("/topics/new");
	}
});
