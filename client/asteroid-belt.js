Template.list.topics = function () {
	return Topics.find({});
};

Template.topic.events({
	"click": function () {
		Session.set("selected_topic", this._id);
	}
});
