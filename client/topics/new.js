Template.topicNewForm.events({
	"submit": function (event) {
		event.preventDefault();
		
		forms = {};

		$.each($("#newTopic").serializeArray(), function () {
			forms[this.name] = this.value;
		});

		Topics.insert(forms, function (err) {
			alert(err);
		});

		Router.go("/");
	}
});

Template.topicNewFormOptionsButton.events({
	"click": function () {
		$(".options ol").append("<li><input type=\"text\" name=\"option" + $(".options ol").children().length + "\" /></li>");
	}
});
