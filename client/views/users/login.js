Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        if (event.val == 'Register') {
        	var username = $('[name=username]').val();

        	Accounts.createUser({
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