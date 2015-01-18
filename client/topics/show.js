Template.topicShow.helpers({
	sortedOptions: function () {
		var topicId = this._id;
		var options = this.options;
		
		/*
		 * First, add a votes field to all of the options.
		 * This will also be used in the template of the options.
		 */
		$.each(options, function () {
			this.votes = Votes.find({
				topic_id: topicId,
				option_id: this._id
			}).count();
		});

		return options.sort(function (a, b) {
			return b.votes - a.votes;
		});
	}
});

Template.topicShowOption.events({
	"click": function (event) {
		var topicId = window.location.href.split("/").slice(-1)[0];
		
		Votes.insert({
			topic_id: topicId,
			option_id: this._id
		}, function (err) {
			if (err)
				alert(err);
		});
	}
});
