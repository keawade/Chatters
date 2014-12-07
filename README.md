Streamers
=========

* Still not sure what all this will do. Please update this file.

Possible features:
 - Setting up your stream screen (picutres/text/placement) (multiple views you can change between?)
 - Webcam catpure
 - Screen capture
 - Chat with viewers
 - User authentication
 - Paragraph under stream screen to put user info (bio/chat_rules/etc)
 - Way to browse live streams (sorting?)
 - Search for user
 - Recorded past broadcasts
 - Auto youtube upload past broadcasts?
 - Viewer count (total/current)
 - A favorite or follow button/way to view who you are following/favorited
 

Paths: 
 - /
 - /:username
 - /:username/edit
 - /:username/profile
 - /:username/profile/edit
 - /login
 - /register
 - /:username/:pastbroadcastid
 - /:username/following

 - sorting/search routes tbd


chat {
	name: 'chatname',
	owner: 'user1',
	messages: [{
			name: 'user1',
			message: 'Hello, world!',
			timestamp: date,
		},{
			name: 'world',
			message: 'Hello to you too!',
			timestamp: date,
		}],
	members: ['user1','user2','user3',user4','world'],
	private: true,
	mods: ['user1','user2'],
	bans: []
}