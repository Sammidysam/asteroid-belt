Template.topicShow.helpers({
	betterOptions: function () {
		var topicId = this._id;
		var options = this.options;
		var admins = this.admins;

		/*
		 * First, add a votes field to all of the options.
		 * This will also be used in the template of the options.
		 * The admins field will be used for checking if the user is an admin.
		 */
		$.each(options, function () {
			this.topicId = topicId;
			this.admins = admins;
			this.votes = Votes.find({
				topic_id: topicId,
				option_id: this._id
			}).count();
		});

		return options.sort(function (a, b) {
			return b.votes - a.votes;
		});
	},
	isAdmin: function () {
		userChangeDep.depend();
		return Session.get("userEmail") && this.admins.indexOf(Session.get("userEmail")) > -1;
	}
});

Template.topicShowOption.helpers({
	isAdmin: function () {
		userChangeDep.depend();
		return Session.get("userEmail") && this.admins.indexOf(Session.get("userEmail")) > -1;
	},
	cssClass: function () {
		if (Meteor.user()) {
			return "clickable";
		} else {
			return "";
		}
	}
});

Template.topicShowOption.events({
	"click": function (event) {
		Votes.insert({
			topic_id: this.topicId,
			option_id: this._id
		}, function (err) {
			if (err)
				alert(err);
		});
	}
});
