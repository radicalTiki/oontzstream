Meteor.startup(function(){
	console.log('Hey server! This is Oontzstream.');
	console.log('To kick things off, I will look for songs currently playing and set timers for when they end.');
	var nowPlaying = Videos.find({nowPlaying: true});
	nowPlaying.forEach(function(doc, i){
		Sky.playNextWhenOver(doc._id);
	});

	// Insert welcome room
	if ( !Rooms.findOne({title: 'Main Room', featured: true}) ) {
		Rooms.insert({title: 'Main Room', featured: true, description: 'If you\'re looking for music and people (who are possibly young and alive), start here.', hasRecommendations: true, isPrivate: false});
	}
});


Accounts.onCreateUser(function(options, user){
	user.name = user.username;
	
	// we shouldn't source offsite assets for simple things like this	
	//user.avatar = 'http://www.health.state.mn.us/divs/idepc/dtopics/stds/images/syringe.jpg';
	user.avatar = '/avatars/default.png';
	return user;
});

// Kick users on exit
UserStatus.events.on("connectionLogout", function(fields) {
	var userCheck = Meteor.users.findOne({_id: fields.userId, 'status.online': true});
	if ( !userCheck ) {
		Meteor.users.update({_id: fields.userId}, { $set: { currentRoom: 0 } })
	}
});