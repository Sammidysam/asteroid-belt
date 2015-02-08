Meteor.call("getEmail", function (error, result) {	
	if (error)
		alert(error);
	else if (result)
		$("#firstAdmin").val(result);
});

Template.topicNewForm.events({
	"submit": function (event) {
		event.preventDefault();
		
		form = {};
		admins = [];
		options = [];

		$.each($("#newTopic").serializeArray(), function () {
			if (this.name.indexOf("option") > -1) {
				options.push({
					_id: this.name.slice(-1),
					name: this.value
				});
			} else if (this.name.indexOf("admin") > -1) {
				admins.push(this.value);
			} else {
				form[this.name] = this.value;
			}
		});
		form["admins"] = admins;
		form["options"] = options;

		Topics.insert(form, function (err, id) {
			if (err) {
				alert(err);
			} else if (id) {
				Router.go("/topics/" + id);
			}
		});
	}
});

listClick = function (type) {
	var list = $("." + type + " ol");

	list.append("<li><input type=\"text\" name=\"" + type + list.children().length + "\" /></li>");
};

Template.topicNewFormAdminsButton.events({
	"click": function () {
		listClick("admins");
	}
});

Template.topicNewFormOptionsButton.events({
	"click": function () {
		listClick("options");
	}
});
