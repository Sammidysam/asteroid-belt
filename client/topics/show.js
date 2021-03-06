function totalVotes (topicId) {
	return Votes.find({
		topic_id: topicId
	}).count();
};

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
		 * The completed field will be used for the same reason as previous line.
		 */
		$.each(options, function () {
			this.topicId = topicId;
			this.admin_emails = admin_emails;
			this.completed = completed;
			this.votes = Votes.find({
				topic_id: topicId,
				option_id: this._id
			}).count();
			this.voting_percentage = (this.votes / totalVotes(topicId)).toPrecision(2) * 100;
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
	},
	canSeeRunoffButton: function () {
		/* This is a check for if a runoff is feasible. */
		var topicId = this._id;

		var runoff = Topics.findOne(this.runoff_id);

		var vote_totals = this.options.map(function (a) {
			return a._id;
		}).map(function (b) {
			return Votes.find({
				topic_id: topicId,
				option_id: b
			}).count();
		}).sort();

		return this.completed && runoff == null && vote_totals.length > 2 && vote_totals[1] != vote_totals[2];
	}
});

Template.topicShowOption.helpers({
	canSeeVotes: function () {
		userChangeDep.depend();
		return (isAdminFunction(this.admin_emails) || (this.completed && Topics.findOne(this.topicId).show_votes > 0)) && totalVotes(this.topicId) > 0;
	},
	canSeeVoteTotals: function () {
		userChangeDep.depend();
		return isAdminFunction(this.admin_emails) || Topics.findOne(this.topicId).show_votes > 1;
	},
	totalVotes: function () {
        return totalVotes(this.topicId);
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
						return "myvote clickable";
					else
						return "notmyvote";
				} else {
					return "clickable";
				}
			} else {
				return "";
			}
		}
	},
	isAdmin: function () {
        userChangeDep.depend();
        return isAdminFunction(this.admin_emails);
    }
});

function myVote (topicId, optionId) {
	optionId = optionId || -1;

	var myEmail = Session.get("userEmail");
    var vote = {
        topic_id: topicId
    };
    if (myEmail)
        vote.creator_email = myEmail;
	if (optionId > -1)
		vote.option_id = optionId;

	return vote;
};

Template.topicShowOption.events({
	"click": function (event) {
		var any_vote = myVote(this.topicId);
		var completed_vote = Votes.findOne(myVote(this.topicId, this._id));

		if (Meteor.user() && !this.completed && !Votes.findOne(any_vote)) {
			any_vote.option_id = this._id;

			Votes.insert(any_vote, function (err) {
				if (err)
					alert(err);
			});
		} else if (Meteor.user() && !this.completed && completed_vote) {
			Votes.remove(completed_vote._id);
		}
	}
});

Template.topicShowDeletePrompt.helpers({
	canSeeDeletePrompt: function () {
		userChangeDep.depend();
		return Meteor.user() && Votes.findOne(myVote(this._id));
	}
});

Template.topicShowCompleteButton.events({
	"click": function (event) {
		Topics.update(this._id, { $set: { completed: true } });
	}
});

Template.topicShowDeleteButton.events({
	"click": function (event) {
		Topics.remove(this._id);
		Router.go("/");
	}
});

Template.topicShowRunoffButton.events({
	"click": function (event) {
		var topicId = this._id;
		var runoff = {};

		/* Fill in the standard runoff details. */
		runoff.name = this.name + " Runoff";
		runoff.description = this.description;
		runoff.completed = false;
		runoff.show_votes = this.show_votes;
		runoff.admin_emails = this.admin_emails;

		/* Get the two highest voting options. */
		var options = this.options.sort(function (a, b) {
			return b.votes - a.votes;
		});
		runoff.options = options.slice(0, 2);

		Topics.insert(runoff, function (err, id) {
			if (err) {
                alert(err);
            } else if (id) {
				Topics.update(topicId, { $set: { runoff_id: id } });
                Router.go("/topics/" + id);
            }
		});
	}
});
