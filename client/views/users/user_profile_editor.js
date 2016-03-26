Template.userProfileEditor.onRendered(function() {
	// for some reason, the content was "ghosting" (i.e. showing up more
	// than once), so until we figure out what's causing it, we will make
	// the offending element disappear
	$("#sky-header .title-bar #my-profile").hide();
});