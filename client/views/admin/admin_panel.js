Template.adminPanel.onRendered(function() {
	// do the user list first thing after load
	Meteor.users.find().fetch().forEach(function(u) {
		var userListDivContents = $("#user-list").html();
		console.log(userListDivContents); // debug
		$("#user-list").html(userListDivContents + "<p id=\"user-" + u._id + "\" class=\"list-line\">" + u.username + "</p>");
	});
	
	// do the room list as well
	Rooms.find().forEach(function(r) {
		var roomListDivContents = $("#room-list").html();
		$("#room-list").html(roomListDivContents + "<p id=\"room-" + r._id + "\" class=\"list-line\">" + r.title + "</p>");
	});
});