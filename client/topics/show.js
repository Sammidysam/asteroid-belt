Template.topicShow.helpers({
	betterOptions: function () {
		userChangeDep.depend();

		var topicId = this._id;
		var options = this.options;
		var admin_emails = this.admin_emails;
		var completed = this.completed;

		/*
		 * First, add a votes field to all of the options.
		 * This will also be used in the template of the options.
		 * The admin_emails field will be used for checking if the user is an admin.
		 */
		$.each(options, function () {
			this.topicId = topicId;
			this.admin_emails = admin_emails;
			this.completed = completed;
			this.votes = Votes.find({
				topic_id: topicId,
				option_id: this._id
			}).count();
		});

		// If we can see the number of votes per candidate, sort them.
		if (this.completed || isAdminFunction(admin_emails)) {
			options.sort(function (a, b) {
				return b.votes - a.votes;
			});

			for (var i = 0; i < options.length; i++)
				options[i].index = i;
		}

		return options;
	},
	isAdmin: function () {
		userChangeDep.depend();
		return isAdminFunction(this.admin_emails);
	},
	canSeeCompleteButton: function () {
		return !this.completed;
	}
});

Template.topicShowOption.helpers({
	canSeeVotes: function () {
		userChangeDep.depend();
		return this.completed || isAdminFunction(this.admin_emails);
	},
	cssClass: function () {
		if (this.completed) {
			return this.index == 0 ? "victor" : "loser";
		} else {
			var myEmail = Session.get("userEmail");
			if (myEmail) {
				var vote = Votes.findOne({
					topic_id: this.topicId,
					creator_email: myEmail
				});

				if (vote) {
					if (vote.option_id == this._id)
						return "myvote";
					else
						return "notmyvote";
				} else {
					return "clickable";
				}
			} else {
				return "";
			}
		}
	}
});

Template.topicShowOption.events({
	"click": function (event) {
		var myEmail = Session.get("userEmail");
		var vote = {
			topic_id: this.topicId,
			option_id: this._id
		};
		if (myEmail)
			vote.creator_email = myEmail;

		Votes.insert(vote, function (err) {
			if (err)
				alert(err);
		});
	}
});

Template.topicShowCompleteButton.events({
	"click": function (event) {
		Topics.update(this._id, { $set: { completed: true } });
	}
});
