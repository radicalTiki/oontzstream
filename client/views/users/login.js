Template.login.events({
    'submit form': function(event){
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        if (event.val == 'Register') {
        	var username = $('[name=username]').val();

        	Accounts.createUser({
	        	username: username,
	        	name: username,
	            email: email,
	            password: password
        	});
        }

        if (event.val == 'login'){
        	Meteor.loginWithPassword(email, password);
        } 
    }
});