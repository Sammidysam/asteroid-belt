Template.navigator.helpers({
	selected: function () {
		return Session.get("selectedTopic") || Session.get("creating");
	},
	topicSelected: function () {
		return Session.get("selectedTopic");
	}
});

Template.list.helpers({
	topics: function () {
		return Topics.find({});
	}
});

Template.topiclink.events({
	"click": function () {
		Session.set("selectedTopic", this._id);
	}
});

Template.newlink.events({
	"click": function () {
		Session.set("creating", true);
	}
});

// Templates that correspond to all files below.
Template.back.events({
	"click": function () {
		Session.set("selectedTopic", null);
		Session.set("creating", null);
	}
});
