Router.configure({
  layoutTemplate: 'layout'
});

if ( Meteor.isClient ) {
	nextPath = false;
	nextPathDependency = new Deps.Dependency;
}

Router.map(function() {
  this.route('login', {
  	path: '/login'
  });
  this.route('roomsList', {
  	path: '/',
    waitOn: function(){
      return Meteor.subscribe('indexRooms');
    },
  	yieldTemplates: {
  		'roomsListTitle': { to: 'pageTitle' },
  		'roomsListButtons': { to: 'pageButtons' }
  	}
  });
  this.route('roomPage', {
  	path: '/rooms/:_id',
  	yieldTemplates: {
  		'roomsPageTitle': { to: 'pageTitle' },
  		'roomsPageButtons': { to: 'pageButtons' }
  	},
  	waitOn: function() {
  		return Meteor.subscribe('room', this.params._id);
  	},
    onAfterAction: function(){
      Meteor.subscribe('roomVideos', this.params._id);
      Meteor.subscribe('roomVotes', this.params._id);
      Meteor.subscribe('roomMessages', this.params._id);
    },
  	data: function(){ 
  		return Rooms.findOne(this.params._id);
  	}
  });
  this.route('userFavorites', {
    path: '/favorites',
    yieldTemplates: {
      'userFavoritesTitle': { to: 'pageTitle' }
    },
    waitOn: function(){
      return Meteor.subscribe('userFavorites');
    },
    data: function(){
      return Favorites.find({user_id: Meteor.userId()});
    }
  });
  this.route('userRooms', {
    path: '/my-rooms',
    yieldTemplates: {
      'userRoomsTitle': { to: 'pageTitle' },
      'userRoomsButtons': { to: 'pageButtons' }
    },
    waitOn: function(){
      return [Meteor.subscribe('userFavorites'), Meteor.subscribe('userRooms')];
    },
    onAfterAction: function(){
      if ( this.ready() ) {
        var favoriteRooms = Favorites.find({user_id: Meteor.userId(), room_id: { $exists: 1 }});
        var ids = keyArrayFromCursor(favoriteRooms, 'room_id');
        console.log(ids);
        Meteor.subscribe('userFavoriteRooms', ids);
      }
    }
  });
  
  // for users to modify aspects of their accounts
  this.route("userProfileEditor", {
	  path: "/my-profile",
	  yieldTemplates: {
		  "userProfileEditorTitle": { to: "pageTitle" }
	  }
  });
  
  // for the admin panel
  this.route("adminPanel", {
	  path: "/admin-panel",
	  onBeforeAction: function(pause) {
		  if(!Roles.userIsInRole(Meteor.userId(), "siteadmin")) {
			  this.render("login");
			  pause();
		  }
	  },
	  yieldTemplates: {
		  "adminPanelTitle": { to: "pageTitle" }
	  }
  });
});

Router.onAfterAction(function(){
  if ( this.ready() ) {
    Session.set('firstLoaded', true);
  }
});