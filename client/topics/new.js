Template.topicNewForm.events({
	"submit": function (event) {
		event.preventDefault();
		
		forms = {};

		$.each($("#newTopic").serializeArray(), function () {
			forms[this.name] = this.value;
		});

		Topics.insert(forms, function (err, id) {
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
