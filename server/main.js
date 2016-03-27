Meteor.startup(function(){
	// startup messages and finding any previously playing videos
	console.log("Oontzstream starting up...");
	console.log("Checking to see if there were any videos playing before the last shutdown (assuming that this app was running before)...");
	var nowPlaying = Videos.find({nowPlaying: true});
	nowPlaying.forEach(function(doc, i){
		Sky.playNextWhenOver(doc._id);
	});
	
	// if there are no roles defined yet, create them here
	if(Roles.getAllRoles().fetch().length == 0) {
		[ "user", "admin", "siteadmin" ].forEach(function(r) {
			Roles.createRole(r);
		});
		
		// let the console know about this
		console.log("Created user classes");
	}
	
	// if there are no users defined yet, create an admin
	if(Meteor.users.find().fetch().length == 0) {
		// tell the console that we are creating a user
		console.log("Creating initial admin user");
		
		// variables needed for the admin user's defaults
		var username = "admin";
        var email = "admin@notadomain.xyz";
        var password = Random.id(10); // generate a random password

		// execute the request
        Accounts.createUser({
        	username: username,
            email: email,
            password: password
    	});
		
		// set the user's role to admin
		Roles.setUserRoles(Meteor.users.find({name: "admin"}).fetch(), "siteadmin");
		
		// send the password to the console
		console.log("The admin user's password is: " + password);
		console.log("Please store this in a safe place!");
	}

	// if we don't have any rooms called "Main Room", create one
	if (!Rooms.findOne({title: 'Main Room', featured: true})) {
		// tell the console that we are creating the Main Room
		console.log("Creating the initial Main Room");
		
		// execute the request
		Rooms.insert({title: 'Main Room', featured: true, description: 'If you\'re looking for music and people (who are possibly young and alive), start here.', hasRecommendations: true, isPrivate: false});
	}
	
	// tell the console that we're finished with the initial startup
	console.log("Startup complete");
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