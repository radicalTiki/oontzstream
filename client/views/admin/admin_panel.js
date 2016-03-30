Template.adminPanel.onRendered(function() {
	// do the user list first thing after load
	Meteor.users.find().fetch().forEach(function(u) {
		var userListDivContents = $(".admin-user-list").html();
		console.log(userListDivContents); // debug
		$(".admin-user-list").html(userListDivContents + "<p id=\"user-" + u._id + "\" class=\"user-list-line\">" + u.username + "</p>");
	});
	
	// do the room list as well
	Rooms.find().fetch().forEach(function(r) {
		var roomListDivContents = $(".admin-room-list").html();
		$(".admin-room-list").html(roomListDivContents + "<p id=\"room-" + r._id + "\" class=\"room-list-line\">" + r.title + "</p>");
	});
});