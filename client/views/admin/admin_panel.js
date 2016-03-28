Template.adminPanel.onRendered(function() {
	// do the user list first thing after load
	Meteor.users.find().fetch().forEach(function(u) {
		var userListDivContents = $(".admin-user-list").html();
		console.log(userListDivContents); // debug
		$(".admin-user-list").html(userListDivContents + "<p id=\"user-" + u._id + "\" class=\"user-list-line\">" + u.username + "</p>");
	});
	
	// now clean up any ghosting that occurs
	$("#sky-header #admin-panel").remove();
});