Template.userProfileEditor.helpers({
	// get the email address of the logged in user
	currentUserEmail: function() {
		return Meteor.user().emails[0].address;
	}
});

Template.userProfileEditor.events({
	"click .password-change": function(e) {
		e.preventDefault();
		$("#change-password-modal").modal("show");
	},
	
	"click #change-password-submit": function(e) {
		e.preventDefault();
		
		// pick up the vars from the form
		var oldPassword = $("#change-password-modal .password-input-old").val();
		var newPassword1 = $("#change-password-modal .password-input-1st").val();
		var newPassword2 = $("#change-password-modal .password-input-2nd").val();
		
		// check to make sure that the new passwords match
		if(newPassword1 != newPassword2) {
			$("#change-password-modal .status").text("Error! Passwords do not match!");
		} else {
			// attempt to change the password
			Accounts.changePassword(oldPassword, newPassword1, function(err) {
				try {
					if(err) {
						$("#change-password-modal .status").text("Error! " + err.reason);
					} else {
						// clear fields and close the modal window
						$("input").val("");
						$("#change-password-modal").modal("hide");
					}
				}
				catch(ex) {
					// strangely enough, it throws an exception when the
					// password was successfully changed, so clear the
					// fields and close the modal window
					$("input").val("");
					$("#change-password-modal").modal("hide");
				}
			});
		}
	},
	
	"click .avatar-change": function(e) {
		e.preventDefault();
		$("#change-avatar-modal").modal("show");
	},
});