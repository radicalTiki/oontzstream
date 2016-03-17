Meteor.startup(function(){
	console.log('Hey server! This is Songroll Sky.');
	console.log('To kick things off, I will look for songs currently playing and set timers for when they end.');
	var nowPlaying = Videos.find({nowPlaying: true});
	nowPlaying.forEach(function(doc, i){
		Sky.playNextWhenOver(doc._id);
	});

	// Insert welcome room
	if ( !Rooms.findOne({title: 'Welcome to Songroll', featured: true}) ) {
		Rooms.insert({title: 'Welcome to Songroll', featured: true, description: 'Learn the basics while you listen to awesome music and chat with cool people.', hasRecommendations: true, isPrivate: false});
	}
});


Accounts.onCreateUser(function(options, user){
	user.name = user.username;
	user.username = user.username;
	user.avatar = 'http://www.health.state.mn.us/divs/idepc/dtopics/stds/images/syringe.jpg';
	return user;
});

// Kick users on exit
UserStatus.events.on("connectionLogout", function(fields) {
	var userCheck = Meteor.users.findOne({_id: fields.userId, 'status.online': true});
	if ( !userCheck ) {
		Meteor.users.update({_id: fields.userId}, { $set: { currentRoom: 0 } })
	}
});