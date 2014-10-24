Template.list.helpers({
	topics: function () {
		return Topics.find({});
	}
});

Template.topic.events({
	"click": function () {
		Session.set("selected_topic", this._id);
	}
});

Template.newlink.events({
	"click": function () {
		Session.set("creating", true);
	}
});
