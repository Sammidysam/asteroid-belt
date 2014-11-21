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
