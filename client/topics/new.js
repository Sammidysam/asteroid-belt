Template.topicNewForm.events({
	"submit": function (event) {
		event.preventDefault();
		
		form = {};
		options = [];

		$.each($("#newTopic").serializeArray(), function () {
			if (this.name.indexOf("option") > -1) {
				options.push({
					_id: this.name.slice(-1),
					name: this.value
				});
			} else {
				form[this.name] = this.value;
			}
		});
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

Template.topicNewFormOptionsButton.events({
	"click": function () {
		var list = $(".options ol");
		
		list.append("<li><input type=\"text\" name=\"option" + list.children().length + "\" /></li>");
	}
});
