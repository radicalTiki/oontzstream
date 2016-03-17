Template.login.events({
    'submit .register': function(event){
        var email = event.target.email;
        var password = event.target.password;
        var username = event.target.username;

        Accounts.createUser({
        	username: username,
        	name: username,
            email: email,
            password: password
    	});
    },

    'submit .login': function(event){
    	var email = event.target.email;
        var password = event.target.password;

    	Meteor.loginWithPassword(email, password);
    }

});