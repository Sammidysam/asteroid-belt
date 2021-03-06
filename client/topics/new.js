Template.topicNewForm.events({
	"submit": function (event) {
		event.preventDefault();

		var form = {};
		var admin_emails = [];
		var options = [];

		$.each($("#newTopic").serializeArray(), function () {
			if (this.name.indexOf("option") > -1) {
				options.push({
					_id: this.name.slice(-1),
					name: this.value
				});
			} else if (this.name.indexOf("adminEmail") > -1) {
				admin_emails.push(this.value);
			} else {
				form[this.name] = this.value;
			}
		});
		form["admin_emails"] = admin_emails;
		form["options"] = options;
		form["show_votes"] = parseInt(form["show_votes"]) || 0;

		Topics.insert(form, function (err, id) {
			if (err) {
				alert(err);
			} else if (id) {
				Router.go("/topics/" + id);
			}
		});
	}
});

Template.topicNewFormAdminEmails.helpers({
	myEmail: function () {
		return Session.get("userEmail");
	}
});

function listClick (type) {
	var list = $("." + type + " ol");

	list.append("<li><input type=\"text\" name=\"" + type + list.children().length + "\" /></li>");
};

Template.topicNewFormAdminEmailsButton.events({
	"click": function () {
		listClick("adminEmails");
	}
});

Template.topicNewFormOptionsButton.events({
	"click": function () {
		listClick("options");
	}
});
