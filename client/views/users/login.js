Template.login.events({
    'submit .register': function(event){
    	event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        var username = event.target.username.value;

        Accounts.createUser({
        	name: username,
            email: email,
            password: password
    	});
    },

    'submit .login': function(event){
    	event.preventDefault();
    	var email = event.target.email.value;
        var password = event.target.password.value;
        
    	Meteor.loginWithPassword(email, password);
    }
});