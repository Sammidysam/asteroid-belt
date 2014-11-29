Template.topicShowOption.helpers({
	votes: function () {
		/* Have to get parent ID from URL since context does not provide it. */
		var topicId = window.location.href.split("/").slice(-1)[0];
		
		return Votes.find({
			topic_id: topicId,
			option_id: this._id
		}).count();
	}
});
