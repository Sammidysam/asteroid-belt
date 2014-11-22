Template.topicNewForm.events({
	"submit": function (event) {
		event.preventDefault();
		
		form = {};

		$.each($("#newTopic").serializeArray(), function () {
			form[this.name] = this.value;
		});

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
		$(".options ol").append("<li><input type=\"text\" name=\"option" + $(".options ol").children().length + "\" /></li>");
	}
});
